'use client';

import { useEffect, useRef, useState } from 'react';
import './styles.css';

interface Entity {
  x: number;
  y: number;
  size: number;
  spawnTime?: number;
  invulnerable?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  facing?: 'up' | 'down' | 'left' | 'right'; // NEW
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const canvasWidth = 400;
const canvasHeight = 400;
const swordLength = 50;
const swordWidth = 6;
const swingDuration = 300;
const enemySize = 20;
const enemySpawnDelay = 5000;
const spawnInvulnerableTime = 1000;
const safeSpawnDistance = 80;

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player, setPlayer] = useState<Entity>({
    x: 200,
    y: 200,
    size: 20,
    facing: 'down', // default direction
  });
  const [enemies, setEnemies] = useState<Entity[]>([]);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const gameStartTime = useRef(performance.now());
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [isSwinging, setIsSwinging] = useState(false);
  const [swordAngle, setSwordAngle] = useState(0);
  const pressedKeys = useRef<Record<string, boolean>>({});
  const swingRef = useRef<number | null>(null);
  const [spawnRateMultiplier, setSpawnRateMultiplier] = useState(1);
  const facingRef = useRef<'up' | 'down' | 'left' | 'right'>('down');
  const [isGameOver, setIsGameOver] = useState(false);

  // Defines positions and size of obstacles
  const [obstacles] = useState<Obstacle[]>([
    { x: 100, y: 100, width: 60, height: 60 },
    { x: 250, y: 200, width: 40, height: 80 },
    { x: 280, y: 320, width: 80, height: 20 },
    { x: 100, y: 300, width: 20, height: 40 },
  ])

  useEffect(() => {
    if (!hasGameStarted || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['w', 'a', 's', 'd'].includes(e.key)) {
        pressedKeys.current[e.key] = true;
      }
      if (e.key === ' ') {
        swingSword();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [hasGameStarted, isGameOver]);

  useEffect(() => {
    if (!hasGameStarted || isGameOver) return;

    const intervalId = setInterval(() => {
      const enemy = spawnEnemyAtCorner();
      setEnemies((prev) => [...prev, enemy]);
    }, Math.max(500, enemySpawnDelay / spawnRateMultiplier));

    return () => clearInterval(intervalId);
  }, [hasGameStarted, spawnRateMultiplier, isGameOver]);

  useEffect(() => {
    if (!hasGameStarted) return;

    let animationFrameId: number;
    const update = () => {
      if (!isGameOver) {
        movePlayer();
        moveEnemies();
        handlePlayerCollision();
        if (isSwinging) handleSwordCollision();
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasGameStarted, player, enemies, isSwinging, swordAngle]);

  const startGame = () => {
    setHasGameStarted(true);
    resetGame();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;

      if (['w', 'a', 's', 'd'].includes(e.key)) {
        pressedKeys.current[e.key] = true;
      }
      if (e.key === ' ') {
        swingSword();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isGameOver) return;
      pressedKeys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return; // Don't spawn while game over

    const intervalId = setInterval(() => {
      const enemy = spawnEnemyAtCorner();
      setEnemies((prev) => [...prev, enemy]);
    }, Math.max(500, enemySpawnDelay / spawnRateMultiplier));

    return () => clearInterval(intervalId);
  }, [spawnRateMultiplier, isGameOver]); // add isGameOver as dependency

  const spawnEnemyAtCorner = (): Entity => {
    const corners = [
      { x: 0, y: 0 },
      { x: canvasWidth - enemySize, y: 0 },
      { x: 0, y: canvasHeight - enemySize },
      { x: canvasWidth - enemySize, y: canvasHeight - enemySize },
    ];
    let corner = corners[Math.floor(Math.random() * corners.length)];
    while (Math.hypot(player.x - corner.x, player.y - corner.y) < safeSpawnDistance) {
      corner = corners[Math.floor(Math.random() * corners.length)];
    }
    const directions = ['up', 'down', 'left', 'right'] as const;
    return {
      ...corner,
      size: enemySize,
      spawnTime: performance.now(),
      invulnerable: true,
      direction: directions[Math.floor(Math.random() * directions.length)],
    };
  };

  const resetGame = () => {
    setEnemies([]);
    setPlayer({ x: 200, y: 200, size: 20, facing: 'down' });
    setScore(0);
    setHealth(3);
    gameStartTime.current = performance.now();
    setIsGameOver(false);
  };

  const facingAngleMap: Record<'up' | 'down' | 'left' | 'right', number> = {
    up: -Math.PI / 2,
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
  };

  const swingSword = () => {
    if (swingRef.current !== null) cancelAnimationFrame(swingRef.current);

    setIsSwinging(true);
      const start = performance.now();
      const baseAngle = facingAngleMap[facingRef.current];

      const swingRange = Math.PI; // 180 degrees

      const animate = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / swingDuration, 1);
        const currentAngle = baseAngle - swingRange / 2 + swingRange * progress;
        setSwordAngle(currentAngle);

        if (progress < 1) {
          swingRef.current = requestAnimationFrame(animate);
        } else {
          setIsSwinging(false);
          setSwordAngle(0);
          swingRef.current = null;
        }
      };

      swingRef.current = requestAnimationFrame(animate);
    };

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      if (!isGameOver) {
        movePlayer();
        moveEnemies();
        handlePlayerCollision();
        if (isSwinging) handleSwordCollision();
      }

      draw(); // Always draw, even in Game Over
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [player, enemies, isSwinging, swordAngle]);

  const movePlayer = () => {
    const speed = 1.1;
    setPlayer((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      let newFacing = prev.facing;

      if (pressedKeys.current['w']) {
        newY -= speed;
        newFacing = 'up';
      } else if (pressedKeys.current['s']) {
        newY += speed;
        newFacing = 'down';
      } else if (pressedKeys.current['a']) {
        newX -= speed;
        newFacing = 'left';
      } else if (pressedKeys.current['d']) {
        newX += speed;
        newFacing = 'right';
      }

      facingRef.current = newFacing ?? 'down'; // always update the ref with a defined value

      if (isCollidingWithObstacle(newX, newY, prev.size)) {
        return prev; // Cancel movement
      }

      return {
        ...prev,
        x: Math.max(0, Math.min(canvasWidth - prev.size, newX)),
        y: Math.max(0, Math.min(canvasHeight - prev.size, newY)),
        facing: newFacing,
      };
    });
  };

  const moveEnemies = () => {
    const elapsedSeconds = (performance.now() - gameStartTime.current) / 1000;
    const currentEnemySpeed = 0.6 + elapsedSeconds * 0.01;
    setEnemies((prev) =>
      prev.map((enemy) => {
        const now = performance.now();
        const shouldChangeDirection = Math.random() < 0.02; // 2% chance per frame to change direction
        const directions = ['up', 'down', 'left', 'right'] as const;

        let direction = enemy.direction;

        if (!direction || shouldChangeDirection) {
          direction = directions[Math.floor(Math.random() * directions.length)];
        }

        let newX = enemy.x;
        let newY = enemy.y;

        switch (direction) {
          case 'up':
            newY -= currentEnemySpeed;
            break;
          case 'down':
            newY += currentEnemySpeed;
            break;
          case 'left':
            newX -= currentEnemySpeed;
            break;
          case 'right':
            newX += currentEnemySpeed;
            break;
        }

        if (isCollidingWithObstacle(newX, newY, enemy.size)) {
          return { ...enemy, direction }; // Skip movement if blocked
        }

        return {
          ...enemy,
          x: Math.max(0, Math.min(canvasWidth - enemy.size, newX)),
          y: Math.max(0, Math.min(canvasHeight - enemy.size, newY)),
          direction,
        };
      })
    );
  };

  const handlePlayerCollision = () => {
    setEnemies((prev) => {
      const survivors: Entity[] = [];
      for (const enemy of prev) {
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        const minDist = (player.size + enemy.size) / 2;
        const invuln = enemy.invulnerable && performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;
        if (invuln) {
          survivors.push(enemy);
          continue;
        }
        if (distance < minDist) {
          setHealth((hp) => {
          const newHp = hp - 1;
          if (newHp <= 0) {
            setIsGameOver(true);
            pressedKeys.current = {}; // Clear active keys to prevent ghost movement
          }
          return newHp;
          });
          continue;
        }
        survivors.push(enemy);
      }
      return survivors;
    });
  };

  const handleSwordCollision = () => {
    const { startX, startY, endX, endY } = getSwordLine(player, swordAngle);

    setEnemies((prev) => {
      const remaining: Entity[] = [];

      for (let enemy of prev) {
        const isInvuln = enemy.invulnerable &&
          performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;

        if (isInvuln) {
          remaining.push(enemy);
          continue;
        }

        const hit = lineIntersectsRect(
          startX, startY,
          endX, endY,
          enemy.x, enemy.y,
          enemy.size, enemy.size
        );

        if (hit) {
          setScore((prevScore) => prevScore + 1);
          setSpawnRateMultiplier((m) => m + 0.05);

          // 10% chance to heal
          if (Math.random() < 0.1) {
            setHealth((hp) => hp + 1);
          }

          continue; // enemy dies, don't include in remaining
        }

        remaining.push(enemy); // not hit
      }

      return remaining;
    });
  };

  const isCollidingWithObstacle = (x: number, y: number, size: number) => {
    const rect1 = { x, y, width: size, height: size };

    return obstacles.some((obs) =>
      rectIntersect(rect1, {
        x: obs.x,
        y: obs.y,
        width: obs.width,
        height: obs.height,
      })
    );
  };

  const rectIntersect = (
    r1: { x: number; y: number; width: number; height: number },
    r2: { x: number; y: number; width: number; height: number }
  ) => {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  };

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw obstacles
    ctx.fillStyle = '#444';
    for (const obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Draw direction arrow
    drawFacingArrow(ctx, player);
    if (isSwinging) drawRotatedSword(ctx, player, swordAngle, swordLength, swordWidth);
    for (const enemy of enemies) {
      const isInvuln = enemy.invulnerable && performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;
      ctx.fillStyle = isInvuln ? 'rgba(255,0,0,0.4)' : 'red';
      ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
  };

  const drawFacingArrow = (
    ctx: CanvasRenderingContext2D,
    player: Entity
  ) => {
    const cx = player.x + player.size / 2;
    const cy = player.y + player.size / 2;
    const arrowSize = 6;

    ctx.fillStyle = 'black';
    ctx.beginPath();

    switch (player.facing) {
      case 'up':
        ctx.moveTo(cx, cy - player.size / 2 - arrowSize);
        ctx.lineTo(cx - arrowSize, cy - player.size / 2);
        ctx.lineTo(cx + arrowSize, cy - player.size / 2);
        break;
      case 'down':
        ctx.moveTo(cx, cy + player.size / 2 + arrowSize);
        ctx.lineTo(cx - arrowSize, cy + player.size / 2);
        ctx.lineTo(cx + arrowSize, cy + player.size / 2);
        break;
      case 'left':
        ctx.moveTo(cx - player.size / 2 - arrowSize, cy);
        ctx.lineTo(cx - player.size / 2, cy - arrowSize);
        ctx.lineTo(cx - player.size / 2, cy + arrowSize);
        break;
      case 'right':
        ctx.moveTo(cx + player.size / 2 + arrowSize, cy);
        ctx.lineTo(cx + player.size / 2, cy - arrowSize);
        ctx.lineTo(cx + player.size / 2, cy + arrowSize);
        break;
    }

    ctx.closePath();
    ctx.fill();
  };

  const getSwordLine = (player: Entity, angle: number) => {
    const px = player.x + player.size / 2;
    const py = player.y + player.size / 2;

    const startX = px + Math.cos(angle) * (player.size / 2);
    const startY = py + Math.sin(angle) * (player.size / 2);
    const endX = px + Math.cos(angle) * (player.size / 2 + swordLength);
    const endY = py + Math.sin(angle) * (player.size / 2 + swordLength);

    return { startX, startY, endX, endY };
  };

  const lineIntersectsRect = (
  x1: number, y1: number,
  x2: number, y2: number,
  rx: number, ry: number, rw: number, rh: number
) => {
  // Four edges of the rectangle
  const left = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  const right = lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  const top = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  const bottom = lineIntersectsLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  return left || right || top || bottom;
};

  const lineIntersectsLine = (
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number
  ) => {
    const denominator =
      (y4 - y3) * (x2 - x1) -
      (x4 - x3) * (y2 - y1);

    if (denominator === 0) return false;

    const ua =
      ((x4 - x3) * (y1 - y3) -
        (y4 - y3) * (x1 - x3)) /
      denominator;
    const ub =
      ((x2 - x1) * (y1 - y3) -
        (y2 - y1) * (x1 - x3)) /
      denominator;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  };

  const drawRotatedSword = (
    ctx: CanvasRenderingContext2D,
    player: Entity,
    angle: number,
    swordLength: number,
    swordWidth: number
  ) => {
    const px = player.x + player.size / 2;
    const py = player.y + player.size / 2;
    const offset = player.size / 2;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = 'gray';
    ctx.fillRect(offset, -swordWidth / 2, swordLength, swordWidth);
    ctx.restore();
  };

  return (
    <div className="container">
      {!hasGameStarted && (
        <div className="start-screen">
          <h1>Untitled Battle Squares</h1>
          <p>WASD to move, SPACE to attack</p>
          <button
            onClick={startGame}
            className="px-8 py-3 mt-8 text-white font-bold text-lg tracking-wide rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 ease-in-out"
          >
            Start Game
          </button>
        </div>
      )}
      {hasGameStarted && (
        <>
          <p>
            Score: {score} | Health: {health}
          </p>
          <p>Move: WASD | Sword: SPACE</p>
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          {isGameOver && (
            <div className="game-over-dialog">
              <div className="game-over-content">
                <h2>Game Over</h2>
                <p>Score: {score}</p>
                <button 
                  onClick={resetGame}
                  className="px-8 py-3 mt-8 text-white font-bold text-lg tracking-wide rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 ease-in-out"
                >Retry
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
