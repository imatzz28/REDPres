import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const CelebrationImpact3D = () => {
  const auraRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const sparklesRef = useRef();

  // Create celebratory spark particles in golden, red and white tones
  const [sparklePositions, sparkleColors, sparkleSizes] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const cRed = new THREE.Color('#E4002B');
    const cWhite = new THREE.Color('#FFFFFF');
    const cGold = new THREE.Color('#FBBF24');
    const cAmber = new THREE.Color('#F59E0B');

    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.7 - 0.5;

      const randColor = i % 4;
      const chosenColor = randColor === 0 ? cRed : randColor === 1 ? cWhite : randColor === 2 ? cGold : cAmber;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
      sz[i] = Math.random() * 0.08 + 0.04;
    }
    return [pos, col, sz];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (auraRef.current) {
      auraRef.current.rotation.y += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
      ring2Ref.current.scale.setScalar(1 + Math.cos(t * 1.5) * 0.05);
    }
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y -= delta * 0.1;
      sparklesRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group position={[0, 1.4, -0.8]} scale={[1, 1, 1]}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Background Radiant Aura Rings (Behind the 3D Logo) */}
        <group ref={auraRef}>
          {/* Outer golden halo */}
          <group ref={ring1Ref}>
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <torusGeometry args={[2.8, 0.015, 16, 64]} />
              <meshStandardMaterial
                color="#FBBF24"
                emissive="#F59E0B"
                emissiveIntensity={1.2}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>

          {/* Inner white-red corona */}
          <group ref={ring2Ref}>
            <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
              <torusGeometry args={[3.2, 0.012, 16, 64]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#E4002B"
                emissiveIntensity={0.8}
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>

          {/* Floating celebratory diamond beacons */}
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const angle = (idx / 6) * Math.PI * 2;
            const r = 2.6;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * r, Math.sin(angle) * r, -0.2]}
                rotation={[0, 0, angle + Math.PI / 4]}
                scale={0.08}
              >
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                  color={idx % 2 === 0 ? '#FBBF24' : '#FFFFFF'}
                  emissive={idx % 2 === 0 ? '#F59E0B' : '#FFFFFF'}
                  emissiveIntensity={1.5}
                />
              </mesh>
            );
          })}
        </group>

        {/* Orbiting celebratory sparkles field */}
        <points ref={sparklesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={sparklePositions.length / 3}
              array={sparklePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={sparkleColors.length / 3}
              array={sparkleColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.07}
            vertexColors
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </Float>
    </group>
  );
};
