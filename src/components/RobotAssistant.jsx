import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Web Speech API helper — used by the robot and by the GSAP tour    */
/* ------------------------------------------------------------------ */
export function speakText(text, { rate = 1, pitch = 1.05, onEnd } = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd && onEnd();
    return;
  }
  // Cancel anything currently queued so lines never overlap.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((v) => /en-US|en_GB|Google US English/i.test(v.name || v.lang));
  if (preferred) utterance.voice = preferred;

  utterance.onend = () => onEnd && onEnd();
  window.speechSynthesis.speak(utterance);
}

export const WELCOME_GREETING =
  "Welcome to Vasu Mekala's AI and ML Portfolio! I am your AI assistant. Would you like a guided tour through Vasu's projects, experience, and skills?";

/* ------------------------------------------------------------------ */
/*  3D Robot mesh — procedural, rigged-style idle animation           */
/*  Render this INSIDE the R3F <Canvas> (passed as ThreeCanvas's      */
/*  `robotSlot` prop).                                                */
/* ------------------------------------------------------------------ */
const RobotAssistant = forwardRef(function RobotAssistant(
  { position = [1.75, 1.55, 0.1], isDark = false, onActivate },
  ref
) {
  const group = useRef();
  const headRef = useRef();
  const glowRef = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const [hovered, setHovered] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useImperativeHandle(ref, () => ({
    speak(text, opts) {
      setSpeaking(true);
      speakText(text, {
        ...opts,
        onEnd: () => {
          setSpeaking(false);
          opts?.onEnd?.();
        },
      });
    },
    greet(onEnd) {
      setSpeaking(true);
      speakText(WELCOME_GREETING, {
        onEnd: () => {
          setSpeaking(false);
          onEnd && onEnd();
        },
      });
    },
  }));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 1.4) * 0.06;
      group.current.rotation.y = Math.sin(t * 0.5) * 0.25;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.9) * 0.15;
    }
    if (leftArm.current && rightArm.current) {
      const wave = speaking ? Math.sin(t * 6) * 0.35 : Math.sin(t * 1.2) * 0.08;
      leftArm.current.rotation.z = 0.3 + wave;
      rightArm.current.rotation.z = -0.3 - wave * 0.6;
    }
    if (glowRef.current) {
      const targetScale = hovered || speaking ? 1.35 : 1.0;
      glowRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity,
        hovered || speaking ? 0.55 : 0.25,
        0.1
      );
    }
  });

  const accent = isDark ? "#38bdf8" : "#2563eb";
  const body = isDark ? "#e2e8f0" : "#f8fafc";
  const dark = isDark ? "#0f172a" : "#1e293b";

  return (
    <group
      ref={group}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onActivate && onActivate();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Ambient glow halo (hover / speaking feedback) */}
      <mesh ref={glowRef} position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial color={accent} transparent opacity={0.25} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.42, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={body} metalness={0.3} roughness={0.35} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.08, 0.02, 0.18]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0.08, 0.02, 0.18]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
          <meshStandardMaterial color={dark} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.28, 8, 16]} />
        <meshStandardMaterial color={body} metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.08, 0.15]}>
        <circleGeometry args={[0.06, 20]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.24, 0.14, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.28, 6, 12]} />
          <meshStandardMaterial color={dark} metalness={0.4} roughness={0.4} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.24, 0.14, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.28, 6, 12]} />
          <meshStandardMaterial color={dark} metalness={0.4} roughness={0.4} />
        </mesh>
      </group>

      {/* Legs / hover base */}
      <mesh position={[0, -0.28, 0]}>
        <coneGeometry args={[0.14, 0.16, 16, 1, true]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
});

export default RobotAssistant;
