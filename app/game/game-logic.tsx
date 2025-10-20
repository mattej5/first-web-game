'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

interface Heart {
  x: number;
  y: number;
  size: number;
  spawnTime: number;
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
const heartSpawnChance = 0.0008; // ~0.08% chance per frame to spawn a heart
const heartSize = 15;

const facingAngleMap: Record<'up' | 'down' | 'left' | 'right', number> = {
  up: -Math.PI / 2,
  right: 0,
  down: Math.PI / 2,
  left: Math.PI,
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

const drawHeart = (ctx: CanvasRenderingContext2D, heart: Heart) => {
  const centerX = heart.x + heart.size / 2;
  const centerY = heart.y + heart.size / 2;
  const radius = heart.size / 3;

  ctx.fillStyle = '#ff69b4';
  ctx.beginPath();
  ctx.arc(centerX - radius / 2, centerY - radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX + radius / 2, centerY - radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(centerX - radius, centerY);
  ctx.lineTo(centerX + radius, centerY);
  ctx.lineTo(centerX, centerY + radius);
  ctx.closePath();
  ctx.fill();
};

const drawFacingArrow = (ctx: CanvasRenderingContext2D, player: Entity) => {
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

const drawRotatedSword = (
  ctx: CanvasRenderingContext2D,
  player: Entity,
  angle: number,
  length: number,
  width: number
) => {
  const px = player.x + player.size / 2;
  const py = player.y + player.size / 2;
  const offset = player.size / 2;

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(angle);
  ctx.fillStyle = 'gray';
  ctx.fillRect(offset, -width / 2, length, width);
  ctx.restore();
};

const lineIntersectsLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) => {
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) return false;

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
};

const lineIntersectsRect = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
) => {
  const left = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  const right = lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  const top = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  const bottom = lineIntersectsLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  return left || right || top || bottom;
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

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [player, setPlayer] = useState<Entity>({
    x: 200,
    y: 200,
    size: 20,
    facing: 'down', // default direction
  });
  const [enemies, setEnemies] = useState<Entity[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
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
  const [isMobile, setIsMobile] = useState(false);
  const lastAttackTime = useRef<number>(0);
  const attackDebounceMs = 50; // 50ms debounce (1/20th of a second)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice && isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Defines positions and size of obstacles
  const [obstacles] = useState<Obstacle[]>([
    { x: 100, y: 100, width: 60, height: 60 },
    { x: 250, y: 200, width: 40, height: 80 },
    { x: 280, y: 320, width: 80, height: 20 },
    { x: 100, y: 300, width: 20, height: 40 },
  ]);

  const heartsCount = hearts.length;

  const isCollidingWithObstacle = useCallback(
    (x: number, y: number, size: number) => {
      const rect1 = { x, y, width: size, height: size };

      return obstacles.some((obs) =>
        rectIntersect(rect1, {
          x: obs.x,
          y: obs.y,
          width: obs.width,
          height: obs.height,
        })
      );
    },
    [obstacles]
  );

  const spawnEnemyAtCorner = useCallback((): Entity => {
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
  }, [player]);

  const resetGame = useCallback(() => {
    setEnemies([]);
    setHearts([]);
    setPlayer({ x: 200, y: 200, size: 20, facing: 'down' });
    setScore(0);
    setHealth(3);
    gameStartTime.current = performance.now();
    setIsGameOver(false);
    facingRef.current = 'down';
  }, []);

  const startGame = useCallback(() => {
    setHasGameStarted(true);
    resetGame();
  }, [resetGame]);

  const spawnHeart = useCallback((): Heart => {
    let x: number;
    let y: number;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      x = Math.random() * (canvasWidth - heartSize);
      y = Math.random() * (canvasHeight - heartSize);
      attempts++;
    } while (
      attempts < maxAttempts &&
      (Math.hypot(player.x - x, player.y - y) < 60 || isCollidingWithObstacle(x, y, heartSize))
    );

    return {
      x,
      y,
      size: heartSize,
      spawnTime: performance.now(),
    };
  }, [player, isCollidingWithObstacle]);

  const swingSword = useCallback(() => {
    if (swingRef.current !== null) {
      cancelAnimationFrame(swingRef.current);
    }

    setIsSwinging(true);
    const start = performance.now();
    const baseAngle = facingAngleMap[facingRef.current];
    const swingRange = Math.PI;

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
  }, []);

  const movePlayer = useCallback(() => {
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

      facingRef.current = newFacing ?? 'down';

      if (isCollidingWithObstacle(newX, newY, prev.size)) {
        return prev;
      }

      return {
        ...prev,
        x: Math.max(0, Math.min(canvasWidth - prev.size, newX)),
        y: Math.max(0, Math.min(canvasHeight - prev.size, newY)),
        facing: newFacing,
      };
    });
  }, [isCollidingWithObstacle]);

  const moveEnemies = useCallback(() => {
    const elapsedSeconds = (performance.now() - gameStartTime.current) / 1000;
    const currentEnemySpeed = 0.6 + elapsedSeconds * 0.01;
    setEnemies((prev) =>
      prev.map((enemy) => {
        const shouldChangeDirection = Math.random() < 0.02;
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
          return { ...enemy, direction };
        }

        return {
          ...enemy,
          x: Math.max(0, Math.min(canvasWidth - enemy.size, newX)),
          y: Math.max(0, Math.min(canvasHeight - enemy.size, newY)),
          direction,
        };
      })
    );
  }, [isCollidingWithObstacle]);

  const handlePlayerCollision = useCallback(() => {
    setEnemies((prev) => {
      const survivors: Entity[] = [];
      for (const enemy of prev) {
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        const minDist = (player.size + enemy.size) / 2;
        const invuln =
          enemy.invulnerable && performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;
        if (invuln) {
          survivors.push(enemy);
          continue;
        }
        if (distance < minDist) {
          setHealth((hp) => {
            const newHp = hp - 1;
            if (newHp <= 0) {
              setIsGameOver(true);
              pressedKeys.current = {};
            }
            return newHp;
          });
          continue;
        }
        survivors.push(enemy);
      }
      return survivors;
    });
  }, [player]);

  const handleSwordCollision = useCallback(() => {
    const { startX, startY, endX, endY } = getSwordLine(player, swordAngle);

    setEnemies((prev) => {
      const remaining: Entity[] = [];

      for (const enemy of prev) {
        const isInvuln =
          enemy.invulnerable && performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;

        if (isInvuln) {
          remaining.push(enemy);
          continue;
        }

        const hit = lineIntersectsRect(startX, startY, endX, endY, enemy.x, enemy.y, enemy.size, enemy.size);

        if (hit) {
          setScore((prevScore) => prevScore + 1);
          setSpawnRateMultiplier((m) => m + 0.05);

          if (Math.random() < 0.1) {
            setHealth((hp) => hp + 1);
          }

          continue;
        }

        remaining.push(enemy);
      }

      return remaining;
    });
  }, [player, swordAngle]);

  const handleHeartCollision = useCallback(() => {
    setHearts((prev) => {
      const remaining: Heart[] = [];

      for (const heart of prev) {
        const distance = Math.hypot(player.x - heart.x, player.y - heart.y);
        const minDist = (player.size + heart.size) / 2;

        if (distance < minDist) {
          setHealth((hp) => hp + 1);
          continue;
        }

        remaining.push(heart);
      }

      return remaining;
    });
  }, [player]);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    ctx.fillStyle = '#444';
    for (const obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    drawFacingArrow(ctx, player);
    if (isSwinging) {
      drawRotatedSword(ctx, player, swordAngle, swordLength, swordWidth);
    }

    for (const heart of hearts) {
      drawHeart(ctx, heart);
    }

    for (const enemy of enemies) {
      const isInvuln =
        enemy.invulnerable && performance.now() - (enemy.spawnTime || 0) < spawnInvulnerableTime;
      ctx.fillStyle = isInvuln ? 'rgba(255,0,0,0.4)' : 'red';
      ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
  }, [enemies, hearts, isSwinging, obstacles, player, swordAngle]);

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
  }, [hasGameStarted, isGameOver, swingSword]);

  useEffect(() => {
    if (!hasGameStarted || isGameOver) return;

    const intervalId = setInterval(() => {
      const enemy = spawnEnemyAtCorner();
      setEnemies((prev) => [...prev, enemy]);
    }, Math.max(500, enemySpawnDelay / spawnRateMultiplier));

    return () => clearInterval(intervalId);
  }, [hasGameStarted, isGameOver, spawnRateMultiplier, spawnEnemyAtCorner]);

  useEffect(() => {
    if (!hasGameStarted) return;

    let animationFrameId: number;
    const update = () => {
      if (!isGameOver) {
        movePlayer();
        moveEnemies();
        handlePlayerCollision();
        handleHeartCollision();

        if (Math.random() < heartSpawnChance && heartsCount < 3) {
          const newHeart = spawnHeart();
          setHearts((prev) => [...prev, newHeart]);
        }

        if (isSwinging) {
          handleSwordCollision();
        }
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    draw,
    handleHeartCollision,
    handlePlayerCollision,
    handleSwordCollision,
    hasGameStarted,
    heartsCount,
    isGameOver,
    isSwinging,
    moveEnemies,
    movePlayer,
    spawnHeart,
  ]);

  // Mobile control functions
  const handleMobileMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    pressedKeys.current = {}; // Clear all keys first
    pressedKeys.current[direction === 'up' ? 'w' : direction === 'down' ? 's' : direction === 'left' ? 'a' : 'd'] = true;
  };

  const handleMobileStop = () => {
    pressedKeys.current = {};
  };

  const handleMobileAttack = () => {
    const now = performance.now();
    if (now - lastAttackTime.current < attackDebounceMs) {
      return; // Ignore if too soon after last attack
    }
    lastAttackTime.current = now;
    swingSword();
  };

  return (
    <div className="container">
      {!hasGameStarted && (
        <div className="start-screen">
          <h2 className="text-2xl font-bold">Untitled Battle Squares</h2>
          {isMobile ? (
            <p>Use the D-pad to move, sword button to attack</p>
          ) : (
            <p>WASD to move, SPACE to attack</p>
          )}
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
          {!isMobile && <p>Move: WASD | Sword: SPACE</p>}
          <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          
          {/* Mobile Controls */}
          {isMobile && (
            <div className="mobile-controls">
              {/* D-Pad */}
              <div className="dpad-container">
                <div className="dpad">
                  <button 
                    className="dpad-btn dpad-up"
                    onTouchStart={() => handleMobileMove('up')}
                    onTouchEnd={handleMobileStop}
                    onMouseDown={() => handleMobileMove('up')}
                    onMouseUp={handleMobileStop}
                    onMouseLeave={handleMobileStop}
                  >
                    ↑
                  </button>
                  <div className="dpad-middle">
                    <button 
                      className="dpad-btn dpad-left"
                      onTouchStart={() => handleMobileMove('left')}
                      onTouchEnd={handleMobileStop}
                      onMouseDown={() => handleMobileMove('left')}
                      onMouseUp={handleMobileStop}
                      onMouseLeave={handleMobileStop}
                    >
                      ←
                    </button>
                    <div className="dpad-center"></div>
                    <button 
                      className="dpad-btn dpad-right"
                      onTouchStart={() => handleMobileMove('right')}
                      onTouchEnd={handleMobileStop}
                      onMouseDown={() => handleMobileMove('right')}
                      onMouseUp={handleMobileStop}
                      onMouseLeave={handleMobileStop}
                    >
                      →
                    </button>
                  </div>
                  <button 
                    className="dpad-btn dpad-down"
                    onTouchStart={() => handleMobileMove('down')}
                    onTouchEnd={handleMobileStop}
                    onMouseDown={() => handleMobileMove('down')}
                    onMouseUp={handleMobileStop}
                    onMouseLeave={handleMobileStop}
                  >
                    ↓
                  </button>
                </div>
              </div>
              
              {/* Attack Button */}
              <div className="attack-container">
                <button 
                  className="attack-btn"
                  onTouchStart={handleMobileAttack}
                  onClick={handleMobileAttack}
                >
                  ⚔️
                </button>
              </div>
            </div>
          )}
          
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
