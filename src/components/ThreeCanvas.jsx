import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Sparkles } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

/**
 * Camera waypoints for the cinematic GSAP tour.
 * Each key matches a tourStep id from src/data/content.js and a page
 * section id (#hero, #about, #projects, #skills, #contact).
 */
const CAMERA_WAYPOINTS = {
  hero: { position: [0, 1.6, 6.5], target: [0, 1.1, 0] },
  about: { position: [3.2, 2.4, 3.4], target: [0.4, 1.2, -0.4] },
  projects: { position: [-3.4, 2.2, 3.2], target: [-0.4, 1, -0.6] },
  skills: { position: [0, 3.6, 2.4], target: [0, 0.6, -1] },
  contact: { position: [0, 1.4, 4.6], target: [0, 1, -1.4] },
};

/* ---------------------------------------------------------------------- */
/*  Camera rig: exposes an imperative flyTo(stepId) driven by GSAP        */
/* ---------------------------------------------------------------------- */
const CameraRig = forwardRef(function CameraRig(_, ref) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const lookTarget = useRef(new THREE.Vector3(0, 1.1, 0));

  useImperativeHandle(ref, () => ({
    flyTo(stepId, { onComplete } = {}) {
      const waypoint = CAMERA_WAYPOINTS[stepId] || CAMERA_WAYPOINTS.hero;
      if (controlsRef.current) controlsRef.current.enabled = false;

      gsap.to(camera.position, {
        x: waypoint.position[0],
        y: waypoint.position[1],
        z: waypoint.position[2],
        duration: 2.1,
        ease: "power3.inOut",
      });

      gsap.to(lookTarget.current, {
        x: waypoint.target[0],
        y: waypoint.target[1],
        z: waypoint.target[2],
        duration: 2.1,
        ease: "power3.inOut",
        onUpdate: () => {
          camera.lookAt(lookTarget.current);
          if (controlsRef.current) {
            controlsRef.current.target.copy(lookTarget.current);
          }
        },
        onComplete: () => {
          if (controlsRef.current) controlsRef.current.enabled = true;
          onComplete && onComplete();
        },
      });
    },
    enableControls(enabled) {
      if (controlsRef.current) controlsRef.current.enabled = enabled;
    },
  }));

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      minDistance={3}
      maxDistance={10}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.05}
      target={[0, 1.1, 0]}
    />
  );
});

/* ---------------------------------------------------------------------- */
/*  Holographic AI/ML graph overlay floating above the monitor            */
/* ---------------------------------------------------------------------- */
function HoloGraph({ color = "#38bdf8" }) {
  const group = useRef();
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 14; i++) {
      pts.push(
        new THREE.Vector3(
          (i / 13) * 1.6 - 0.8,
          Math.sin(i * 0.8) * 0.3 + Math.random() * 0.1,
          0
        )
      );
    }
    return pts;
  }, []);
  const lineGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    group.current.position.y = 1.75 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
  });

  return (
    <group ref={group} position={[0, 1.75, -0.55]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.9} />
      </line>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <mesh position={[0, -0.35, 0]}>
        <planeGeometry args={[1.7, 0.55]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------------------------- */
/*  Desk, monitor, laptop, chair                                          */
/* ---------------------------------------------------------------------- */
function Desk({ isDark }) {
  const deskColor = isDark ? "#1e293b" : "#c9a27a";
  const legColor = isDark ? "#0f172a" : "#3f3527";

  return (
    <group>
      {/* Desktop */}
      <mesh position={[0, 0.95, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.4]} />
        <meshStandardMaterial color={deskColor} roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[
        [-1.5, 0.47, -0.9],
        [1.5, 0.47, -0.9],
        [-1.5, 0.47, 0.3],
        [1.5, 0.47, 0.3],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.08, 0.94, 0.08]} />
          <meshStandardMaterial color={legColor} />
        </mesh>
      ))}

      {/* Monitor stand */}
      <mesh position={[0, 1.1, -0.6]}>
        <boxGeometry args={[0.06, 0.3, 0.06]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Monitor frame */}
      <mesh position={[0, 1.5, -0.6]} castShadow>
        <boxGeometry args={[1.5, 0.85, 0.05]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      {/* Monitor screen */}
      <mesh position={[0, 1.5, -0.575]}>
        <planeGeometry args={[1.38, 0.73]} />
        <meshStandardMaterial
          color={isDark ? "#0ea5e9" : "#38bdf8"}
          emissive={isDark ? "#0ea5e9" : "#38bdf8"}
          emissiveIntensity={isDark ? 1.1 : 0.55}
        />
      </mesh>

      {/* Laptop base */}
      <mesh position={[0.85, 1.0, -0.15]} rotation={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.55, 0.03, 0.4]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Laptop screen */}
      <mesh
        position={[0.85, 1.22, -0.32]}
        rotation={[-0.35, -0.25, 0]}
        castShadow
      >
        <boxGeometry args={[0.55, 0.36, 0.02]} />
        <meshStandardMaterial
          color={isDark ? "#38bdf8" : "#e2e8f0"}
          emissive={isDark ? "#38bdf8" : "#94a3b8"}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Chair */}
      <group position={[0, 0, 1.3]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.55]} />
          <meshStandardMaterial color={isDark ? "#1e293b" : "#475569"} />
        </mesh>
        <mesh position={[0, 1.0, 0.24]} castShadow>
          <boxGeometry args={[0.55, 0.75, 0.08]} />
          <meshStandardMaterial color={isDark ? "#1e293b" : "#475569"} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} />
        </mesh>
      </group>

      <HoloGraph color={isDark ? "#38bdf8" : "#2563eb"} />
    </group>
  );
}

/* ---------------------------------------------------------------------- */
/*  Simple procedural Monstera / Fiddle-leaf plant                        */
/* ---------------------------------------------------------------------- */
function Plant({ position, scale = 1 }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        rot: (i / 7) * Math.PI * 2,
        tilt: 0.4 + Math.random() * 0.5,
        h: 0.55 + Math.random() * 0.35,
      })),
    []
  );
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.44, 16]} />
        <meshStandardMaterial color="#b45309" roughness={0.9} />
      </mesh>
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(leaf.rot) * 0.08,
            0.45 + leaf.h / 2,
            Math.sin(leaf.rot) * 0.08,
          ]}
          rotation={[leaf.tilt, leaf.rot, 0]}
          castShadow
        >
          <coneGeometry args={[0.12, leaf.h, 6]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------------- */
/*  Environment: floor, back wall, lighting                               */
/* ---------------------------------------------------------------------- */
function Environment({ isDark }) {
  return (
    <>
      <color attach="background" args={[isDark ? "#020617" : "#eef2f7"]} />
      <fog attach="fog" args={[isDark ? "#020617" : "#eef2f7", 8, 22]} />

      <ambientLight intensity={isDark ? 0.25 : 0.65} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={isDark ? 0.4 : 1.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {isDark && (
        <>
          <pointLight position={[0, 1.6, -0.6]} color="#38bdf8" intensity={1.4} distance={4} />
          <pointLight position={[-2, 1.2, 1]} color="#a855f7" intensity={0.8} distance={4} />
        </>
      )}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={isDark ? "#0b1220" : "#e2e8f0"} roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -2.2]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color={isDark ? "#0f172a" : "#f8fafc"} roughness={1} />
      </mesh>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={isDark ? 0.5 : 0.35}
        scale={12}
        blur={2.4}
        far={4}
      />

      {isDark && <Sparkles count={40} scale={8} size={2} speed={0.3} color="#38bdf8" opacity={0.5} />}
    </>
  );
}

/* ---------------------------------------------------------------------- */
/*  Public component                                                      */
/* ---------------------------------------------------------------------- */
const ThreeCanvas = forwardRef(function ThreeCanvas(
  { isDark, robotSlot },
  ref
) {
  const rigRef = useRef();

  useImperativeHandle(ref, () => ({
    flyTo(stepId, opts) {
      rigRef.current?.flyTo(stepId, opts);
    },
  }));

  return (
    <div className="scene-canvas">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: CAMERA_WAYPOINTS.hero.position, fov: 45 }}
      >
        <Environment isDark={isDark} />
        <Desk isDark={isDark} />
        <Plant position={[-1.9, 0, -0.6]} scale={1.1} />
        <Plant position={[2.1, 0, 0.6]} scale={0.85} />
        {robotSlot}
        <CameraRig ref={rigRef} />
      </Canvas>
    </div>
  );
});

export default ThreeCanvas;
export { CAMERA_WAYPOINTS };
