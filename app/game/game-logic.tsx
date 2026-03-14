"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./styles.css";

type Facing = "up" | "down" | "left" | "right";
type Axis = "x" | "z";
type GameMode = "menu" | "playing" | "paused" | "gameOver";

interface PlayerState {
  x: number;
  z: number;
  facing: Facing;
  hp: number;
  maxHp: number;
  invulnerableTimer: number;
  attackTimer: number;
  attackCooldown: number;
}

interface EnemyState {
  id: number;
  x: number;
  z: number;
  speed: number;
  direction: Facing;
  pattern: Facing[];
  patternIndex: number;
  directionTimer: number;
  beamCooldown: number;
  mesh: THREE.Mesh;
}

interface EnemyBeamState {
  id: number;
  x: number;
  z: number;
  dx: number;
  dz: number;
  speed: number;
  ttl: number;
  mesh: THREE.Mesh;
}

interface HeartState {
  id: number;
  x: number;
  z: number;
  ttl: number;
  mesh: THREE.Mesh;
}

interface WallRect {
  x: number;
  z: number;
  width: number;
  depth: number;
}

interface HudState {
  mode: GameMode;
  hp: number;
  maxHp: number;
  score: number;
  wave: number;
  enemies: number;
}

const ARENA_HALF_WIDTH = 16;
const ARENA_HALF_DEPTH = 12;
const PLAYER_RADIUS = 0.72;
const ENEMY_RADIUS = 0.46;
const PLAYER_SPEED = 7.2;
const BASE_ENEMY_SPEED = 2.1;
const PLAYER_HIT_COOLDOWN = 1.0;
const SWORD_VISUAL_SCALE = 1;
const BASE_SWORD_REACH = 2.35;
const ATTACK_RANGE = BASE_SWORD_REACH * SWORD_VISUAL_SCALE;
const ATTACK_CONTACT_PADDING = ENEMY_RADIUS + 0.08;
const ATTACK_ARC_RADIANS = Math.PI * 1.05;
const ATTACK_DURATION = 0.18;
const ATTACK_COOLDOWN = 0.34;
const HEART_PICKUP_RADIUS = 0.85;
const HEART_SPAWN_CHANCE = 0.26;
const ENEMY_DIRECTION_CHANGE_MIN = 0.55;
const ENEMY_DIRECTION_CHANGE_MAX = 1.35;
const ENEMY_BEAM_COOLDOWN_MIN = 1.2;
const ENEMY_BEAM_COOLDOWN_MAX = 2.2;
const ENEMY_BEAM_ALIGNMENT = 0.5;
const ENEMY_BEAM_SPEED = 9.2;
const ENEMY_BEAM_TTL = 2;
const ENEMY_BEAM_RADIUS = 0.18;
const SHIELD_FORWARD_OFFSET = 0.42;
const SHIELD_LATERAL_OFFSET = 0.18;
const SHIELD_BLOCK_RADIUS = 0.52;
const FIXED_STEP = 1 / 60;
const CARDINAL_DIRECTIONS: Facing[] = ["up", "right", "down", "left"];

const WALLS: WallRect[] = [
  { x: 0, z: -4, width: 6, depth: 1.4 },
  { x: -9.2, z: 2.2, width: 2.8, depth: 7.2 },
  { x: 9.4, z: 6.1, width: 4.6, depth: 1.9 },
  { x: 5.8, z: -8.8, width: 7.8, depth: 1.8 },
  { x: -3.4, z: 8.7, width: 6.2, depth: 1.6 },
];

const facingToVector = (facing: Facing): { x: number; z: number } => {
  switch (facing) {
    case "up":
      return { x: 0, z: -1 };
    case "down":
      return { x: 0, z: 1 };
    case "left":
      return { x: -1, z: 0 };
    case "right":
      return { x: 1, z: 0 };
  }
};

const facingToRotation = (facing: Facing): number => {
  switch (facing) {
    case "down":
      return 0;
    case "left":
      return -Math.PI / 2;
    case "up":
      return Math.PI;
    case "right":
      return Math.PI / 2;
  }
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

declare global {
  interface Window {
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
  }
}

export default function Game() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<GameMode>("menu");
  const keyStateRef = useRef<Record<string, boolean>>({});
  const attackKeyHeldRef = useRef(false);
  const preferredAxisRef = useRef<Axis>("z");
  const startGameRef = useRef<() => void>(() => undefined);
  const resumeGameRef = useRef<() => void>(() => undefined);
  const tryAttackRef = useRef<() => void>(() => undefined);

  const [hud, setHud] = useState<HudState>({
    mode: "menu",
    hp: 5,
    maxHp: 5,
    score: 0,
    wave: 1,
    enemies: 0,
  });

  const updateDirectionalIntent = useCallback((key: string) => {
    if (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "a" ||
      key === "d"
    ) {
      preferredAxisRef.current = "x";
    }
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "w" ||
      key === "s"
    ) {
      preferredAxisRef.current = "z";
    }
  }, []);

  const setVirtualKey = useCallback(
    (key: string, pressed: boolean) => {
      const normalized = key.length === 1 ? key.toLowerCase() : key;
      keyStateRef.current[normalized] = pressed;
      if (pressed) {
        updateDirectionalIntent(normalized);
      }
    },
    [updateDirectionalIntent]
  );

  const handleAttackPress = useCallback(() => {
    tryAttackRef.current();
  }, []);

  const handleStart = useCallback(() => {
    if (modeRef.current === "paused") {
      resumeGameRef.current();
      return;
    }

    startGameRef.current();
  }, []);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1a24);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "arena-canvas";
    host.innerHTML = "";
    host.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-10, 10, 7, -7, 0.1, 100);
    camera.position.set(0, 23, 13);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.78);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xeff9ff, 0.72);
    keyLight.position.set(12, 22, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfff4d6, 0.35);
    rimLight.position.set(-14, 12, -12);
    scene.add(rimLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(
        ARENA_HALF_WIDTH * 2 + 2,
        ARENA_HALF_DEPTH * 2 + 2
      ),
      new THREE.MeshStandardMaterial({
        color: 0x2a3f2b,
        roughness: 0.95,
        metalness: 0.03,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    const grid = new THREE.GridHelper(
      ARENA_HALF_WIDTH * 2,
      ARENA_HALF_WIDTH * 2,
      0x203928,
      0x203928
    );
    grid.position.y = 0.01;
    scene.add(grid);

    const wallMeshes: THREE.Mesh[] = [];
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f3c2f,
      roughness: 0.9,
    });
    const wallAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xa78663,
      roughness: 0.55,
    });

    WALLS.forEach((wall) => {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(wall.width, 1.5, wall.depth),
        wallMaterial
      );
      block.position.set(wall.x, 0.75, wall.z);
      scene.add(block);
      wallMeshes.push(block);

      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(wall.width + 0.2, 0.2, wall.depth + 0.2),
        wallAccentMaterial
      );
      cap.position.set(wall.x, 1.55, wall.z);
      scene.add(cap);
      wallMeshes.push(cap);
    });

    const playerGroup = new THREE.Group();
    const avatarVisualGroup = new THREE.Group();
    avatarVisualGroup.scale.setScalar(1.5);
    const playerSkinMaterial = new THREE.MeshStandardMaterial({
      color: 0xe7d8b2,
      roughness: 0.62,
    });
    const playerTunicMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c9c49,
      roughness: 0.55,
    });
    const playerBeltMaterial = new THREE.MeshStandardMaterial({
      color: 0x6d4b2c,
      roughness: 0.78,
    });
    const playerBootMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3120,
      roughness: 0.82,
    });
    const playerCloakMaterial = new THREE.MeshStandardMaterial({
      color: 0x235c37,
      roughness: 0.64,
    });
    const playerEyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f151c,
      roughness: 0.45,
    });
    const playerCrestMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6d86a,
      roughness: 0.3,
      metalness: 0.25,
      emissive: 0x7d6419,
      emissiveIntensity: 0.35,
    });
    const playerHatMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f7e3d,
      roughness: 0.5,
    });
    const playerShieldFaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x2f6f9f,
      roughness: 0.46,
      metalness: 0.2,
    });
    const playerShieldRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xbba15e,
      roughness: 0.48,
      metalness: 0.42,
    });
    const playerShieldEmblemMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6db93,
      roughness: 0.32,
      metalness: 0.34,
      emissive: 0x5f5720,
      emissiveIntensity: 0.2,
    });

    const playerPartMeshes: THREE.Mesh[] = [];
    const registerPlayerPart = (mesh: THREE.Mesh): void => {
      playerPartMeshes.push(mesh);
      avatarVisualGroup.add(mesh);
    };

    const playerTorso = new THREE.Mesh(
      new THREE.BoxGeometry(0.74, 0.6, 0.66),
      playerTunicMaterial
    );
    playerTorso.position.set(0, 0.42, 0);
    registerPlayerPart(playerTorso);

    const playerBelt = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.14, 0.66),
      playerBeltMaterial
    );
    playerBelt.position.set(0, 0.28, 0);
    registerPlayerPart(playerBelt);

    const playerHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.34, 0.44),
      playerSkinMaterial
    );
    playerHead.position.set(0, 0.88, 0.02);
    registerPlayerPart(playerHead);

    const playerFacePlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.14, 0.06),
      playerSkinMaterial
    );
    playerFacePlate.position.set(0, 0.88, 0.24);
    registerPlayerPart(playerFacePlate);

    const playerLeftEye = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.03),
      playerEyeMaterial
    );
    playerLeftEye.position.set(-0.08, 0.89, 0.275);
    registerPlayerPart(playerLeftEye);

    const playerRightEye = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.03),
      playerEyeMaterial
    );
    playerRightEye.position.set(0.08, 0.89, 0.275);
    registerPlayerPart(playerRightEye);

    const playerCrest = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.28, 3),
      playerCrestMaterial
    );
    playerCrest.rotation.x = Math.PI / 2;
    playerCrest.position.set(0, 1.2, 0.23);
    registerPlayerPart(playerCrest);

    const playerCape = new THREE.Mesh(
      new THREE.BoxGeometry(0.54, 0.46, 0.08),
      playerCloakMaterial
    );
    playerCape.position.set(0, 0.5, -0.31);
    registerPlayerPart(playerCape);

    const playerBoots = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.1, 0.24),
      playerBootMaterial
    );
    playerBoots.position.set(0, 0.1, 0.08);
    registerPlayerPart(playerBoots);

    const playerHat = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.78, 4),
      playerHatMaterial
    );
    playerHat.position.set(0, 1.15, -0.02);
    playerHat.rotation.y = Math.PI / 4;
    registerPlayerPart(playerHat);

    const swordArmGroup = new THREE.Group();
    swordArmGroup.position.set(0.32, 0.58, 0.15);
    swordArmGroup.rotation.set(-0.12, 0.08, -0.45);
    swordArmGroup.visible = false;

    const swordArmSleeve = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.14, 0.42),
      playerTunicMaterial
    );
    swordArmSleeve.position.set(0, 0, 0.05);
    swordArmGroup.add(swordArmSleeve);

    const swordArmHand = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.11, 0.16),
      playerSkinMaterial
    );
    swordArmHand.position.set(0, -0.01, 0.3);
    swordArmGroup.add(swordArmHand);

    avatarVisualGroup.add(swordArmGroup);
    playerPartMeshes.push(swordArmSleeve, swordArmHand);

    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(-0.11, 0.88, 0.3);
    shieldGroup.rotation.set(0.02, -0.16, 0.04);
    shieldGroup.scale.setScalar(1.5);

    const shieldRim = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.18, 0.3, 4, 10),
      playerShieldRimMaterial
    );
    shieldRim.scale.set(1, 1, 0.45);
    shieldGroup.add(shieldRim);

    const shieldFace = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.15, 0.26, 4, 10),
      playerShieldFaceMaterial
    );
    shieldFace.scale.set(1, 1, 0.42);
    shieldFace.position.set(0, 0, 0.015);
    shieldGroup.add(shieldFace);

    const shieldEmblem = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.3, 0.024),
      playerShieldEmblemMaterial
    );
    shieldEmblem.position.set(0, 0, 0.08);
    shieldGroup.add(shieldEmblem);

    avatarVisualGroup.add(shieldGroup);
    playerPartMeshes.push(shieldRim, shieldFace, shieldEmblem);

    const swordPivot = new THREE.Group();
    swordPivot.position.set(0.2, 0.75, 0.05);

    const swordRig = new THREE.Group();
    swordRig.position.set(0, 0.04, 0.66);
    swordRig.scale.setScalar(SWORD_VISUAL_SCALE);
    swordRig.rotation.x = -0.32;
    swordRig.visible = false;

    const swordBladeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8e2ee,
      roughness: 0.3,
      metalness: 0.82,
    });
    const swordEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f5ff,
      roughness: 0.2,
      metalness: 0.9,
    });
    const swordGuardMaterial = new THREE.MeshStandardMaterial({
      color: 0xbb9f58,
      roughness: 0.55,
      metalness: 0.45,
    });
    const swordGripMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f3923,
      roughness: 0.85,
      metalness: 0.08,
    });
    const swordPommelMaterial = new THREE.MeshStandardMaterial({
      color: 0xc2ccd8,
      roughness: 0.45,
      metalness: 0.65,
    });

    const swordPartMeshes: THREE.Mesh[] = [];
    const registerSwordPart = (mesh: THREE.Mesh): void => {
      swordPartMeshes.push(mesh);
      swordRig.add(mesh);
    };

    const swordBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.08, 1.28),
      swordBladeMaterial
    );
    swordBlade.position.set(0, 0.06, 0.72);
    registerSwordPart(swordBlade);

    const swordEdge = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.028, 1.02),
      swordEdgeMaterial
    );
    swordEdge.position.set(0, 0.08, 0.66);
    registerSwordPart(swordEdge);

    const swordTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.25, 4),
      swordEdgeMaterial
    );
    swordTip.rotation.x = Math.PI / 2;
    swordTip.rotation.y = Math.PI / 4;
    swordTip.position.set(0, 0.06, 1.48);
    registerSwordPart(swordTip);

    const swordGuard = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.12, 0.14),
      swordGuardMaterial
    );
    swordGuard.position.set(0, 0.06, 0.08);
    registerSwordPart(swordGuard);

    const swordGrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.1, 0.42),
      swordGripMaterial
    );
    swordGrip.position.set(0, 0.05, -0.2);
    registerSwordPart(swordGrip);

    const swordPommel = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 10, 10),
      swordPommelMaterial
    );
    swordPommel.position.set(0, 0.05, -0.46);
    registerSwordPart(swordPommel);

    swordPivot.add(swordRig);

    playerGroup.add(avatarVisualGroup);
    playerGroup.add(swordPivot);
    scene.add(playerGroup);

    const enemyGeometry = new THREE.BoxGeometry(0.88, 0.88, 0.88);
    const enemyMaterial = new THREE.MeshStandardMaterial({
      color: 0xc94f4f,
      roughness: 0.58,
    });

    const beamGeometry = new THREE.BoxGeometry(0.28, 0.2, 0.28);
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x8dd7ff,
      roughness: 0.2,
      metalness: 0.45,
      emissive: 0x1d4f73,
      emissiveIntensity: 0.45,
    });

    const heartGeometry = new THREE.OctahedronGeometry(0.36, 0);
    const heartMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6a6a,
      roughness: 0.42,
    });

    const enemies: EnemyState[] = [];
    const beams: EnemyBeamState[] = [];
    const hearts: HeartState[] = [];

    const player: PlayerState = {
      x: 0,
      z: 0,
      facing: "down",
      hp: 5,
      maxHp: 5,
      invulnerableTimer: 0,
      attackTimer: 0,
      attackCooldown: 0,
    };

    let score = 0;
    let wave = 1;
    let enemyId = 1;
    let heartId = 1;
    let beamId = 1;
    let hudTimer = 0;
    let rafId = 0;
    let lastNow = performance.now();

    const snapshotHud = (): HudState => ({
      mode: modeRef.current,
      hp: player.hp,
      maxHp: player.maxHp,
      score,
      wave,
      enemies: enemies.length,
    });

    const pushHud = (force = false): void => {
      if (!force && hudTimer < 0.08) return;
      hudTimer = 0;
      setHud(snapshotHud());
    };

    const applyPlayerHit = (): void => {
      if (player.invulnerableTimer > 0 || modeRef.current !== "playing") {
        return;
      }

      player.hp -= 1;
      player.invulnerableTimer = PLAYER_HIT_COOLDOWN;

      if (player.hp <= 0) {
        player.hp = 0;
        modeRef.current = "gameOver";
        keyStateRef.current = {};
        attackKeyHeldRef.current = false;
        pushHud(true);
      }
    };

    const pauseGame = (): void => {
      if (modeRef.current !== "playing") return;
      modeRef.current = "paused";
      keyStateRef.current = {};
      attackKeyHeldRef.current = false;
      pushHud(true);
    };

    const resumeGame = (): void => {
      if (modeRef.current !== "paused") return;
      modeRef.current = "playing";
      keyStateRef.current = {};
      attackKeyHeldRef.current = false;
      preferredAxisRef.current = "z";
      pushHud(true);
    };

    const collidesWithArena = (
      x: number,
      z: number,
      radius: number
    ): boolean => {
      if (
        x - radius < -ARENA_HALF_WIDTH ||
        x + radius > ARENA_HALF_WIDTH ||
        z - radius < -ARENA_HALF_DEPTH ||
        z + radius > ARENA_HALF_DEPTH
      ) {
        return true;
      }

      return WALLS.some((wall) => {
        const halfW = wall.width / 2;
        const halfD = wall.depth / 2;
        return (
          x + radius > wall.x - halfW &&
          x - radius < wall.x + halfW &&
          z + radius > wall.z - halfD &&
          z - radius < wall.z + halfD
        );
      });
    };

    const applyMovement = (
      x: number,
      z: number,
      moveX: number,
      moveZ: number,
      radius: number
    ): { x: number; z: number } => {
      let nextX = x + moveX;
      if (collidesWithArena(nextX, z, radius)) {
        nextX = x;
      }

      let nextZ = z + moveZ;
      if (collidesWithArena(nextX, nextZ, radius)) {
        nextZ = z;
      }

      return { x: nextX, z: nextZ };
    };

    const beamHitsShield = (beam: EnemyBeamState): boolean => {
      if (player.attackTimer > 0) return false;

      const facingVector = facingToVector(player.facing);
      const leftVector = { x: -facingVector.z, z: facingVector.x };
      const shieldCenterX =
        player.x +
        facingVector.x * SHIELD_FORWARD_OFFSET +
        leftVector.x * SHIELD_LATERAL_OFFSET;
      const shieldCenterZ =
        player.z +
        facingVector.z * SHIELD_FORWARD_OFFSET +
        leftVector.z * SHIELD_LATERAL_OFFSET;

      const dx = beam.x - shieldCenterX;
      const dz = beam.z - shieldCenterZ;
      const distance = Math.sqrt(dx * dx + dz * dz);
      if (distance > SHIELD_BLOCK_RADIUS + ENEMY_BEAM_RADIUS) {
        return false;
      }

      const incomingAlignment =
        beam.dx * facingVector.x + beam.dz * facingVector.z;
      return incomingAlignment <= -0.45;
    };

    const removeEnemy = (target: EnemyState): void => {
      scene.remove(target.mesh);
      const index = enemies.findIndex((enemy) => enemy.id === target.id);
      if (index !== -1) {
        enemies.splice(index, 1);
      }
    };

    const removeHeart = (target: HeartState): void => {
      scene.remove(target.mesh);
      const index = hearts.findIndex((heart) => heart.id === target.id);
      if (index !== -1) {
        hearts.splice(index, 1);
      }
    };

    const removeBeam = (target: EnemyBeamState): void => {
      scene.remove(target.mesh);
      const index = beams.findIndex((beam) => beam.id === target.id);
      if (index !== -1) {
        beams.splice(index, 1);
      }
    };

    const spawnHeart = (x: number, z: number): void => {
      const heart = new THREE.Mesh(heartGeometry, heartMaterial);
      heart.position.set(x, 0.55, z);
      scene.add(heart);

      hearts.push({
        id: heartId,
        x,
        z,
        ttl: 8,
        mesh: heart,
      });
      heartId += 1;
    };

    const randomDirection = (): Facing =>
      CARDINAL_DIRECTIONS[
        Math.floor(Math.random() * CARDINAL_DIRECTIONS.length)
      ];

    const randomDirectionTimer = (): number =>
      THREE.MathUtils.randFloat(
        ENEMY_DIRECTION_CHANGE_MIN,
        ENEMY_DIRECTION_CHANGE_MAX
      );

    const randomBeamCooldown = (): number =>
      THREE.MathUtils.randFloat(
        ENEMY_BEAM_COOLDOWN_MIN,
        ENEMY_BEAM_COOLDOWN_MAX
      );

    const buildPattern = (startDirection: Facing): Facing[] => {
      const startIndex = CARDINAL_DIRECTIONS.indexOf(startDirection);
      const clockwise = Math.random() < 0.5;
      return CARDINAL_DIRECTIONS.map((_, index) => {
        const offset = clockwise ? index : -index;
        const directionIndex =
          (startIndex + offset + CARDINAL_DIRECTIONS.length * 2) %
          CARDINAL_DIRECTIONS.length;
        return CARDINAL_DIRECTIONS[directionIndex];
      });
    };

    const turnPattern = (enemy: EnemyState): void => {
      enemy.patternIndex = (enemy.patternIndex + 1) % enemy.pattern.length;
      enemy.direction = enemy.pattern[enemy.patternIndex];
      enemy.directionTimer = randomDirectionTimer();
    };

    const playerIsInEnemyDirection = (enemy: EnemyState): boolean => {
      if (enemy.direction === "up") {
        if (player.z >= enemy.z) return false;
        if (Math.abs(player.x - enemy.x) > ENEMY_BEAM_ALIGNMENT) return false;
        return !WALLS.some((wall) => {
          const minZ = Math.min(player.z, enemy.z);
          const maxZ = Math.max(player.z, enemy.z);
          const wallHalfW = wall.width / 2;
          const wallHalfD = wall.depth / 2;
          const beamLeft = enemy.x - ENEMY_BEAM_RADIUS;
          const beamRight = enemy.x + ENEMY_BEAM_RADIUS;
          const wallLeft = wall.x - wallHalfW;
          const wallRight = wall.x + wallHalfW;
          const wallFront = wall.z - wallHalfD;
          const wallBack = wall.z + wallHalfD;
          return (
            beamRight > wallLeft &&
            beamLeft < wallRight &&
            maxZ > wallFront &&
            minZ < wallBack
          );
        });
      }

      if (enemy.direction === "down") {
        if (player.z <= enemy.z) return false;
        if (Math.abs(player.x - enemy.x) > ENEMY_BEAM_ALIGNMENT) return false;
        return !WALLS.some((wall) => {
          const minZ = Math.min(player.z, enemy.z);
          const maxZ = Math.max(player.z, enemy.z);
          const wallHalfW = wall.width / 2;
          const wallHalfD = wall.depth / 2;
          const beamLeft = enemy.x - ENEMY_BEAM_RADIUS;
          const beamRight = enemy.x + ENEMY_BEAM_RADIUS;
          const wallLeft = wall.x - wallHalfW;
          const wallRight = wall.x + wallHalfW;
          const wallFront = wall.z - wallHalfD;
          const wallBack = wall.z + wallHalfD;
          return (
            beamRight > wallLeft &&
            beamLeft < wallRight &&
            maxZ > wallFront &&
            minZ < wallBack
          );
        });
      }

      if (enemy.direction === "left") {
        if (player.x >= enemy.x) return false;
        if (Math.abs(player.z - enemy.z) > ENEMY_BEAM_ALIGNMENT) return false;
        return !WALLS.some((wall) => {
          const minX = Math.min(player.x, enemy.x);
          const maxX = Math.max(player.x, enemy.x);
          const wallHalfW = wall.width / 2;
          const wallHalfD = wall.depth / 2;
          const beamTop = enemy.z - ENEMY_BEAM_RADIUS;
          const beamBottom = enemy.z + ENEMY_BEAM_RADIUS;
          const wallLeft = wall.x - wallHalfW;
          const wallRight = wall.x + wallHalfW;
          const wallFront = wall.z - wallHalfD;
          const wallBack = wall.z + wallHalfD;
          return (
            beamBottom > wallFront &&
            beamTop < wallBack &&
            maxX > wallLeft &&
            minX < wallRight
          );
        });
      }

      if (player.x <= enemy.x) return false;
      if (Math.abs(player.z - enemy.z) > ENEMY_BEAM_ALIGNMENT) return false;
      return !WALLS.some((wall) => {
        const minX = Math.min(player.x, enemy.x);
        const maxX = Math.max(player.x, enemy.x);
        const wallHalfW = wall.width / 2;
        const wallHalfD = wall.depth / 2;
        const beamTop = enemy.z - ENEMY_BEAM_RADIUS;
        const beamBottom = enemy.z + ENEMY_BEAM_RADIUS;
        const wallLeft = wall.x - wallHalfW;
        const wallRight = wall.x + wallHalfW;
        const wallFront = wall.z - wallHalfD;
        const wallBack = wall.z + wallHalfD;
        return (
          beamBottom > wallFront &&
          beamTop < wallBack &&
          maxX > wallLeft &&
          minX < wallRight
        );
      });
    };

    const spawnBeam = (enemy: EnemyState): void => {
      const dir = facingToVector(enemy.direction);
      const spawnDistance = ENEMY_RADIUS + ENEMY_BEAM_RADIUS + 0.08;
      const beamX = enemy.x + dir.x * spawnDistance;
      const beamZ = enemy.z + dir.z * spawnDistance;

      if (collidesWithArena(beamX, beamZ, ENEMY_BEAM_RADIUS * 0.8)) {
        return;
      }

      const beamMesh = new THREE.Mesh(beamGeometry, beamMaterial);
      beamMesh.position.set(beamX, 0.47, beamZ);
      scene.add(beamMesh);

      beams.push({
        id: beamId,
        x: beamX,
        z: beamZ,
        dx: dir.x,
        dz: dir.z,
        speed: ENEMY_BEAM_SPEED,
        ttl: ENEMY_BEAM_TTL,
        mesh: beamMesh,
      });
      beamId += 1;
    };

    const spawnWave = (round: number): void => {
      const enemyCount = Math.max(1, 2 ** round);
      for (let i = 0; i < enemyCount; i += 1) {
        spawnEnemy();
      }
    };

    const spawnEnemy = (): void => {
      const side = Math.floor(Math.random() * 4);
      const margin = 0.7;
      let x = 0;
      let z = 0;

      if (side === 0) {
        x = -ARENA_HALF_WIDTH + margin;
        z = THREE.MathUtils.randFloat(
          -ARENA_HALF_DEPTH + 1.1,
          ARENA_HALF_DEPTH - 1.1
        );
      } else if (side === 1) {
        x = ARENA_HALF_WIDTH - margin;
        z = THREE.MathUtils.randFloat(
          -ARENA_HALF_DEPTH + 1.1,
          ARENA_HALF_DEPTH - 1.1
        );
      } else if (side === 2) {
        x = THREE.MathUtils.randFloat(
          -ARENA_HALF_WIDTH + 1.1,
          ARENA_HALF_WIDTH - 1.1
        );
        z = -ARENA_HALF_DEPTH + margin;
      } else {
        x = THREE.MathUtils.randFloat(
          -ARENA_HALF_WIDTH + 1.1,
          ARENA_HALF_WIDTH - 1.1
        );
        z = ARENA_HALF_DEPTH - margin;
      }

      let attempts = 0;
      while (attempts < 14) {
        const dx = x - player.x;
        const dz = z - player.z;
        const tooClose = Math.sqrt(dx * dx + dz * dz) < 5.5;

        if (!tooClose && !collidesWithArena(x, z, ENEMY_RADIUS)) break;

        x = THREE.MathUtils.randFloat(
          -ARENA_HALF_WIDTH + 1.2,
          ARENA_HALF_WIDTH - 1.2
        );
        z = THREE.MathUtils.randFloat(
          -ARENA_HALF_DEPTH + 1.2,
          ARENA_HALF_DEPTH - 1.2
        );
        attempts += 1;
      }

      const mesh = new THREE.Mesh(enemyGeometry, enemyMaterial.clone());
      mesh.position.set(x, 0.44, z);
      scene.add(mesh);

      const direction = randomDirection();
      const pattern = buildPattern(direction);

      enemies.push({
        id: enemyId,
        x,
        z,
        speed: BASE_ENEMY_SPEED + Math.min(1.4, wave * 0.11),
        direction,
        pattern,
        patternIndex: 0,
        directionTimer: randomDirectionTimer(),
        beamCooldown:
          randomBeamCooldown() * THREE.MathUtils.randFloat(0.4, 0.9),
        mesh,
      });
      enemyId += 1;
    };

    const performAttack = (): void => {
      if (modeRef.current !== "playing") return;
      if (player.attackCooldown > 0 || player.attackTimer > 0) return;

      player.attackTimer = ATTACK_DURATION;
      player.attackCooldown = ATTACK_COOLDOWN;

      const facingVector = facingToVector(player.facing);
      const attackCos = Math.cos(ATTACK_ARC_RADIANS / 2);
      const hitTargets: EnemyState[] = [];

      enemies.forEach((enemy) => {
        const dx = enemy.x - player.x;
        const dz = enemy.z - player.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (
          distance > ATTACK_RANGE + ATTACK_CONTACT_PADDING ||
          distance <= 0.0001
        )
          return;

        const dot =
          (dx / distance) * facingVector.x + (dz / distance) * facingVector.z;
        if (dot >= attackCos) {
          hitTargets.push(enemy);
        }
      });

      if (hitTargets.length === 0) {
        return;
      }

      hitTargets.forEach((enemy) => {
        removeEnemy(enemy);
        score += 100;

        if (player.hp < player.maxHp && Math.random() < HEART_SPAWN_CHANCE) {
          spawnHeart(enemy.x, enemy.z);
        }
      });
    };

    tryAttackRef.current = performAttack;
    resumeGameRef.current = resumeGame;

    const syncPlayerMesh = (): void => {
      playerGroup.position.set(player.x, 0, player.z);
      playerGroup.rotation.y = facingToRotation(player.facing);
      shieldGroup.scale.setScalar(1.5);

      if (player.attackTimer > 0) {
        swordRig.visible = true;
        swordArmGroup.visible = true;
        const progress = 1 - player.attackTimer / ATTACK_DURATION;
        const eased = 1 - Math.pow(1 - progress, 2);
        const shieldSideBlend = Math.sin(progress * Math.PI);
        const baseStartSweep = -ATTACK_ARC_RADIANS * 0.58;
        const baseEndSweep = ATTACK_ARC_RADIANS * 0.36;
        const shouldMirrorSweep =
          player.facing === "left" || player.facing === "right";
        const startSweep = shouldMirrorSweep ? -baseStartSweep : baseStartSweep;
        const endSweep = shouldMirrorSweep ? -baseEndSweep : baseEndSweep;

        shieldGroup.position.set(
          THREE.MathUtils.lerp(-0.11, -0.4, shieldSideBlend),
          THREE.MathUtils.lerp(0.88, 0.8, shieldSideBlend),
          THREE.MathUtils.lerp(0.3, 0.1, shieldSideBlend)
        );
        shieldGroup.rotation.set(
          THREE.MathUtils.lerp(0.02, 0.16, shieldSideBlend),
          THREE.MathUtils.lerp(-0.16, -0.92, shieldSideBlend),
          THREE.MathUtils.lerp(0.04, 0.24, shieldSideBlend)
        );

        swordPivot.rotation.y = THREE.MathUtils.lerp(
          startSweep,
          endSweep,
          eased
        );
        swordRig.rotation.x = THREE.MathUtils.lerp(-0.4, -0.22, progress);
        swordArmGroup.rotation.x = THREE.MathUtils.lerp(-0.28, -0.02, progress);
        swordArmGroup.rotation.z = THREE.MathUtils.lerp(-0.92, -0.32, progress);
      } else {
        swordRig.visible = false;
        swordArmGroup.visible = false;
        shieldGroup.position.set(-0.11, 0.88, 0.3);
        shieldGroup.rotation.set(0.02, -0.16, 0.04);
        swordPivot.rotation.y = 0;
        swordRig.rotation.x = -0.32;
        swordArmGroup.rotation.set(-0.12, 0.08, -0.45);
      }

      playerSkinMaterial.color.setHex(
        player.invulnerableTimer > 0 ? 0xf7d2d2 : 0xe7d8b2
      );
    };

    const startGame = (): void => {
      modeRef.current = "playing";

      player.x = 0;
      player.z = 0;
      player.facing = "down";
      player.hp = 5;
      player.maxHp = 5;
      player.invulnerableTimer = 0;
      player.attackTimer = 0;
      player.attackCooldown = 0;

      score = 0;
      wave = 1;
      enemyId = 1;
      heartId = 1;
      beamId = 1;

      while (enemies.length > 0) {
        const enemy = enemies.pop();
        if (enemy) scene.remove(enemy.mesh);
      }

      while (beams.length > 0) {
        const beam = beams.pop();
        if (beam) scene.remove(beam.mesh);
      }

      while (hearts.length > 0) {
        const heart = hearts.pop();
        if (heart) scene.remove(heart.mesh);
      }

      keyStateRef.current = {};
      attackKeyHeldRef.current = false;
      preferredAxisRef.current = "z";
      spawnWave(wave);

      syncPlayerMesh();
      pushHud(true);
    };

    startGameRef.current = startGame;

    const resizeRenderer = (): void => {
      const width = Math.max(320, host.clientWidth);
      const height = clamp(Math.round(width * 0.72), 260, 620);

      renderer.setSize(width, height, false);

      const aspect = width / height;
      const viewHeight = 26;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.left = (-viewHeight * aspect) / 2;
      camera.right = (viewHeight * aspect) / 2;
      camera.updateProjectionMatrix();
    };

    const toggleFullscreen = (): void => {
      if (!document.fullscreenElement) {
        void host.requestFullscreen?.();
      } else {
        void document.exitFullscreen();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === "Escape") {
        event.preventDefault();
        if (modeRef.current === "playing") {
          pauseGame();
        } else if (modeRef.current === "paused") {
          resumeGame();
        }
        return;
      }

      if (key === "f") {
        event.preventDefault();
        toggleFullscreen();
        return;
      }

      if (modeRef.current === "menu" && (key === "Enter" || key === " ")) {
        event.preventDefault();
        startGame();
        return;
      }

      if (modeRef.current === "gameOver" && (key === "Enter" || key === " ")) {
        event.preventDefault();
        startGame();
        return;
      }

      if (modeRef.current === "paused" && (key === "Enter" || key === " ")) {
        event.preventDefault();
        resumeGame();
        return;
      }

      keyStateRef.current[key] = true;
      updateDirectionalIntent(key);

      const isAttackKey =
        key === " " ||
        key === "Space" ||
        key === "space" ||
        key === "Spacebar" ||
        key === "spacebar" ||
        key === "j" ||
        key === "k";

      if (isAttackKey && !event.repeat) {
        event.preventDefault();
        performAttack();
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      keyStateRef.current[key] = false;
    };

    const readAxis = (): { x: number; z: number } => {
      const left = keyStateRef.current.ArrowLeft || keyStateRef.current.a;
      const right = keyStateRef.current.ArrowRight || keyStateRef.current.d;
      const up = keyStateRef.current.ArrowUp || keyStateRef.current.w;
      const down = keyStateRef.current.ArrowDown || keyStateRef.current.s;

      let x = 0;
      let z = 0;

      if (left) x -= 1;
      if (right) x += 1;
      if (up) z -= 1;
      if (down) z += 1;

      if (x !== 0 && z !== 0) {
        if (preferredAxisRef.current === "x") {
          z = 0;
        } else {
          x = 0;
        }
      }

      return { x, z };
    };

    const updateGame = (deltaSeconds: number): void => {
      hudTimer += deltaSeconds;

      if (modeRef.current !== "playing") {
        pushHud();
        return;
      }

      player.attackCooldown = Math.max(0, player.attackCooldown - deltaSeconds);
      player.attackTimer = Math.max(0, player.attackTimer - deltaSeconds);
      player.invulnerableTimer = Math.max(
        0,
        player.invulnerableTimer - deltaSeconds
      );

      const isAttackKeyHeld = Boolean(
        keyStateRef.current[" "] ||
        keyStateRef.current.Space ||
        keyStateRef.current.space ||
        keyStateRef.current.Spacebar ||
        keyStateRef.current.spacebar ||
        keyStateRef.current.j ||
        keyStateRef.current.k
      );
      if (isAttackKeyHeld && !attackKeyHeldRef.current) {
        performAttack();
      }
      attackKeyHeldRef.current = isAttackKeyHeld;

      const axis = readAxis();
      if (axis.x !== 0 || axis.z !== 0) {
        if (axis.x > 0) player.facing = "right";
        if (axis.x < 0) player.facing = "left";
        if (axis.z > 0) player.facing = "down";
        if (axis.z < 0) player.facing = "up";

        const velocity = PLAYER_SPEED * deltaSeconds;
        const next = applyMovement(
          player.x,
          player.z,
          axis.x * velocity,
          axis.z * velocity,
          PLAYER_RADIUS
        );
        player.x = next.x;
        player.z = next.z;
      }

      for (let i = enemies.length - 1; i >= 0; i -= 1) {
        const enemy = enemies[i];
        enemy.directionTimer = Math.max(0, enemy.directionTimer - deltaSeconds);
        enemy.beamCooldown -= deltaSeconds;

        if (enemy.directionTimer <= 0) {
          turnPattern(enemy);
        }

        const direction = facingToVector(enemy.direction);
        const step = enemy.speed * deltaSeconds;
        const moved = applyMovement(
          enemy.x,
          enemy.z,
          direction.x * step,
          direction.z * step,
          ENEMY_RADIUS
        );
        const blocked =
          Math.abs(moved.x - enemy.x) < 0.0001 &&
          Math.abs(moved.z - enemy.z) < 0.0001;

        enemy.x = moved.x;
        enemy.z = moved.z;

        if (blocked) {
          turnPattern(enemy);
        }

        enemy.mesh.position.set(enemy.x, 0.44, enemy.z);

        if (enemy.beamCooldown <= 0) {
          if (playerIsInEnemyDirection(enemy)) {
            spawnBeam(enemy);
            enemy.beamCooldown = randomBeamCooldown();
          } else {
            enemy.beamCooldown = 0.14;
          }
        }
      }

      for (let i = beams.length - 1; i >= 0; i -= 1) {
        const beam = beams[i];
        beam.ttl -= deltaSeconds;
        beam.x += beam.dx * beam.speed * deltaSeconds;
        beam.z += beam.dz * beam.speed * deltaSeconds;
        beam.mesh.position.set(beam.x, 0.47, beam.z);

        if (
          beam.ttl <= 0 ||
          collidesWithArena(beam.x, beam.z, ENEMY_BEAM_RADIUS)
        ) {
          removeBeam(beam);
          continue;
        }

        const dx = beam.x - player.x;
        const dz = beam.z - player.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (beamHitsShield(beam)) {
          removeBeam(beam);
          continue;
        }

        if (distance <= PLAYER_RADIUS + ENEMY_BEAM_RADIUS) {
          applyPlayerHit();
          removeBeam(beam);

          if (modeRef.current === "gameOver") {
            break;
          }
        }
      }

      for (let i = hearts.length - 1; i >= 0; i -= 1) {
        const heart = hearts[i];
        heart.ttl -= deltaSeconds;

        heart.mesh.rotation.y += deltaSeconds * 2;
        heart.mesh.position.y =
          0.58 + Math.sin(performance.now() / 180 + heart.id) * 0.08;

        const dx = heart.x - player.x;
        const dz = heart.z - player.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance <= HEART_PICKUP_RADIUS && player.hp < player.maxHp) {
          player.hp = Math.min(player.maxHp, player.hp + 1);
          removeHeart(heart);
          continue;
        }

        if (heart.ttl <= 0) {
          removeHeart(heart);
        }
      }

      if (modeRef.current === "playing" && enemies.length === 0) {
        wave += 1;
        spawnWave(wave);
      }

      syncPlayerMesh();
      pushHud();
    };

    const renderFrame = (): void => {
      renderer.render(scene, camera);
    };

    const advanceBy = (milliseconds: number): void => {
      const seconds = milliseconds / 1000;
      if (!Number.isFinite(seconds) || seconds <= 0) return;

      const steps = Math.max(1, Math.round(seconds / FIXED_STEP));
      const stepDelta = seconds / steps;
      for (let i = 0; i < steps; i += 1) {
        updateGame(stepDelta);
      }
      renderFrame();
    };

    const renderGameToText = (): string => {
      const payload = {
        coordinateSystem:
          "origin at arena center (0,0). x increases right. z increases down toward the bottom of the screen.",
        mode: modeRef.current,
        player: {
          x: Number(player.x.toFixed(2)),
          z: Number(player.z.toFixed(2)),
          facing: player.facing,
          hp: player.hp,
          maxHp: player.maxHp,
          invulnerable: player.invulnerableTimer > 0,
          attacking: player.attackTimer > 0,
          attackCooldown: Number(player.attackCooldown.toFixed(2)),
          shieldReady: player.attackTimer <= 0,
        },
        enemies: enemies.map((enemy) => ({
          id: enemy.id,
          x: Number(enemy.x.toFixed(2)),
          z: Number(enemy.z.toFixed(2)),
          direction: enemy.direction,
        })),
        beams: beams.map((beam) => ({
          id: beam.id,
          x: Number(beam.x.toFixed(2)),
          z: Number(beam.z.toFixed(2)),
          dx: beam.dx,
          dz: beam.dz,
          ttl: Number(beam.ttl.toFixed(2)),
        })),
        hearts: hearts.map((heart) => ({
          id: heart.id,
          x: Number(heart.x.toFixed(2)),
          z: Number(heart.z.toFixed(2)),
          ttl: Number(heart.ttl.toFixed(2)),
        })),
        walls: WALLS,
        score,
        wave,
      };

      return JSON.stringify(payload);
    };

    window.advanceTime = advanceBy;
    window.render_game_to_text = renderGameToText;

    const loop = (now: number): void => {
      const delta = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      updateGame(delta);
      renderFrame();
      rafId = window.requestAnimationFrame(loop);
    };

    resizeRenderer();
    syncPlayerMesh();
    pushHud(true);
    renderFrame();

    window.addEventListener("resize", resizeRenderer);
    window.addEventListener("fullscreenchange", resizeRenderer);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeRenderer);
      window.removeEventListener("fullscreenchange", resizeRenderer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);

      if (window.advanceTime === advanceBy) {
        delete window.advanceTime;
      }
      if (window.render_game_to_text === renderGameToText) {
        delete window.render_game_to_text;
      }

      enemies.forEach((enemy) => {
        scene.remove(enemy.mesh);
      });
      beams.forEach((beam) => {
        scene.remove(beam.mesh);
      });
      hearts.forEach((heart) => {
        scene.remove(heart.mesh);
      });

      scene.remove(playerGroup);
      scene.remove(floor);
      scene.remove(grid);
      scene.remove(ambient);
      scene.remove(keyLight);
      scene.remove(rimLight);
      wallMeshes.forEach((mesh) => scene.remove(mesh));

      renderer.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      playerPartMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
      });
      playerSkinMaterial.dispose();
      playerTunicMaterial.dispose();
      playerBeltMaterial.dispose();
      playerBootMaterial.dispose();
      playerCloakMaterial.dispose();
      playerEyeMaterial.dispose();
      playerCrestMaterial.dispose();
      playerHatMaterial.dispose();
      playerShieldFaceMaterial.dispose();
      playerShieldRimMaterial.dispose();
      playerShieldEmblemMaterial.dispose();
      swordPartMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
      });
      swordBladeMaterial.dispose();
      swordEdgeMaterial.dispose();
      swordGuardMaterial.dispose();
      swordGripMaterial.dispose();
      swordPommelMaterial.dispose();
      enemyGeometry.dispose();
      enemyMaterial.dispose();
      beamGeometry.dispose();
      beamMaterial.dispose();
      heartGeometry.dispose();
      heartMaterial.dispose();
      wallMaterial.dispose();
      wallAccentMaterial.dispose();

      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [updateDirectionalIntent]);

  return (
    <div className="arena-shell">
      <div className="arena-stage-frame">
        <div ref={mountRef} className="arena-stage" />

        {hud.mode !== "playing" ? (
          <div className="arena-overlay">
            <h2>
              {hud.mode === "menu"
                ? "Forest Arena"
                : hud.mode === "paused"
                  ? "Paused"
                  : "Defeat"}
            </h2>
            <p>
              {hud.mode === "menu"
                ? "Move with arrow keys or WASD. Press J/K/Space to swing. Press Esc to pause. Survive waves like 8-bit Zelda combat."
                : hud.mode === "paused"
                  ? "Press Esc to resume, or use the button below to jump back into the arena."
                  : `Final score: ${hud.score}. Press Start Arena to run again.`}
            </p>
            <button
              type="button"
              onClick={handleStart}
              className="arena-button"
              id="start-btn"
            >
              {hud.mode === "paused" ? "Resume Arena" : "Start Arena"}
            </button>
          </div>
        ) : null}

        <div className="arena-hud" aria-live="polite">
          <div>
            Hearts: {"\u2665".repeat(hud.hp)}
            {"\u2661".repeat(Math.max(0, hud.maxHp - hud.hp))}
          </div>
          <div>Score: {hud.score}</div>
          <div>Wave: {hud.wave}</div>
          <div>Enemies: {hud.enemies}</div>
          <div>{hud.mode === "paused" ? "Resume: Esc" : "Pause: Esc"}</div>
        </div>
      </div>

      <div className="arena-touch-controls" aria-label="touch controls">
        <div className="touch-pad">
          <button
            type="button"
            onPointerDown={() => setVirtualKey("ArrowUp", true)}
            onPointerUp={() => setVirtualKey("ArrowUp", false)}
            onPointerCancel={() => setVirtualKey("ArrowUp", false)}
          >
            Up
          </button>
          <button
            type="button"
            onPointerDown={() => setVirtualKey("ArrowLeft", true)}
            onPointerUp={() => setVirtualKey("ArrowLeft", false)}
            onPointerCancel={() => setVirtualKey("ArrowLeft", false)}
          >
            Left
          </button>
          <button
            type="button"
            onPointerDown={() => setVirtualKey("ArrowDown", true)}
            onPointerUp={() => setVirtualKey("ArrowDown", false)}
            onPointerCancel={() => setVirtualKey("ArrowDown", false)}
          >
            Down
          </button>
          <button
            type="button"
            onPointerDown={() => setVirtualKey("ArrowRight", true)}
            onPointerUp={() => setVirtualKey("ArrowRight", false)}
            onPointerCancel={() => setVirtualKey("ArrowRight", false)}
          >
            Right
          </button>
        </div>
        <button
          type="button"
          className="touch-attack"
          onPointerDown={handleAttackPress}
          onPointerUp={() => undefined}
          onPointerCancel={() => undefined}
        >
          Swing
        </button>
      </div>
    </div>
  );
}
