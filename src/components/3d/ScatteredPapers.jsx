import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export const ScatteredPapers = ({ chaosLevel = 1.0, isConverging = false }) => {
  const groupRef = useRef();

  // Create 18 floating sheets/cubes representing manual Excel sheets & paper records
  const items = useMemo(() => {
    const data = [];
    const labels = [
      'EXCEL_2022_V3.XLSX',
      'CARNET_MANIPULACION_CALI.PDF',
      'PLANILLA_FIRMAS_MEDELLIN.DOC',
      'CURVA_BOGOTA_NORTE.XLSX',
      'HORARIOS_SEMANA_42.CSV',
      'CERTIFICACION_POLLO_CRISPY.XLS',
      'EVIDENCIA_VISITA_08.JPG',
      'REPORTE_TIENDAS_VALLE.XLSX',
      'BANCA_GERENTES_2023.PDF',
      'EVALUACION_SERVICIO.XLS',
      'REGISTRO_MANUAL_17.DOC',
      'AUDITORIA_SANIDAD.PDF'
    ];

    for (let i = 0; i < 18; i++) {
      // Chaotic positions
      const chaoticPos = [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      ];
      // Converged grid/aligned position
      const row = Math.floor(i / 6) - 1;
      const col = (i % 6) - 2.5;
      const convergedPos = [col * 0.7, row * 0.9, 0];

      data.push({
        id: i,
        label: labels[i % labels.length],
        chaoticPos,
        convergedPos,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.3 + 0.7,
        color: i % 3 === 0 ? '#E4002B' : (i % 2 === 0 ? '#FFFFFF' : '#D1D5DB')
      });
    }
    return data;
  }, []);

  const meshRefs = useRef([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Slow drift of the entire container
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.15;

    // Interpolate individual sheet positions based on chaosLevel / converging state
    items.forEach((item, idx) => {
      const mesh = meshRefs.current[idx];
      if (!mesh) return;

      const targetPos = isConverging ? item.convergedPos : item.chaoticPos;
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetPos[0], 0.04);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetPos[1], 0.04);
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetPos[2], 0.04);

      if (isConverging) {
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0, 0.05);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, 0, 0.05);
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, 0.05);
      } else {
        mesh.rotation.x += delta * 0.2 * (idx % 2 === 0 ? 1 : -1);
        mesh.rotation.y += delta * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {items.map((item, idx) => (
        <group
          key={item.id}
          ref={(el) => (meshRefs.current[idx] = el)}
          position={item.chaoticPos}
          rotation={item.rot}
          scale={item.scale}
        >
          <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
            {/* Sheet Card Geometry */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.85, 0.02]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.4}
                metalness={0.1}
                transparent
                opacity={0.92}
              />
            </mesh>

            {/* Red header strip on sheets */}
            <mesh position={[0, 0.35, 0.015]}>
              <boxGeometry args={[1.15, 0.1, 0.01]} />
              <meshBasicMaterial color="#E4002B" />
            </mesh>

            {/* Wireframe border */}
            <mesh scale={[1.02, 1.02, 1.02]}>
              <boxGeometry args={[1.2, 0.85, 0.02]} />
              <meshBasicMaterial color="#E4002B" wireframe transparent opacity={0.3} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  );
};
