import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * High-Performance VideoBackground
 * - Reads scroll position directly in the 60fps Three.js render loop (zero React re-render overhead)
 * - Ultra-responsive exponential damping for buttery smooth forward/backward scrub
 * - Optimized seeked pipeline with requestVideoFrameCallback
 * - Exact frustum coverage at plane depth
 */
export const VideoBackground = () => {
  const meshRef = useRef();
  const { viewport, camera } = useThree();
  const [videoTexture, setVideoTexture] = useState(null);
  const [videoAspect, setVideoAspect] = useState(16 / 9);
  const videoRef = useRef(null);
  const smoothProgressRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const framePendingRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/VIDEO.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = false;
    video.preload = 'auto';
    videoRef.current = video;

    const onLoadedMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        setVideoAspect(video.videoWidth / video.videoHeight);
      }
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      setVideoTexture(texture);
      video.pause();
    };

    const onSeeked = () => {
      framePendingRef.current = true;
      if (!video || !video.duration) {
        isSeekingRef.current = false;
        return;
      }

      const diff = targetTimeRef.current - video.currentTime;
      if (Math.abs(diff) > 0.015) {
        try {
          video.currentTime = targetTimeRef.current;
        } catch {
          isSeekingRef.current = false;
        }
      } else {
        isSeekingRef.current = false;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.pause();
      video.src = '';
    };
  }, []);

  useFrame((_, delta) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Read real-time scroll progress directly from window (zero React state lag)
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const rawProgress = docHeight > 0 ? Math.max(0, Math.min(1, scrollY / docHeight)) : 0;

    // Responsive exponential damping for silky smooth motion
    smoothProgressRef.current = THREE.MathUtils.damp(
      smoothProgressRef.current,
      rawProgress,
      20,
      delta
    );

    const maxTime = Math.max(0, video.duration - 0.04);
    const targetTime = Math.max(0, Math.min(maxTime, smoothProgressRef.current * maxTime));
    targetTimeRef.current = targetTime;

    // Dispatch next seek if decoder is idle and distance is meaningful
    const diff = targetTime - video.currentTime;
    if (Math.abs(diff) > 0.01 && !isSeekingRef.current) {
      isSeekingRef.current = true;
      try {
        video.currentTime = targetTime;
      } catch {
        isSeekingRef.current = false;
      }
    }

    // Mark texture updated when new frame is decoded
    if (videoTexture && framePendingRef.current) {
      videoTexture.needsUpdate = true;
      framePendingRef.current = false;
    }

    // Gentle 3D cursor parallax reaction on the video mesh
    if (meshRef.current) {
      const targetRotY = mouseRef.current.x * 0.02;
      const targetRotX = -mouseRef.current.y * 0.015;
      const targetPosX = -mouseRef.current.x * 0.08;
      const targetPosY = -mouseRef.current.y * 0.06;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.045);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.045);
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, 0.045);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, 0.045);
    }
  });

  // Full-bleed cover plane geometry with exact 1:1 camera frustum fit (no excessive zoom)
  const [planeWidth, planeHeight] = useMemo(() => {
    const planeZ = -2;
    const distance = 5.0 - planeZ;
    const vFov = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
    const visibleWidth = visibleHeight * (viewport.width / viewport.height);
    const screenAspect = viewport.width / viewport.height;

    // Minimal 3% safety margin just to prevent edge clipping on subtle cursor tilt
    const margin = 1.03;
    let w, h;
    if (screenAspect > videoAspect) {
      w = visibleWidth * margin;
      h = w / videoAspect;
    } else {
      h = visibleHeight * margin;
      w = h * videoAspect;
    }
    return [w, h];
  }, [viewport.width, viewport.height, camera.fov, videoAspect]);

  if (!videoTexture) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={videoTexture}
        toneMapped={false}
        transparent={false}
      />
    </mesh>
  );
};
