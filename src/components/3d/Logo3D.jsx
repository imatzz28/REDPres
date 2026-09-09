import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader, MTLLoader } from 'three-stdlib';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { FadeGroup } from './FadeGroup';

// Precise 3D transforms per section ensuring zero collision with UI cards and elegant visual rhythm
const SECTION_TRANSFORMS = [
  // 0: Portada (Hero Center, Triumphant Debut)
  { pos: [0, 0, 0], scale: 1.15, rot: [0, 0, 0], showRings: true },
  // 1: Contexto (Upper right atmospheric companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [-0.08, -0.3, 0.04], showRings: false },
  // 2: El Problema (Upper right companion)
  { pos: [2.5, 1.3, -0.6], scale: 0.55, rot: [0.08, -0.35, -0.04], showRings: false },
  // 3: Nacimiento (Center-Right guiding vision)
  { pos: [2.0, 0.4, -0.2], scale: 0.75, rot: [0, -0.2, 0], showRings: true },
  // 4: Por Qué RED (Upper center statement)
  { pos: [0, 1.35, -0.4], scale: 0.8, rot: [0, 0, 0], showRings: true },
  // 5: Construyendo (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [0.08, -0.3, 0], showRings: false },
  // 6: Base Sólida (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [-0.08, -0.25, 0], showRings: false },
  // 7: Ecosistema RED (Upper center hero crown)
  { pos: [0, 1.4, -0.4], scale: 0.75, rot: [0, 0, 0], showRings: true },
  // 8: Curva de Talento (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [0, -0.2, 0], showRings: false },
  // 9: Planificación Turnos (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [0, -0.2, 0], showRings: false },
  // 10: Inteligencia BI (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [0, -0.2, 0], showRings: false },
  // 11: Cultura & Plan de Carrera (Upper right companion)
  { pos: [2.5, 1.4, -0.6], scale: 0.55, rot: [0.06, -0.25, 0], showRings: false },
  // 12: Gran Cierre / Impacto (Triumphant Upper Crown)
  { pos: [0, 1.45, -0.4], scale: 0.78, rot: [-0.06, 0, 0], showRings: true }
];

export const Logo3D = ({ activeSection = 0, scrollProgress = 0 }) => {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const mouseLightRef = useRef();

  // Load original Black/Red MTL material and OBJ
  const materials = useLoader(MTLLoader, '/models/Meshy_AI_Graduation_Bin_0831221028_texture.mtl', (loader) => {
    loader.setResourcePath('/models/');
  });

  const obj = useLoader(OBJLoader, '/models/Meshy_AI_Graduation_Bin_0831221028_texture.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const processedObj = useMemo(() => {
    const cloned = obj.clone(true);

    // Compute bounding box to center at origin
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Desired base display size in 3D units
    const targetSize = 3.2;
    const scaleFactor = maxDim > 0 ? targetSize / maxDim : 1;

    cloned.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Configure materials with glossy specular lacquer reflections for the black cap & vivid red bars
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
              mat.map.needsUpdate = true;
            }
            // High gloss lacquer shine to accentuate glossy black contours
            mat.shininess = 180;
            mat.specular = new THREE.Color(0x888888);
            mat.side = THREE.DoubleSide;
            mat.needsUpdate = true;
          });
        }
      }
    });

    const wrapper = new THREE.Group();
    wrapper.add(cloned);
    return wrapper;
  }, [obj, materials]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    const targetConfig = SECTION_TRANSFORMS[Math.min(activeSection, SECTION_TRANSFORMS.length - 1)] || SECTION_TRANSFORMS[0];

    // Smooth section position interpolation (no collisions)
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetConfig.pos[0], 0.055);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetConfig.pos[1], 0.055);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetConfig.pos[2], 0.055);

      // Smooth section scale interpolation
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetConfig.scale, 0.055);
      groupRef.current.scale.set(newScale, newScale, newScale);

      // Smooth rotation with responsive mouse parallax & gentle breathing hover
      const targetRotY = targetConfig.rot[1] + mouseX * 0.45 + Math.sin(t * 0.7) * 0.08;
      const targetRotX = targetConfig.rot[0] - mouseY * 0.35 + Math.cos(t * 0.5) * 0.05;
      const targetRotZ = targetConfig.rot[2];

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.075);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.075);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.075);
    }

    // Dynamic mouse cursor highlight light
    if (mouseLightRef.current) {
      mouseLightRef.current.position.x = THREE.MathUtils.lerp(mouseLightRef.current.position.x, mouseX * 3.5, 0.1);
      mouseLightRef.current.position.y = THREE.MathUtils.lerp(mouseLightRef.current.position.y, mouseY * 3.5 + 0.5, 0.1);
    }

    // Continuous orbital rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.45;
      ring2Ref.current.rotation.z += delta * 0.35;
    }
  });

  const isHeroOrCierre = activeSection === 0 || activeSection === 3 || activeSection === 4 || activeSection === 11;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Dynamic Cursor Light that highlights glossy black contours */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 1, 3.5]}
        intensity={3.2}
        color="#FFFFFF"
        distance={10}
      />

      {/* Red Background Light placed deep behind the logo to clearly separate the black silhouette from the dark background */}
      <pointLight position={[0, 0, -3.5]} intensity={6.0} color="#E4002B" distance={15} />
      <pointLight position={[0, -1.5, -2.5]} intensity={4.0} color="#FF1A40" distance={12} />

      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        {/* Dedicated 3-Point Studio Lighting Rig */}
        {/* Front Key Light for rich specular reflections on black facets */}
        <directionalLight position={[0, 4, 5]} intensity={2.8} color="#FFFFFF" />
        {/* Underneath Fill Light */}
        <directionalLight position={[0, -3, 3]} intensity={1.5} color="#FFFFFF" />
        {/* Top Rim Light */}
        <directionalLight position={[0, 5, -1]} intensity={2.0} color="#FFFFFF" />
        {/* Left & Right Red Accent Lights */}
        <pointLight position={[-3.5, 1, 1.5]} intensity={3.0} color="#E4002B" distance={8} />
        <pointLight position={[3.5, 1, 1.5]} intensity={2.5} color="#FFFFFF" distance={8} />

        {/* The 3D Logo Object */}
        <primitive object={processedObj} />

        {/* Orbit Rings (shown smoothly on Hero, Key sections & Finale via FadeGroup) */}
        <FadeGroup visible={isHeroOrCierre}>
          <group ref={ring1Ref}>
            <mesh rotation={[Math.PI / 3.2, 0, 0]}>
              <torusGeometry args={[2.5, 0.018, 16, 64]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#FFFFFF"
                emissiveIntensity={0.9}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>

          <group ref={ring2Ref}>
            <mesh rotation={[-Math.PI / 3.8, Math.PI / 3, 0]}>
              <torusGeometry args={[2.8, 0.02, 16, 64]} />
              <meshStandardMaterial
                color="#E4002B"
                emissive="#E4002B"
                emissiveIntensity={1.3}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* Orbiting Satellite Crystals */}
          {[0, 1, 2, 3].map((idx) => {
            const angle = (idx / 4) * Math.PI * 2;
            const radius = 2.4;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * radius, Math.sin(angle) * radius, idx % 2 === 0 ? 0.6 : -0.6]}
                rotation={[0, 0, angle]}
                scale={0.14}
              >
                <octahedronGeometry args={[0.6, 0]} />
                <meshStandardMaterial
                  color={idx % 2 === 0 ? '#E4002B' : '#FFFFFF'}
                  emissive={idx % 2 === 0 ? '#E4002B' : '#FFFFFF'}
                  emissiveIntensity={1.0}
                  roughness={0.2}
                  metalness={0.9}
                />
              </mesh>
            );
          })}
        </FadeGroup>
      </Float>
    </group>
  );
};
