import { useMemo } from 'react';
import { PALETTE } from '@/config/theme.config';

interface VectorQrCodeProps {
  seed?: string;
  size?: number;
}

export function VectorQrCode({
  seed = 'RDB-2026-101',
  size = 128,
}: VectorQrCodeProps) {
  const cells = useMemo(() => {
    const grid = 21;
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    const isFinder = (r: number, c: number) => {
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= grid - 7;
      const inBottomLeft = r >= grid - 7 && c < 7;
      return inTopLeft || inTopRight || inBottomLeft;
    };

    const finderPixel = (r: number, c: number) => {
      const lr = r >= grid - 7 ? r - (grid - 7) : r;
      const lc = c >= grid - 7 ? c - (grid - 7) : c;
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
      if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
      return false;
    };

    const matrix: Array<{ r: number; c: number }> = [];
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (isFinder(r, c)) {
          if (finderPixel(r, c)) matrix.push({ r, c });
        } else {
          hash ^= r * 31 + c * 17 + 7;
          hash = Math.imul(hash, 16777619);
          if ((hash >>> 0) % 100 < 46) {
            matrix.push({ r, c });
          }
        }
      }
    }
    return matrix;
  }, [seed]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Scannable PR Hall QR pass code ${seed}`}
      className="rounded-lg"
    >
      <rect width="21" height="21" fill="#FFFDF7" />
      {cells.map((cell, idx) => (
        <rect
          key={idx}
          x={cell.c}
          y={cell.r}
          width="1"
          height="1"
          fill={PALETTE.darkCoffee}
        />
      ))}
    </svg>
  );
}
