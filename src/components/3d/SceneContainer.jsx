import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { VideoBackground } from './VideoBackground';

// Responsive 3D Camera Rig that dynamically reacts to cursor movements & scroll depth
function CameraRig() {
  const cameraRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!cameraRef.current) return;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    const targetX = mouseX * 0.4;
    const targetY = mouseY * 0.3;
    const targetZ = 5.0;

    // Smooth lerp for buttery camera movement
    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.045);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.045);
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.045);

    cameraRef.current.lookAt(mouseX * 0.1, mouseY * 0.08, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={48} />;
}

export const SceneContainer = ({ activeSection = 0, scrollProgress = 0 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <CameraRig activeSection={activeSection} scrollProgress={scrollProgress} />

          {/* Fullscreen Video-Scrubbed Background in Three.js */}
          <VideoBackground scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
