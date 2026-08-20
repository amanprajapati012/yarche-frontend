"use client";

import { useEffect, useState } from "react";

const COLORS = [
  "var(--primary)",
  "var(--primary-dark)",
  "var(--secondary)",
  "var(--footer-2)",
  "var(--success)",
  "var(--warning)",
  "var(--foreground-2)",
];

const SHAPES = ["50%", "3px", "1px 8px"]; // circle, square-ish, streamer

type Piece = {
  id: number;
  left: number;
  size: number;
  color: string;
  radius: string;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 6 + Math.random() * 8,
    color: COLORS[i % COLORS.length],
    radius: SHAPES[i % SHAPES.length],
    delay: Math.random() * 0.5,
    duration: 2.2 + Math.random() * 1.4,
    drift: Math.random() * 220 - 110,
    rotate: 360 + Math.random() * 540,
  }));
}

const STORAGE_KEY = "yarche_launch_celebrated_v1";

export default function LaunchCelebration() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Plays once per browser session — a festive "we're live" burst the
    // first time someone lands on the homepage in a given visit.
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable, still show once for this page load
    }

    setPieces(generatePieces(90));
    setShowBadge(true);

    const hideBadge = setTimeout(() => setShowBadge(false), 2600);
    const clear = setTimeout(() => setPieces(null), 3800);
    return () => {
      clearTimeout(hideBadge);
      clearTimeout(clear);
    };
  }, []);

  if (!pieces) return null;

  return (
    <div className="yc-launch-overlay" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="yc-confetti-piece"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.radius,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--yc-drift": `${p.drift}px`,
              "--yc-rot": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}

      {showBadge && (
        <div className="yc-launch-badge rounded-full bg-background px-7 py-3 shadow-2xl border border-border-light">
          <p className="font-heading text-xl md:text-2xl font-semibold text-foreground">
            Welcome to <span className="text-primary">Yarche</span> ✨
          </p>
        </div>
      )}
    </div>
  );
}
