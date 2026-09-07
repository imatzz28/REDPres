import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NetworkNodes = ({ isConnected = true }) => {
  const groupRef = useRef();
  const lineMeshRef = useRef();

  // Generate 7 regional hubs + 30 sub-nodes
  const { nodes, linePositions } = useMemo(() => {
    const nodesList = [];
    const regions = [
      { name: 'Bogotá D.C.', pos: [0, 0.4, 0], color: '#E4002B', size: 0.28 },
      { name: 'Medellín', pos: [-1.4, 1.2, 0.5], color: '#E4002B', size: 0.24 },
      { name: 'Cali', pos: [-1.2, -1.1, 0.3], color: '#E4002B', size: 0.24 },
      { name: 'Barranquilla', pos: [0.6, 2.0, -0.4], color: '#E4002B', size: 0.22 },
      { name: 'Bucaramanga', pos: [1.3, 0.9, -0.2], color: '#E4002B', size: 0.20 },
      { name: 'Eje Cafetero', pos: [-0.7, -0.2, 0.8], color: '#E4002B', size: 0.20 },
      { name: 'Tolima & Huila', pos: [0.8, -1.4, -0.3], color: '#E4002B', size: 0.18 }
    ];

    regions.forEach(r => nodesList.push(r));

    // Add sub-store nodes orbiting regional hubs
    regions.forEach((hub, hIdx) => {
      for (let s = 0; s < 4; s++) {
        const offsetAngle = (s / 4) * Math.PI * 2 + hIdx;
        const dist = 0.55 + Math.random() * 0.3;
        nodesList.push({
          name: `Tienda ${hIdx * 4 + s + 1}`,
          pos: [
            hub.pos[0] + Math.cos(offsetAngle) * dist,
            hub.pos[1] + Math.sin(offsetAngle) * dist,
            hub.pos[2] + (Math.random() - 0.5) * 0.4
          ],
          color: '#FFFFFF',
          size: 0.08,
          parentHub: hub.pos
        });
      }
    });

    // Generate line segments connecting stores to hubs and hubs to Bogota central
    const lines = [];
    nodesList.forEach((n) => {
      if (n.parentHub) {
        lines.push(...n.pos, ...n.parentHub);
      }
    });
    // Connect regional hubs together
    for (let i = 1; i < regions.length; i++) {
      lines.push(...regions[0].pos, ...regions[i].pos);
    }

    return {
      nodes: nodesList,
      linePositions: new Float32Array(lines)
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Node Spheres */}
      {nodes.map((node, idx) => (
        <group key={idx} position={node.pos}>
          <mesh>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color === '#E4002B' ? '#E4002B' : '#ffffff'}
              emissiveIntensity={node.color === '#E4002B' ? 0.8 : 0.3}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {node.size > 0.15 && (
            <mesh scale={1.4}>
              <sphereGeometry args={[node.size, 8, 8]} />
              <meshBasicMaterial color="#E4002B" wireframe transparent opacity={0.35} />
            </mesh>
          )}
        </group>
      ))}

      {/* Connecting Network Lines */}
      {isConnected && (
        <lineSegments ref={lineMeshRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linePositions.length / 3}
              array={linePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#E4002B" transparent opacity={0.65} linewidth={1} />
        </lineSegments>
      )}
    </group>
  );
};
