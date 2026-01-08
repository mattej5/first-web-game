"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Phaser from "phaser";
import "./styles.css";

type LaneConfig = {
  totalLanes: number;
  playerLanes: number;
  oncomingLanes: number;
};

type CarDirection = "with" | "against";

type TrafficCar = {
  rect: Phaser.GameObjects.Rectangle;
  laneIndex: number;
  speed: number;
  direction: CarDirection;
  passed?: boolean;
};

type SceneCallbacks = {
  onScore: (score: number) => void;
  onLives: (lives: number) => void;
  onLaneMode: (mode: "2" | "4") => void;
  onSpeed: (speed: number) => void;
  onStatus: (text: string) => void;
  onFlash: (text: string | null) => void;
  onGameOver: (score: number) => void;
  onPlayingChange: (playing: boolean) => void;
};

const CANVAS_WIDTH = 420;
const CANVAS_HEIGHT = 640;
const ROAD_WIDTH = 320;
const PLAYER_WIDTH = 34;
const PLAYER_HEIGHT = 60;
const PLAYER_Y = CANVAS_HEIGHT - 140;
const BASE_SPEED = 180;
const EXTRA_SPEED_MAX = 120;
const SPEED_RAMP_PER_SEC = 1.2;
const BOOST_SPEED = 80;
const BRAKE_AMOUNT = 80;
const CAR_LENGTH = 56;
const CAR_WIDTH = 32;
const ONCOMING_LENGTH = 64;
const SAFE_SPAWN_GAP = 110;
const SAME_DIRECTION_SPAWN_MS = 1200;
const ONCOMING_SPAWN_MS = 1900;
const MIN_SAME_SPAWN_MS = 650;
const MIN_ONCOMING_SPAWN_MS = 950;
const LANE_CHANGE_MIN_MS = 150;
const LANE_CHANGE_MIN_INTERVAL = 9000;
const LANE_CHANGE_MAX_INTERVAL = 14000;
const CRASH_INVULNERABLE_MS = 1200;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const randBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const laneCenter = (laneIndex: number, config: LaneConfig) => {
  const laneWidth = ROAD_WIDTH / config.totalLanes;
  const offset = (CANVAS_WIDTH - ROAD_WIDTH) / 2;
  return offset + laneWidth * laneIndex + laneWidth / 2;
};

const pickLane = (config: LaneConfig, direction: CarDirection) => {
  if (direction === "with") {
    return config.oncomingLanes + Math.floor(Math.random() * config.playerLanes);
  }
  return Math.floor(Math.random() * config.oncomingLanes);
};

const laneRange = (config: LaneConfig, direction: CarDirection) => {
  return direction === "with"
    ? { start: config.oncomingLanes, end: config.totalLanes - 1 }
    : { start: 0, end: config.oncomingLanes - 1 };
};

class DriveScene extends Phaser.Scene {
  private callbacks: SceneCallbacks;
  private laneConfig: LaneConfig = { totalLanes: 4, playerLanes: 2, oncomingLanes: 2 };
  private road!: Phaser.GameObjects.Graphics;
  private player!: Phaser.GameObjects.Rectangle;
  private playerLane = 3;
  private traffic: TrafficCar[] = [];
  private boost = false;
  private brake = false;
  private playing = false;
  private gameOver = false;
  private runStart = 0;
  private lastSameSpawn = 0;
  private lastOncomingSpawn = 0;
  private invulnerableUntil = 0;
  private lastLaneMove = 0;
  private laneSwitchAt = 0;
  private score = 0;
  private lives = 3;
  private lastSpeedBroadcast = BASE_SPEED;
  private statusText = "Tap Start to begin. WASD or Arrow keys to move.";

  constructor(callbacks: SceneCallbacks) {
    super("DriveScene");
    this.callbacks = callbacks;
  }

  create() {
    this.road = this.add.graphics();
    this.playerLane = this.laneConfig.totalLanes - 1;
    this.player = this.add.rectangle(laneCenter(this.playerLane, this.laneConfig), PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT, 0x34d399);
    this.player.setOrigin(0.5, 0);

    this.resetToIdle();
  }

  resetToIdle() {
    this.playing = false;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.laneConfig = { totalLanes: 4, playerLanes: 2, oncomingLanes: 2 };
    this.playerLane = this.laneConfig.totalLanes - 1;
    this.updatePlayerX();
    this.traffic.forEach((c) => c.rect.destroy());
    this.traffic = [];
    this.callbacks.onScore(this.score);
    this.callbacks.onLives(this.lives);
    this.callbacks.onLaneMode("4");
    this.callbacks.onSpeed(BASE_SPEED);
    this.callbacks.onStatus(this.statusText);
    this.callbacks.onFlash(null);
    this.callbacks.onPlayingChange(false);
    this.drawRoad();
  }

  startRun() {
    this.playing = true;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.callbacks.onScore(this.score);
    this.callbacks.onLives(this.lives);
    this.callbacks.onFlash(null);
    this.runStart = this.time.now;
    this.lastSameSpawn = this.runStart;
    this.lastOncomingSpawn = this.runStart;
    this.invulnerableUntil = this.runStart + 600;
    this.laneSwitchAt = this.runStart + randBetween(LANE_CHANGE_MIN_INTERVAL, LANE_CHANGE_MAX_INTERVAL);
    this.lastLaneMove = this.runStart;
    this.laneConfig = { totalLanes: 4, playerLanes: 2, oncomingLanes: 2 };
    this.callbacks.onLaneMode("4");
    this.playerLane = this.laneConfig.totalLanes - 1;
    this.updatePlayerX();
    this.traffic.forEach((c) => c.rect.destroy());
    this.traffic = [];
    this.callbacks.onStatus("Pass traffic on your side; you can risk oncoming lanes.");
    this.callbacks.onPlayingChange(true);
    this.drawRoad();
  }

  update(_time: number, delta: number) {
    if (!this.playing || this.gameOver) return;
    const time = this.time.now;

    const deltaSeconds = delta / 1000;
    const elapsedSeconds = (time - this.runStart) / 1000;
    const ramped = Math.min(BASE_SPEED + elapsedSeconds * SPEED_RAMP_PER_SEC, BASE_SPEED + EXTRA_SPEED_MAX);

    let playerSpeed = ramped;
    if (this.boost) playerSpeed += BOOST_SPEED;
    if (this.brake) playerSpeed -= BRAKE_AMOUNT;
    playerSpeed = clamp(playerSpeed, BASE_SPEED * 0.6, BASE_SPEED + EXTRA_SPEED_MAX + BOOST_SPEED);

    if (Math.abs(playerSpeed - this.lastSpeedBroadcast) > 1) {
      this.lastSpeedBroadcast = playerSpeed;
      this.callbacks.onSpeed(Math.round(playerSpeed));
    }

    if (time >= this.laneSwitchAt) {
      this.swapLaneMode(time);
    }

    const sameInterval = Math.max(MIN_SAME_SPAWN_MS, SAME_DIRECTION_SPAWN_MS - elapsedSeconds * 6);
    const oncomingInterval = Math.max(MIN_ONCOMING_SPAWN_MS, ONCOMING_SPAWN_MS - elapsedSeconds * 4);

    if (time - this.lastSameSpawn > sameInterval) {
      this.spawnCar("with", playerSpeed, time);
    }
    if (time - this.lastOncomingSpawn > oncomingInterval) {
      this.spawnCar("against", playerSpeed, time);
    }

    this.updateTraffic(playerSpeed, deltaSeconds, time);
    this.updateStatus(playerSpeed);
  }

  setBoost(active: boolean) {
    this.boost = active;
  }

  setBrake(active: boolean) {
    this.brake = active;
  }

  shiftLane(direction: "left" | "right") {
    if (!this.playing || this.gameOver) return;
    const now = this.time.now;
    if (now - this.lastLaneMove < LANE_CHANGE_MIN_MS) return;

    const delta = direction === "left" ? -1 : 1;
    const nextLane = clamp(this.playerLane + delta, 0, this.laneConfig.totalLanes - 1);
    this.playerLane = nextLane;
    this.lastLaneMove = now;
    this.updatePlayerX();
  }

  private updatePlayerX() {
    this.player.x = laneCenter(this.playerLane, this.laneConfig);
  }

  private drawRoad() {
    this.road.clear();

    const roadX = (CANVAS_WIDTH - ROAD_WIDTH) / 2;
    this.road.fillStyle(0x1f2937, 1);
    this.road.fillRect(roadX, 0, ROAD_WIDTH, CANVAS_HEIGHT);

    const laneWidth = ROAD_WIDTH / this.laneConfig.totalLanes;
    for (let i = 1; i < this.laneConfig.totalLanes; i += 1) {
      const x = roadX + laneWidth * i;
      this.road.lineStyle(2, 0x9ca3af, 1);
      for (let y = 0; y < CANVAS_HEIGHT; y += 24) {
        this.road.lineBetween(x, y, x, y + 14);
      }
    }

    const dividerX = roadX + laneWidth * this.laneConfig.oncomingLanes;
    this.road.lineStyle(4, 0xfbbf24, 1);
    for (let y = 0; y < CANVAS_HEIGHT; y += 22) {
      this.road.lineBetween(dividerX, y, dividerX, y + 12);
    }
  }

  private spawnCar(direction: CarDirection, playerSpeed: number, timestamp: number) {
    const config = this.laneConfig;
    if (direction === "against" && config.oncomingLanes <= 0) return;

    const laneIndex = pickLane(config, direction);
    const spawnY = -Math.max(CAR_LENGTH, ONCOMING_LENGTH) - Math.random() * 120;
    const conflict = this.traffic.some((car) => car.laneIndex === laneIndex && Math.abs(car.rect.y - spawnY) < SAFE_SPAWN_GAP);
    if (conflict) return;

    const relativeRatio = direction === "with" ? randBetween(0.45, 0.75) : randBetween(0.65, 0.95);
    const carSpeed = Math.max(90, playerSpeed * relativeRatio);

    const width = CAR_WIDTH;
    const height = direction === "with" ? CAR_LENGTH : ONCOMING_LENGTH;
    const rect = this.add.rectangle(laneCenter(laneIndex, config), spawnY, width, height, direction === "with" ? 0xcbd5e1 : 0xef4444);
    rect.setOrigin(0.5, 0);

    this.traffic.push({
      rect,
      laneIndex,
      speed: carSpeed,
      direction,
    });

    if (direction === "with") {
      this.lastSameSpawn = timestamp;
    } else {
      this.lastOncomingSpawn = timestamp;
    }
  }

  private updateTraffic(playerSpeed: number, deltaSeconds: number, timestamp: number) {
    const next: TrafficCar[] = [];
    const playerRect = new Phaser.Geom.Rectangle(
      this.player.x - PLAYER_WIDTH / 2,
      PLAYER_Y,
      PLAYER_WIDTH,
      PLAYER_HEIGHT
    );

    let crash = false;

    this.traffic.forEach((car) => {
      const height = car.direction === "with" ? CAR_LENGTH : ONCOMING_LENGTH;
      const relativeSpeed = car.direction === "with" ? playerSpeed - car.speed : playerSpeed + car.speed;
      car.rect.y += relativeSpeed * deltaSeconds;

      const carRect = new Phaser.Geom.Rectangle(car.rect.x - CAR_WIDTH / 2, car.rect.y, CAR_WIDTH, height);

      if (car.direction === "with" && !car.passed && car.rect.y > playerRect.y + playerRect.height) {
        car.passed = true;
        this.score += 1;
        this.callbacks.onScore(this.score);
      }

      if (!crash && timestamp > this.invulnerableUntil && Phaser.Geom.Intersects.RectangleToRectangle(playerRect, carRect)) {
        crash = true;
      }

      if (car.rect.y < CANVAS_HEIGHT + 120) {
        next.push(car);
      } else {
        car.rect.destroy();
      }
    });

    this.traffic = next;

    if (crash) {
      this.handleCrash(timestamp);
    }
  }

  private handleCrash(timestamp: number) {
    if (timestamp < this.invulnerableUntil) return;

    this.lives -= 1;
    this.callbacks.onLives(this.lives);

    if (this.lives <= 0) {
      this.gameOver = true;
      this.playing = false;
      this.callbacks.onFlash("Game over");
      this.callbacks.onStatus("Out of lives. Restart to run again.");
      this.callbacks.onGameOver(this.score);
      this.callbacks.onPlayingChange(false);
      return;
    }

    this.callbacks.onFlash(`Crash! ${this.lives} lives left`);
    this.invulnerableUntil = timestamp + CRASH_INVULNERABLE_MS;
    this.traffic.forEach((c) => c.rect.destroy());
    this.traffic = [];
    this.lastSameSpawn = timestamp + 400;
    this.lastOncomingSpawn = timestamp + 400;
    this.playerLane = Math.max(this.laneConfig.oncomingLanes, this.laneConfig.totalLanes - 1);
    this.updatePlayerX();
    this.lastLaneMove = timestamp;
  }

  private swapLaneMode(timestamp: number) {
    const nextTotal = this.laneConfig.totalLanes === 4 ? 2 : 4;
    this.laneConfig =
      nextTotal === 4 ? { totalLanes: 4, playerLanes: 2, oncomingLanes: 2 } : { totalLanes: 2, playerLanes: 1, oncomingLanes: 1 };
    this.callbacks.onLaneMode(nextTotal === 4 ? "4" : "2");
    this.callbacks.onFlash(`${nextTotal} lane stretch`);
    this.realignEntities();
    this.drawRoad();
    this.laneSwitchAt = timestamp + randBetween(LANE_CHANGE_MIN_INTERVAL, LANE_CHANGE_MAX_INTERVAL);
  }

  private realignEntities() {
    this.playerLane = clamp(this.playerLane, 0, this.laneConfig.totalLanes - 1);
    this.updatePlayerX();

    this.traffic.forEach((car) => {
      const range = laneRange(this.laneConfig, car.direction);
      const laneIndex = clamp(car.laneIndex, range.start, range.end);
      car.laneIndex = laneIndex;
      car.rect.x = laneCenter(laneIndex, this.laneConfig);
    });
  }

  private updateStatus(playerSpeed: number) {
    const next =
      playerSpeed > BASE_SPEED + EXTRA_SPEED_MAX * 0.6
        ? "Lanes are getting faster - watch your gaps."
        : "Keep passing slower traffic.";

    if (next !== this.statusText) {
      this.statusText = next;
      this.callbacks.onStatus(next);
    }
  }
}

export default function DriveGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<DriveScene | null>(null);
  const flashTimer = useRef<NodeJS.Timeout | null>(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [laneMode, setLaneMode] = useState<"2" | "4">("4");
  const [speedDisplay, setSpeedDisplay] = useState(BASE_SPEED);
  const [flash, setFlash] = useState<string | null>(null);
  const [status, setStatus] = useState("Tap Start to begin. WASD or Arrow keys to move.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const clearFlash = useCallback(() => {
    if (flashTimer.current) {
      clearTimeout(flashTimer.current);
      flashTimer.current = null;
    }
  }, []);

  const showFlash = useCallback(
    (text: string | null) => {
      clearFlash();
      setFlash(text);
      if (text) {
        flashTimer.current = setTimeout(() => setFlash(null), 1200);
      }
    },
    [clearFlash]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const callbacks: SceneCallbacks = {
      onScore: (value) => setScore(value),
      onLives: (value) => setLives(value),
      onLaneMode: (mode) => setLaneMode(mode),
      onSpeed: (value) => setSpeedDisplay(value),
      onStatus: (text) => setStatus(text),
      onFlash: (text) => showFlash(text),
      onGameOver: () => setIsGameOver(true),
      onPlayingChange: (playing) => {
        setIsPlaying(playing);
        if (playing) setIsGameOver(false);
      },
    };

    const scene = new DriveScene(callbacks);
    sceneRef.current = scene;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      parent: containerRef.current,
      backgroundColor: "#0b1628",
      scene: [scene],
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
    });

    return () => {
      clearFlash();
      sceneRef.current = null;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [clearFlash, showFlash]);

  const startRun = useCallback(() => {
    sceneRef.current?.startRun();
  }, []);

  const boostDown = useCallback(() => sceneRef.current?.setBoost(true), []);
  const boostUp = useCallback(() => sceneRef.current?.setBoost(false), []);
  const brakeDown = useCallback(() => sceneRef.current?.setBrake(true), []);
  const brakeUp = useCallback(() => sceneRef.current?.setBrake(false), []);
  const shiftLeft = useCallback(() => sceneRef.current?.shiftLane("left"), []);
  const shiftRight = useCallback(() => sceneRef.current?.shiftLane("right"), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
      }

      if (event.key === "a" || event.key === "ArrowLeft") shiftLeft();
      if (event.key === "d" || event.key === "ArrowRight") shiftRight();
      if (event.key === "w" || event.key === "ArrowUp") boostDown();
      if (event.key === "s" || event.key === "ArrowDown") brakeDown();
      if (event.key === " " && isGameOver) {
        startRun();
      }
    },
    [boostDown, brakeDown, isGameOver, shiftLeft, shiftRight, startRun]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "w" || event.key === "ArrowUp") boostUp();
      if (event.key === "s" || event.key === "ArrowDown") brakeUp();
    },
    [boostUp, brakeUp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="drive-shell">
      <div className="hud">
        <div className="stat">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Lives</span>
          <span className="stat-value">{lives} / 3</span>
        </div>
        <div className="stat">
          <span className="stat-label">Speed</span>
          <span className="stat-value">{Math.round(speedDisplay)} u/s</span>
        </div>
        <div className="stat">
          <span className="stat-label">Lane mode</span>
          <span className="stat-value">{laneMode === "4" ? "4 lanes" : "2 lanes"}</span>
        </div>
      </div>

      <div className="canvas-wrap">
        <div ref={containerRef} />

        {!isPlaying && !isGameOver && (
          <div className="overlay">
            <h3>Ready to drive?</h3>
            <p className="overlay-text">
              Built with Phaser. WASD or Arrow keys to change lanes and boost. Cars in your lanes move with you - pass
              them. Oncoming traffic lives on the other side; enter at your own risk.
            </p>
            <button className="primary-btn" onClick={startRun}>
              Start run
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="overlay">
            <h3>Game over</h3>
            <p className="overlay-text">Score: {score}</p>
            <button className="primary-btn" onClick={startRun}>
              Restart
            </button>
          </div>
        )}

        {flash && !isGameOver && <div className="flash">{flash}</div>}
      </div>

      <p className="status">{status}</p>

      <div className="controls">
        <div className="controls-text">Desktop: WASD or Arrow keys. Mobile: use the buttons.</div>
        <div className="controls-grid">
          <div className="dpad">
            <button className="dpad-btn up" onPointerDown={boostDown} onPointerUp={boostUp} onPointerLeave={boostUp}>
              UP
            </button>
            <div className="dpad-middle">
              <button className="dpad-btn left" onClick={shiftLeft}>
                &lt;
              </button>
              <div className="dpad-center">Lane</div>
              <button className="dpad-btn right" onClick={shiftRight}>
                &gt;
              </button>
            </div>
            <button className="dpad-btn down" onPointerDown={brakeDown} onPointerUp={brakeUp} onPointerLeave={brakeUp}>
              DN
            </button>
          </div>
          <div className="hint">
            Boost with up, brake with down. Passing cars on your side adds to your score. Lives: 3 before game over. Lanes
            speed up over time.
          </div>
        </div>
      </div>
    </div>
  );
}
