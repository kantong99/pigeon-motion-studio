
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const W = 1920;
const H = 1080;

const Sky = ({ frame, top = "#56b8ed", bottom = "#dff5ff" }) => (
  <>
    <defs>
      <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={top} />
        <stop offset="100%" stopColor={bottom} />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#skyGradient)" />
    <Cloud x={(180 + frame * 0.45) % 2300 - 180} y={180} s={1.2} />
    <Cloud x={(850 + frame * 0.25) % 2300 - 180} y={105} s={0.75} />
    <Cloud x={(1550 + frame * 0.35) % 2300 - 180} y={250} s={1.35} />
  </>
);

const Cloud = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity="0.82">
    <ellipse cx="0" cy="20" rx="115" ry="30" />
    <circle cx="-55" cy="0" r="42" />
    <circle cx="0" cy="-18" r="58" />
    <circle cx="58" cy="0" r="43" />
  </g>
);

// MERPATI: badan, kepala, paruh, mata, ekor, kaki dan sayap bergerak.
const Bird = ({
  x,
  y,
  s = 1,
  frame = 0,
  flip = false,
  color = "#87939d",
  perched = false,
  wingSpeed = 1,
}) => {
  const flap = perched
    ? Math.sin(frame * 0.12) * 5
    : Math.sin(frame * 0.42 * wingSpeed) * 48;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
    >
      {/* Ekor */}
      <path
        d="M-43 5 Q-82 -15 -112 -28 Q-96 8 -67 27 L-38 24Z"
        fill="#56636e"
      />
      <path
        d="M-65 9 L-108 -25 M-58 15 L-91 24"
        stroke="#aeb8bf"
        strokeWidth="3"
        fill="none"
      />

      {/* Badan */}
      <ellipse cx="-4" cy="0" rx="58" ry="30" fill={color} />
      <path
        d="M-35 5 Q-8 23 31 8"
        stroke="#d4dce0"
        strokeWidth="5"
        opacity="0.65"
        fill="none"
      />

      {/* Sayap yang mengepak */}
      <g transform={`rotate(${flap} -8 -12)`}>
        <path
          d="M-25 -12 Q-68 -50 -48 -105 Q-12 -91 18 -57 Q42 -32 29 -5 Q0 4 -25 -12Z"
          fill="#667681"
          stroke="#46545f"
          strokeWidth="3"
        />
        <path
          d="M-36 -22 Q-32 -60 -43 -91 M-18 -18 Q-12 -52 -18 -82 M0 -13 Q8 -40 5 -66 M16 -10 Q27 -31 24 -48"
          stroke="#b7c2c9"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Leher dan kepala */}
      <path
        d="M25 -14 Q35 -42 51 -45 L70 -20 L45 8Z"
        fill={color}
      />
      <circle cx="57" cy="-43" r="23" fill={color} />

      {/* Kilau leher */}
      <path
        d="M35 -25 Q49 -35 60 -22"
        stroke="#4b8b82"
        strokeWidth="7"
        fill="none"
        opacity="0.8"
      />

      {/* Paruh */}
      <path d="M77 -45 L112 -37 L79 -31Z" fill="#d98d39" />
      <path d="M77 -45 L91 -41 L80 -39Z" fill="#f3c06b" />

      {/* Mata */}
      <circle cx="65" cy="-49" r="5.5" fill="#ffffff" />
      <circle cx="67" cy="-49" r="3" fill="#15191d" />

      {/* Kaki */}
      {perched && (
        <g stroke="#bd7547" strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M-3 25 L-3 48 M25 23 L25 47" />
          <path d="M-3 48 L-17 54 M-3 48 L10 54" />
          <path d="M25 47 L12 54 M25 47 L38 53" />
        </g>
      )}
    </g>
  );
};


const Flock = ({ frame, count = 24, y = 460, dark = false }) => (
  <g>
    {Array.from({ length: count }, (_, i) => {
      // Posisi burung bergerak seragam dari kiri ke kanan
      const speed = 4.2;
      const spacing = 175;
      const x = ((i * spacing + frame * speed) % 2300) - 180;

      // Formasi kawanan bergelombang, tetapi tetap kompak
      const row = i % 5;
      const column = Math.floor(i / 5);
      const yy =
        y +
        row * 32 +
        Math.sin(frame * 0.045 + column * 0.25) * 24;

      // Ukuran bervariasi berdasarkan jarak
      const size = 0.48 + (i % 4) * 0.12;

      return (
        <Bird
          key={i}
          x={x}
          y={yy}
          s={size}
          frame={frame}
          flip={false}
          color={
            dark
              ? "#34313b"
              : ["#687985", "#aab5bc", "#596875", "#d4dadd"][i % 4]
          }
        />
      );
    })}
  </g>
);

const Scene = ({ variant, f }) => {
  // 001 - Kawanan merpati di langit
  if (variant === 1) {
    return (
      <>
        <Sky frame={f} />
        <Flock frame={f} count={30} y={470} />
      </>
    );
  }

  // 002 - Sepasang merpati di kabel listrik
  if (variant === 2) {
    const nod = Math.sin(f * 0.12) * 5;
    return (
      <>
        <Sky frame={f} top="#f3b79c" bottom="#fff0d9" />
        <path d="M0 680 Q960 650 1920 680" stroke="#272b31" strokeWidth="13" fill="none" />
        <Bird x={830} y={635 + nod} s={1.65} frame={f} color="#f1f1ed" perched />
        <Bird x={1080} y={635 - nod} s={1.65} frame={f} flip color="#7b8790" perched />
        <path d="M930 570 Q960 535 990 570" stroke="#e9a15e" strokeWidth="5" fill="none" opacity={0.8 + Math.sin(f * 0.1) * 0.2} />
      </>
    );
  }

  // 003 - Merpati terbang dari atap kota
  if (variant === 3) {
    return (
      <>
        <Sky frame={f} top="#91b6cc" bottom="#f1e6d9" />
        <path d="M0 730 L250 600 L470 700 L720 560 L1000 710 L1280 570 L1580 700 L1780 590 L1920 660 V1080 H0Z" fill="#67727d" />
        <g fill="#4b5661">
          <rect x="180" y="530" width="150" height="210" />
          <rect x="470" y="570" width="170" height="160" />
          <rect x="1120" y="520" width="190" height="210" />
          <rect x="1510" y="540" width="160" height="180" />
        </g>
        <Flock frame={f} count={18} y={420} />
        <Flock frame={Math.max(0, f - 35)} count={8} y={590} />
      </>
    );
  }

  // 004 - Merpati membawa dan menjatuhkan pesan
  if (variant === 4) {
    const x = 150 + f * 2.1;
    const drop = Math.max(0, Math.min(520, (f - 150) * 5));
    const paperX = 600 + (f - 150) * 2.1;
    const paperY = 450 + drop;

    return (
      <>
        <Sky frame={f} />
        <Bird x={x} y={390 + Math.sin(f * 0.12) * 18} s={1.85} frame={f} color="#778791" />
        <g transform={`translate(${paperX} ${paperY}) rotate(${Math.min(25, drop * 0.04)})`}>
          <path d="M-8 -8 L130 -8 L130 82 L-8 82Z" fill="#fff9e9" stroke="#ad9871" strokeWidth="4" />
          <path d="M5 10 L115 10 M5 25 L100 25" stroke="#d2c7b1" strokeWidth="3" />
          <text x="61" y="58" fontSize="18" textAnchor="middle" fill="#594b3b" fontWeight="bold">MESSAGE</text>
        </g>
      </>
    );
  }

  // 005 - Sepasang merpati putih di taman
  if (variant === 5) {
    return (
      <>
        <Sky frame={f} top="#e9c9d8" bottom="#fff2e7" />
        <path d="M0 820 Q500 730 960 820 T1920 800 V1080 H0Z" fill="#8ca879" />
        <path d="M0 910 Q500 850 1000 920 T1920 900 V1080 H0Z" fill="#d4bd9d" />
        <g fill="#f5c4d4">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={120 + i * 150} cy={780 + Math.sin(i) * 30} r="13" />
          ))}
        </g>
        <Bird x={820} y={630 + Math.sin(f * 0.1) * 5} s={1.9} frame={f} color="#ffffff" perched />
        <Bird x={1080} y={630 - Math.sin(f * 0.1) * 5} s={1.9} frame={f} flip color="#f5f5f2" perched />
      </>
    );
  }

  // 006 - Merpati berputar mengelilingi air mancur
  if (variant === 6) {
    return (
      <>
        <Sky frame={f} top="#8ed2ed" bottom="#e9f9ff" />
        <ellipse cx="960" cy="830" rx="430" ry="100" fill="#9aaab0" />
        <ellipse cx="960" cy="805" rx="350" ry="65" fill="#36a9c4" />
        <ellipse cx="960" cy="785" rx="220" ry="35" fill="#a6e8ed" />
        <path d="M960 770 Q900 570 960 450 Q1020 570 960 770" fill="#70c9e8" opacity="0.75" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = f * 0.045 + i * Math.PI * 2 / 9;
          return (
            <Bird
              key={i}
              x={960 + Math.cos(a) * 430}
              y={620 + Math.sin(a) * 165}
              s={0.65}
              frame={f + i * 5}
              flip={Math.cos(a) < 0}
            />
          );
        })}
      </>
    );
  }

  // 007 - Merpati datang ke jendela
  if (variant === 7) {
    const landing = Math.min(1, f / 130);
    const x = 1450 - landing * 480;
    const y = 300 + landing * 390;

    return (
      <>
        <Sky frame={f} top="#b5d9ec" bottom="#f8eadb" />
        <rect x="230" y="120" width="1460" height="730" fill="#8cc5e0" stroke="#765b48" strokeWidth="38" />
        <path d="M960 120 V850 M230 490 H1690" stroke="#765b48" strokeWidth="24" />
        <path d="M230 850 H1690" stroke="#5c493d" strokeWidth="45" />
        <Bird x={x} y={y + Math.sin(f * 0.25) * (1 - landing) * 15} s={1.6} frame={f} perched={f > 130} />
      </>
    );
  }

  // 008 - Kawanan merpati saat matahari terbenam
  if (variant === 8) {
    return (
      <>
        <Sky frame={f} top="#e87850" bottom="#4a3658" />
        <circle cx="1450" cy="650" r="205" fill="#ffd28d" />
        <path d="M0 870 Q500 790 1000 870 T1920 850 V1080 H0Z" fill="#39334a" />
        <Flock frame={f} count={28} y={420} dark />
      </>
    );
  }

  // 009 - Merpati terbang di atas laut
  if (variant === 9) {
    return (
      <>
        <Sky frame={f} top="#48b8e8" bottom="#d4f5ff" />
        <path d="M0 650 Q400 600 800 660 T1600 640 T2200 650 V1080 H0Z" fill="#148db8" />
        <path d="M0 780 Q400 730 800 790 T1600 770 T2200 780" stroke="#a9e7ec" strokeWidth="10" fill="none" />
        <path d="M0 930 Q500 880 1000 940 T1920 920 V1080 H0Z" fill="#e8d0a0" />
        <Flock frame={f} count={12} y={390} />
      </>
    );
  }

  // 010 - Close-up merpati dengan sayap mengepak
  return (
    <>
      <Sky frame={f} top="#315575" bottom="#b5d4df" />
      <circle cx="1500" cy="240" r="120" fill="#f7dfaa" opacity="0.75" />
      <Bird
        x={960 + Math.sin(f * 0.035) * 100}
        y={590 + Math.sin(f * 0.12) * 20}
        s={4.2}
        frame={f}
        color="#e1e7e9"
      />
    </>
  );
};

export const PigeonVideo = ({ variant = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <Scene variant={variant} f={frame} />
      </svg>
    </AbsoluteFill>
  );
};
