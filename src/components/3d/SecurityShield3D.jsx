import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const SecurityShield3D = () => {
  const shieldRef = useRef();
  const ringRef = useRef();
  const lockCoreRef = useRef();

  useFrame((state, delta) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
      shieldRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x += delta * 0.2;
    }
    if (lockCoreRef.current) {
      lockCoreRef.current.rotation.y -= delta * 0.6;
    }
  });

  return (
    <group position={[0.5, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Shield Frame */}
        <group ref={shieldRef}>
          {/* Main Convex Shield Body */}
          <mesh>
            <cylinderGeometry args={[1.5, 0.4, 2.2, 6, 1, false, 0, Math.PI * 2]} />
            <meshPhysicalMaterial
              color="#1A1A1A"
              roughness={0.2}
              metalness={0.9}
              clearcoat={1}
              reflectivity={0.9}
              emissive="#E4002B"
              emissiveIntensity={0.15}
            />
          </mesh>

          {/* Glowing Green/Red Security Border */}
          <mesh scale={[1.04, 1.04, 1.04]}>
            <cylinderGeometry args={[1.5, 0.4, 2.2, 6, 1, false, 0, Math.PI * 2]} />
            <meshBasicMaterial color="#22C55E" wireframe transparent opacity={0.5} />
          </mesh>

          {/* Central Lock Hexagon Core */}
          <group ref={lockCoreRef} position={[0, 0.2, 0.9]}>
            <mesh>
              <cylinderGeometry args={[0.4, 0.4, 0.15, 6]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#E4002B" emissive="#E4002B" emissiveIntensity={0.9} />
            </mesh>
            {/* Keyhole / Secure Core */}
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[0.08, 0.2, 0.05]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0.12, 0.1]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Rotating Data Orbit Rings */}
          <group ref={ringRef}>
            <mesh>
              <torusGeometry args={[2.0, 0.03, 16, 64]} />
              <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.2, 0.02, 16, 64]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#E4002B" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
};
