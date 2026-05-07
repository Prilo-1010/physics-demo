import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Compass,
  // ExternalLink,
  // GitBranch,
  Info,
  MousePointerClick,
  Pause,
  Play,
  // QrCode,
  Sparkles,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";
import "./App.css";

const concepts = [
  {
    id: "touch",
    title: "Touchscreen Physics",
    subtitle: "Capacitance detects your finger.",
    equation: "C = εA / d",
    icon: MousePointerClick,
    theme: "touch",
    explanation:
      "A phone screen has an electric field. Your finger changes the capacitance at one location, and the app receives that touch as input.",
  },
  {
    id: "motion",
    title: "Motion Sensors",
    subtitle: "Acceleration turns movement into data.",
    equation: "F = ma",
    icon: Compass,
    theme: "motion",
    explanation:
      "When you tilt or shake your phone, sensors measure acceleration and orientation. Apps use that data for games, screen rotation, maps, and fitness tools.",
  },
  {
    id: "sound",
    title: "Sound Waves",
    subtitle: "Audio apps depend on wave physics.",
    equation: "v = fλ",
    icon: Volume2,
    theme: "sound",
    explanation:
      "Your voice travels as a wave. A microphone converts those waves into electrical data, and speakers convert data back into sound waves.",
  },
];

function createTouchId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function createRestingWave() {
  return Array.from({ length: 24 }, (_, index) => 18 + Math.sin(index) * 7);
}

function useAudioWave(isPlaying) {
  const [bars, setBars] = useState(createRestingWave);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setBars(
        Array.from({ length: 24 }, (_, index) => {
          const base = Math.sin(Date.now() / 120 + index * 0.8) * 28;
          const pulse = Math.random() * 34;
          return Math.max(12, Math.min(82, 32 + base + pulse));
        })
      );
    }, 110);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return bars;
}

function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <button className={`button button-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="hero-panel">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="hero-glow hero-glow-c" />

      <div className="hero-grid">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <Sparkles className="icon icon-sm" />
            Interactive Demo
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            How Physics Makes Mobile Apps Work
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="button-row"
          >
            <a href="#touch">
              <Button variant="light">Start Demo</Button>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="phone-preview-wrap"
        >
          <div className="phone-preview">
            <div className="phone-screen">
              <div className="phone-speaker" />
              <div className="phone-list">
                {concepts.map((concept, index) => {
                  const Icon = concept.icon;
                  return (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                      className="phone-card"
                    >
                      <div className={`gradient-icon theme-${concept.theme}`}>
                        <Icon className="icon" />
                      </div>
                      <div>
                        <p className="phone-card-title">{concept.title}</p>
                        <p className="phone-card-equation">{concept.equation}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function ConceptCard({ concept, children, index }) {
  const Icon = concept.icon;

  return (
    <motion.section
      id={concept.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="concept-section"
    >
      <article className="concept-card">
        <div className={`concept-info theme-${concept.theme}`}>
          <div className="card-glow card-glow-a" />
          <div className="card-glow card-glow-b" />
          <div className="concept-info-content">
            <div className="concept-icon">
              <Icon className="icon icon-lg" />
            </div>
            <p className="demo-label">Demo {index + 1}</p>
            <h2>{concept.title}</h2>
            <p className="concept-subtitle">{concept.subtitle}</p>

            <div className="equation-box">
              <p>Equation</p>
              <strong>{concept.equation}</strong>
            </div>

            <p className="concept-explanation">{concept.explanation}</p>
          </div>
        </div>
        <div className="concept-demo">{children}</div>
      </article>
    </motion.section>
  );
}

function TouchDemo() {
  const [touches, setTouches] = useState([]);
  const [score, setScore] = useState(0);

  const addTouch = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = createTouchId();
    setTouches((prev) => [...prev, { id, x, y }]);
    setScore((prev) => prev + 1);
    navigator.vibrate?.([25, 30, 25]);
    setTimeout(() => setTouches((prev) => prev.filter((touch) => touch.id !== id)), 900);
  };

  return (
    <div className="demo-stack">
      <div className="demo-header">
        <div>
          <h3>Tap anywhere in the field</h3>
          <p>Each tap simulates a capacitance change detected by the app.</p>
        </div>
        <div className="score-card">
          <p>Touches</p>
          <strong>{score}</strong>
        </div>
      </div>

      <div onPointerDown={addTouch} className="touch-field">
        <div className="touch-field-gradient" />
        <div className="field-label">Electric field layer</div>
        <AnimatePresence>
          {touches.map((touch) => (
            <motion.div
              key={touch.id}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: [0, 1.4, 2.2], opacity: [0.9, 0.55, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="touch-ripple"
              style={{ left: touch.x, top: touch.y }}
            />
          ))}
        </AnimatePresence>
        <div className="proof-card">
          <Zap className="icon icon-cyan" />
          <p>
            Proof: a finger works because it changes the screen's electric field. A regular plastic object usually does
            not trigger it well.
          </p>
        </div>
      </div>
    </div>
  );
}

function MotionDemo() {
  const [permissionState, setPermissionState] = useState("idle");
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });
  const [phonePosition, setPhonePosition] = useState({ x: 0, y: 0 });
  const [sensorMessage, setSensorMessage] = useState(
    "Tap Enable Motion, then tilt your phone. On desktop, move your mouse over the field."
  );
  const hasSensorReadingRef = useRef(false);

  const requestMotion = async () => {
    try {
      hasSensorReadingRef.current = false;
      const permissionRequests = [];

      if (typeof window.DeviceMotionEvent?.requestPermission === "function") {
        permissionRequests.push(window.DeviceMotionEvent.requestPermission());
      }

      if (typeof window.DeviceOrientationEvent?.requestPermission === "function") {
        permissionRequests.push(window.DeviceOrientationEvent.requestPermission());
      }

      if (permissionRequests.length > 0) {
        const results = await Promise.allSettled(permissionRequests);
        const isGranted = results.some((result) => result.status === "fulfilled" && result.value === "granted");
        setPermissionState(isGranted ? "active" : "blocked");
        setSensorMessage(
          isGranted
            ? "Permission granted. Tilt your phone to update the values."
            : "Motion permission was blocked. Check browser/site settings, then try again."
        );
      } else {
        setPermissionState("active");
        setSensorMessage("Listening for phone tilt. If values stay still, your browser may require HTTPS.");
      }
    } catch {
      setPermissionState("blocked");
      setSensorMessage("Motion permission failed. Try opening the app in Safari/Chrome and allow motion access.");
    }
  };

  useEffect(() => {
    if (permissionState !== "active") return;

    const handleMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
      const x = Number(acceleration.x || 0);
      const y = Number(acceleration.y || 0);
      const z = Number(acceleration.z || 0);
      setMotion({ x, y, z });
      setPhonePosition({
        x: Math.max(-90, Math.min(90, x * 10)),
        y: Math.max(-90, Math.min(90, -y * 10)),
      });
      if (!hasSensorReadingRef.current) {
        setSensorMessage("Live acceleration data is updating.");
      }
      hasSensorReadingRef.current = true;
    };

    const handleOrientation = (event) => {
      const beta = Number(event.beta || 0);
      const gamma = Number(event.gamma || 0);
      const alpha = Number(event.alpha || 0);

      setMotion({ x: gamma, y: beta, z: alpha });
      setPhonePosition({
        x: Math.max(-90, Math.min(90, gamma * 2)),
        y: Math.max(-90, Math.min(90, beta * 1.4)),
      });
      if (!hasSensorReadingRef.current) {
        setSensorMessage("Live orientation data is updating.");
      }
      hasSensorReadingRef.current = true;
    };

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);

    const waitingTimer = window.setTimeout(() => {
      if (!hasSensorReadingRef.current) {
        setSensorMessage("No phone sensor data yet. On many phones this needs HTTPS, not a plain local IP address.");
      }
    }, 2500);

    return () => {
      window.clearTimeout(waitingTimer);
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [permissionState]);

  const handlePointerMove = (event) => {
    if (permissionState === "active") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 160;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 160;
    setPhonePosition({ x, y });
    setMotion({ x: x / 10, y: -y / 10, z: 9.8 });
  };

  return (
    <div className="demo-stack">
      <div className="demo-header">
        <div>
          <h3>Tilt your phone</h3>
          <p>{sensorMessage}</p>
        </div>
        <Button onClick={requestMotion}>
          <span className="button-dot" aria-hidden="true" /> Enable Motion
        </Button>
      </div>

      <div onPointerMove={handlePointerMove} className="motion-field">
        <div className="motion-rings">
          <div />
          <div />
          <div />
        </div>

        <div
          className="motion-phone"
          style={{ transform: `translate(${phonePosition.x}px, ${phonePosition.y}px)` }}
        >
          <span className="phone-symbol" aria-hidden="true" />
        </div>

        <div className="sensor-card">
          <p>Sensor values</p>
          <div>
            <span>x {motion.x.toFixed(1)}</span>
            <span>y {motion.y.toFixed(1)}</span>
            <span>z {motion.z.toFixed(1)}</span>
          </div>
        </div>

        <div className="proof-card dark">
          <span className="proof-check" aria-hidden="true" />
          <p>
            Proof: moving the phone changes acceleration values. Apps use those values for rotation, gaming, maps, and
            fitness tracking.
          </p>
        </div>
      </div>

      {permissionState === "blocked" && (
        <div className="warning-card">
          Motion permission was blocked. You can still use the mouse simulation, or open the app on a phone browser and
          allow motion access.
        </div>
      )}
    </div>
  );
}

function SoundDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const bars = useAudioWave(isPlaying);

  const startSound = async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    const oscillator = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 440;
    gain.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 0.05);
    oscillator.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainRef.current = gain;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current && audioCtxRef.current) {
      gainRef.current?.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.05);
      setTimeout(() => {
        try {
          oscillatorRef.current?.stop();
          oscillatorRef.current?.disconnect();
          gainRef.current?.disconnect();
        } catch {
          // The oscillator may already be stopped during cleanup.
        }
        oscillatorRef.current = null;
        gainRef.current = null;
      }, 80);
    }
    setIsPlaying(false);
  };

  useEffect(() => () => stopSound(), []);

  return (
    <div className="demo-stack">
      <div className="demo-header">
        <div>
          <h3>Play a sound wave</h3>
          <p>This creates a 440 Hz tone and visualizes the wave behavior.</p>
        </div>
        <Button onClick={isPlaying ? stopSound : startSound}>
          {isPlaying ? <Pause className="icon icon-sm" /> : <Play className="icon icon-sm" />}
          {isPlaying ? "Stop Sound" : "Play Sound"}
        </Button>
      </div>

      <div className="sound-field">
        <div className="audio-bars">
          {bars.map((height, index) => (
            <motion.div
              key={index}
              animate={{ height }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="audio-bar"
            />
          ))}
        </div>

        <motion.div
          animate={{ scale: isPlaying ? [1, 1.08, 1] : 1 }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 1 }}
          className="sound-orb"
        >
          <Waves className="icon icon-xxl" />
        </motion.div>

        <div className="proof-card">
          <Info className="icon icon-teal" />
          <p>
            Proof: changing frequency changes pitch. Audio apps use microphones and speakers to convert waves into
            electrical signals and back.
          </p>
        </div>
      </div>
    </div>
  );
}

function PresentationMode() {
  const [active, setActive] = useState(false);

  return (
    <div className="presenter">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="presenter-card"
          >
            <p className="presenter-title">Presenter Cheat Sheet</p>
            <ol>
              <li>1. "Apps are code, but physics lets phones sense the world."</li>
              <li>2. Tap demo: capacitance changes.</li>
              <li>3. Motion demo: acceleration is measured.</li>
              <li>4. Sound demo: waves become data.</li>
              <li>5. "Code + physics = modern mobile technology."</li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
      <Button onClick={() => setActive((value) => !value)}>
        <Sparkles className="icon icon-sm" /> Presenter Notes
      </Button>
    </div>
  );
}

// function QRSection() {
//   const currentUrl = typeof window !== "undefined" ? window.location.href : "";

//   return (
//     <section id="qr" className="concept-section">
//       <div className="qr-section">
//         <div className="qr-grid">
//           <div className="qr-visual">
//             <QrCode className="qr-icon" />
//           </div>
//           <div>
//             <p className="demo-label cyan">Classroom mode</p>
//             <h2>Turn this into a QR-code demo</h2>
//             <p className="qr-copy">
//               Deploy this app using Vercel, Netlify, or GitHub Pages. Then paste the live link into a QR code generator
//               and place the QR code on your PowerPoint slide.
//             </p>
//             <div className="link-box">
//               <p>Current app link:</p>
//               <code>{currentUrl || "Your deployed URL will appear here."}</code>
//             </div>
//             <div className="button-row">
//               <Button variant="light">
//                 <ExternalLink className="icon icon-sm" /> Deploy, then generate QR
//               </Button>
//               <Button variant="glass">
//                 <GitBranch className="icon icon-sm" /> Add to GitHub
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function PhysicsAppDemo() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="app-shell">
      <div className="app-container">
        <Header />

        <div className="concept-nav">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <a key={concept.id} href={`#${concept.id}`} className="nav-card">
                <div className={`gradient-icon theme-${concept.theme}`}>
                  <Icon className="icon" />
                </div>
                <h3>{concept.title}</h3>
                <p>{concept.subtitle}</p>
              </a>
            );
          })}
        </div>

        <ConceptCard concept={concepts[0]} index={0}>
          <TouchDemo />
        </ConceptCard>

        <ConceptCard concept={concepts[1]} index={1}>
          <MotionDemo />
        </ConceptCard>

        <ConceptCard concept={concepts[2]} index={2}>
          <SoundDemo />
        </ConceptCard>

        {/* <QRSection /> */}

        <footer className="footer-card">
          <p>Physics Enables Mobile Applications</p>
          <p>Built for a Physics classroom demonstration - {year}</p>
        </footer>
      </div>

      <PresentationMode />
    </main>
  );
}
