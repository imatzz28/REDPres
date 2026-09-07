import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FadeGroup — Wrapper that smoothly transitions 3D children in/out
 * instead of hard mounting/unmounting.
 *
 * When visible=true:  scale → 1, positionY → 0, material opacity → original
 * When visible=false: scale → 0.01, positionY → +0.5, material opacity → 0
 *
 * All transitions use lerp for buttery smooth results.
 */
export const FadeGroup = ({
  visible = false,
  children,
  lerpFactor = 0.045,
  fadeOffset = 0.5,
  scaleHidden = 0.01,
}) => {
  const groupRef = useRef();
  const opacityRef = useRef(visible ? 1 : 0);

  // Store original material opacities on first encounter
  const originalOpacities = useRef(new Map());
  const materialsInitialized = useRef(false);

  // Capture original material opacities after first render
  useEffect(() => {
    if (!groupRef.current) return;

    // Small delay to let children mount
    const timer = setTimeout(() => {
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (!originalOpacities.current.has(mat.uuid)) {
              originalOpacities.current.set(mat.uuid, {
                opacity: mat.opacity !== undefined ? mat.opacity : 1,
                transparent: mat.transparent,
              });
              // Enable transparency for fade operations
              mat.transparent = true;
            }
          });
        }
        // Also handle Points materials
        if (child.isPoints && child.material) {
          const mat = child.material;
          if (!originalOpacities.current.has(mat.uuid)) {
            originalOpacities.current.set(mat.uuid, {
              opacity: mat.opacity !== undefined ? mat.opacity : 1,
              transparent: mat.transparent,
            });
            mat.transparent = true;
          }
        }
        // Handle LineSegments
        if (child.isLineSegments && child.material) {
          const mat = child.material;
          if (!originalOpacities.current.has(mat.uuid)) {
            originalOpacities.current.set(mat.uuid, {
              opacity: mat.opacity !== undefined ? mat.opacity : 1,
              transparent: mat.transparent,
            });
            mat.transparent = true;
          }
        }
      });
      materialsInitialized.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetOpacity = visible ? 1 : 0;
    const targetScale = visible ? 1 : scaleHidden;
    const targetY = visible ? 0 : fadeOffset;

    // Lerp opacity tracking value
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, lerpFactor);

    // Clamp to avoid floating point noise
    if (Math.abs(opacityRef.current - targetOpacity) < 0.005) {
      opacityRef.current = targetOpacity;
    }

    // Lerp scale
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Lerp Y position for emerge/submerge effect
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      lerpFactor
    );

    // Update all material opacities
    if (materialsInitialized.current) {
      groupRef.current.traverse((child) => {
        const mat = child.material;
        if (!mat) return;

        const mats = Array.isArray(mat) ? mat : [mat];
        mats.forEach((m) => {
          const original = originalOpacities.current.get(m.uuid);
          if (original) {
            m.opacity = original.opacity * opacityRef.current;
            m.needsUpdate = true;
          }
        });
      });
    }
  });

  return (
    <group ref={groupRef} scale={visible ? 1 : scaleHidden}>
      {children}
    </group>
  );
};
