import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const HeroMonolith = ({ progress = 0 }) => {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smooth idle spin + mouse parallax influence
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.clock.elapsedTime * 0.35 + mouseX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.25) * 0.2 - mouseY, 0.05);

    if (innerRef.current) {
      innerRef.current.rotation.z += delta * 0.6;
      innerRef.current.rotation.x += delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Main Central KFC Geometric Emblem */}
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[1.5, 1]} />
          <meshPhysicalMaterial
            color="#E4002B"
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#7A0014"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef} scale={0.75}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>

        {/* Outer Orbital Orbit Ring 1 */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.3, 0.03, 16, 64]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Outer Orbital Orbit Ring 2 */}
        <group ref={ring2Ref}>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[2.7, 0.025, 16, 64]} />
            <meshStandardMaterial
              color="#FF2A4D"
              emissive="#E4002B"
              emissiveIntensity={0.8}
              metalness={0.8}
            />
          </mesh>
        </group>

        {/* Floating Satellite Hex Brackets */}
        {[0, 1, 2, 3].map((idx) => {
          const angle = (idx / 4) * Math.PI * 2;
          const radius = 2.0;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, (idx % 2 === 0 ? 0.6 : -0.6)]}
              rotation={[0, 0, angle]}
              scale={0.18}
            >
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.9} />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};
