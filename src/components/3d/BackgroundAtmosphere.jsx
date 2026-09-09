import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BackgroundAtmosphere
 * Clean, modern & lively 3D atmospheric background:
 * - Pure KFC brand palette: KFC Red (#E4002B), Radiant Red (#FF2A4D), Crisp Diamond White (#FFFFFF), Deep Black
 * - Zero yellow or green elements
 * - Dynamic undulating particle wave field responding smoothly to cursor and scroll
 * - Subtle ambient depth lighting
 */
export const BackgroundAtmosphere = ({ activeSection = 0, scrollProgress = 0 }) => {
  const wavePointsRef = useRef();
  const dustPointsRef = useRef();
  const lightRef1 = useRef();
  const lightRef2 = useRef();

  // Layer 1: Lively 3D Particle Wave Grid (Clean White & KFC Red)
  const { wavePositions, waveColors, originalY, gridCols, gridRows } = useMemo(() => {
    const cols = 55;
    const rows = 40;
    const count = cols * rows;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const origY = new Float32Array(count);

    const cRed = new THREE.Color('#E4002B');
    const cRedLight = new THREE.Color('#E4002B');
    const cWhite = new THREE.Color('#FFFFFF');
    const cSoftWhite = new THREE.Color('#D4D4D8');

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * 0.45;
        const z = (j - rows / 2) * 0.45 - 2;
        const y = -1.5;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
        origY[idx] = y;

        // Radial color gradient from center (Red) to outer edges (White/Translucent)
        const dist = Math.sqrt(x * x + z * z);
        const isRed = dist < 7 && Math.random() > 0.35;
        const chosen = isRed ? (Math.random() > 0.5 ? cRed : cRedLight) : (Math.random() > 0.4 ? cWhite : cSoftWhite);

        col[idx * 3] = chosen.r;
        col[idx * 3 + 1] = chosen.g;
        col[idx * 3 + 2] = chosen.b;

        idx++;
      }
    }

    return {
      wavePositions: pos,
      waveColors: col,
      originalY: origY,
      gridCols: cols,
      gridRows: rows
    };
  }, []);

  // Layer 2: Subtle floating diamond ambient dust
  const [dustPos, dustColor] = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cRed = new THREE.Color('#E4002B');
    const cWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 1;

      const chosen = Math.random() > 0.4 ? cRed : cWhite;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Animate 3D Particle Wave Field with fluid sine motion
    if (wavePointsRef.current) {
      const positions = wavePointsRef.current.geometry.attributes.position.array;
      let idx = 0;
      for (let i = 0; i < gridCols; i++) {
        for (let j = 0; j < gridRows; j++) {
          const u = i / gridCols;
          const v = j / gridRows;
          // Undulating fluid wave formula combining time, space and mouse displacement
          const wave =
            Math.sin(u * 7 + t * 1.6 + mouseX * 1.5) * 0.4 +
            Math.cos(v * 6 + t * 1.2 + mouseY * 1.5) * 0.35 +
            Math.sin((u + v) * 5 + t * 0.9) * 0.2;

          positions[idx * 3 + 1] = originalY[idx] + wave;
          idx++;
        }
      }
      wavePointsRef.current.geometry.attributes.position.needsUpdate = true;
      wavePointsRef.current.rotation.y = mouseX * 0.08;
      wavePointsRef.current.rotation.x = -0.35 + mouseY * 0.08;
    }

    // Subtle drift of ambient dust particles
    if (dustPointsRef.current) {
      dustPointsRef.current.rotation.y += delta * 0.02;
      dustPointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.04 + mouseY * 0.05;
      dustPointsRef.current.rotation.z = mouseX * 0.05;
    }

    // Interactive ambient accent lights
    if (lightRef1.current) {
      lightRef1.current.position.x = Math.sin(t * 0.4) * 4 + mouseX * 3;
      lightRef1.current.position.y = Math.cos(t * 0.3) * 3 + mouseY * 2;
    }
    if (lightRef2.current) {
      lightRef2.current.position.x = -Math.sin(t * 0.3) * 5 - mouseX * 2;
      lightRef2.current.position.y = -Math.cos(t * 0.4) * 4 - mouseY * 2;
    }
  });

  return (
    <group>
      {/* Clean Dynamic KFC Red & White Ambient Lights */}
      <pointLight ref={lightRef1} position={[0, 2, -2]} intensity={3.5} color="#E4002B" distance={16} />
      <pointLight ref={lightRef2} position={[0, -2, -3]} intensity={2.2} color="#E4002B" distance={15} />
      <pointLight position={[5, 4, -4]} intensity={1.8} color="#FFFFFF" distance={16} />
      <pointLight position={[-5, -4, -4]} intensity={2.0} color="#E4002B" distance={16} />

      {/* Layer 1: Undulating Fluid Wave Particle Grid */}
      <points ref={wavePointsRef} position={[0, -0.6, -1]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={wavePositions.length / 3}
            array={wavePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={waveColors.length / 3}
            array={waveColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Layer 2: Subtle Ambient Floating Embers (White & Red) */}
      <points ref={dustPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPos.length / 3}
            array={dustPos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={dustColor.length / 3}
            array={dustColor}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
