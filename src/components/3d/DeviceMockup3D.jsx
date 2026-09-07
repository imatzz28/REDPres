import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

export const DeviceMockup3D = ({ activeModule = 'talent_curve', sectionIndex = 8 }) => {
  const laptopRef = useRef();
  const screenRef = useRef();
  const card1Ref = useRef();
  const card2Ref = useRef();

  // Create high-res dynamic canvas textures for the 3D screen depending on active module
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    // Draw Dark UI Background
    ctx.fillStyle = '#141416';
    ctx.fillRect(0, 0, 1024, 640);

    // Sidebar
    ctx.fillStyle = '#1A1A1E';
    ctx.fillRect(0, 0, 220, 640);

    // KFC RED Logo in sidebar
    ctx.fillStyle = '#E4002B';
    ctx.fillRect(24, 28, 36, 36);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('R.E.D.', 70, 54);

    // Sidebar navigation items
    const navItems = [
      { name: 'Dashboard', active: sectionIndex === 7 || sectionIndex === 8 },
      { name: 'Curvas de Talento', active: sectionIndex === 8 },
      { name: 'Bancas & Certif.', active: sectionIndex === 8 },
      { name: 'Planif. Horarios', active: sectionIndex === 9 },
      { name: 'Altas & Bajas', active: sectionIndex === 9 },
      { name: 'Analítica & KPIs', active: sectionIndex === 10 },
      { name: 'Encuestas Dpto.', active: sectionIndex === 10 }
    ];

    navItems.forEach((item, idx) => {
      const y = 110 + idx * 46;
      if (item.active) {
        ctx.fillStyle = 'rgba(228, 0, 43, 0.2)';
        ctx.roundRect(16, y - 24, 188, 38, 8);
        ctx.fill();
        ctx.fillStyle = '#E4002B';
        ctx.fillRect(16, y - 24, 4, 38);
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = '#888899';
      }
      ctx.font = '14px sans-serif';
      ctx.fillText(item.name, 36, y);
    });

    // Top Header Bar
    ctx.fillStyle = '#1A1A1E';
    ctx.fillRect(220, 0, 804, 60);

    ctx.fillStyle = '#E4002B';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('KFC COLOMBIA — SISTEMA R.E.D. v2.4', 250, 36);

    ctx.fillStyle = '#4ADE80';
    ctx.beginPath();
    ctx.arc(970, 30, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '13px sans-serif';
    ctx.fillText('Online', 915, 35);

    // Dynamic Module Content rendering
    if (sectionIndex === 8) {
      // Talent & Certifications Module UI
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Gestión de Curvas de Aprendizaje & Certificaciones', 250, 105);

      // 3 KPI metric cards
      const kpis = [
        { label: 'Colaboradores Activos', val: '4,520', color: '#E4002B' },
        { label: 'Curvas Certificadas', val: '94.8%', color: '#22C55E' },
        { label: 'Bancas Disponibles', val: '128', color: '#F59E0B' }
      ];
      kpis.forEach((k, i) => {
        const x = 250 + i * 250;
        ctx.fillStyle = '#1E1E24';
        ctx.roundRect(x, 125, 230, 80, 8);
        ctx.fill();
        ctx.fillStyle = k.color;
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(k.val, x + 16, 162);
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px sans-serif';
        ctx.fillText(k.label, x + 16, 188);
      });

      // Table Header & Rows
      ctx.fillStyle = '#1E1E24';
      ctx.roundRect(250, 225, 730, 380, 8);
      ctx.fill();

      ctx.fillStyle = '#E4002B';
      ctx.fillRect(250, 225, 730, 40);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('COLABORADOR', 270, 250);
      ctx.fillText('TIENDA / REGIÓN', 440, 250);
      ctx.fillText('CURVA DE NIVEL', 630, 250);
      ctx.fillText('ESTADO', 820, 250);

      const rows = [
        { name: 'Carlos Mendoza', store: 'KFC Gran Estación (Bogotá)', level: 'Cocinero Master (Fase 3)', status: 'Certificado 100%' },
        { name: 'Valentina Restrepo', store: 'KFC El Tesoro (Medellín)', level: 'Servicio al Cliente (Fase 2)', status: 'En Progreso 78%' },
        { name: 'Andrés Camargo', store: 'KFC Chipichape (Cali)', level: 'Banca a Subgerente', status: 'Evaluación Final' },
        { name: 'Diana Morales', store: 'KFC Buenavista (B/quilla)', level: 'Manipulación de Alimentos', status: 'Vigente (2027)' },
        { name: 'Santiago Gómez', store: 'KFC Parque Caracolí', level: 'Especialista de Calidad', status: 'Certificado 100%' }
      ];

      rows.forEach((r, idx) => {
        const y = 295 + idx * 56;
        ctx.fillStyle = idx % 2 === 0 ? '#1A1A1E' : '#222228';
        ctx.fillRect(260, y - 22, 710, 48);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(r.name, 270, y + 4);

        ctx.fillStyle = '#D1D5DB';
        ctx.font = '13px sans-serif';
        ctx.fillText(r.store, 440, y + 4);

        ctx.fillStyle = '#F59E0B';
        ctx.fillText(r.level, 630, y + 4);

        ctx.fillStyle = r.status.includes('100%') ? '#22C55E' : '#38BDF8';
        ctx.fillText(r.status, 820, y + 4);
      });

    } else if (sectionIndex === 9) {
      // Operations & Schedules
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Planificación de Especialistas & Flujo Operativo', 250, 105);

      // Calendar grid mockup
      ctx.fillStyle = '#1E1E24';
      ctx.roundRect(250, 130, 730, 480, 8);
      ctx.fill();

      // Days of week
      const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      days.forEach((d, i) => {
        const x = 270 + i * 100;
        ctx.fillStyle = '#E4002B';
        ctx.fillRect(x, 145, 90, 30);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(d, x + 15, 165);
      });

      // Events
      const events = [
        { day: 0, text: 'Visita KFC Unicentro (Bogotá)', color: '#E4002B' },
        { day: 1, text: 'Auditoría Carnets (Medellín)', color: '#3B82F6' },
        { day: 2, text: 'Certificación 12 Curvas (Cali)', color: '#10B981' },
        { day: 3, text: 'Onboarding 15 Ingresos', color: '#8B5CF6' },
        { day: 4, text: 'Revisión Bancas Regionales', color: '#F59E0B' }
      ];

      events.forEach((ev, i) => {
        const x = 270 + ev.day * 100;
        const y = 190 + (i % 3) * 80;
        ctx.fillStyle = ev.color;
        ctx.roundRect(x, y, 90, 60, 6);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(ev.text.substring(0, 14), x + 6, y + 22);
        ctx.font = '10px sans-serif';
        ctx.fillText(ev.text.substring(14), x + 6, y + 40);
      });

    } else if (sectionIndex === 10) {
      // Intelligence & Real-time BI
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Inteligencia de Datos & Reportes en Tiempo Real', 250, 105);

      // Bar Chart Mockup
      ctx.fillStyle = '#1E1E24';
      ctx.roundRect(250, 130, 440, 480, 8);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Cumplimiento de Certificaciones por Región', 270, 165);

      const regionsData = [
        { name: 'Bogotá D.C.', pct: 98 },
        { name: 'Medellín', pct: 94 },
        { name: 'Cali', pct: 91 },
        { name: 'Barranquilla', pct: 96 },
        { name: 'Bucaramanga', pct: 89 },
        { name: 'Eje Cafetero', pct: 93 },
        { name: 'Tolima/Huila', pct: 90 }
      ];

      regionsData.forEach((rg, i) => {
        const y = 205 + i * 50;
        ctx.fillStyle = '#D1D5DB';
        ctx.font = '13px sans-serif';
        ctx.fillText(rg.name, 270, y + 14);

        // Bar background
        ctx.fillStyle = '#2A2A35';
        ctx.roundRect(380, y, 240, 20, 4);
        ctx.fill();

        // Bar fill
        ctx.fillStyle = '#E4002B';
        ctx.roundRect(380, y, (240 * rg.pct) / 100, 20, 4);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`${rg.pct}%`, 630, y + 15);
      });

      // Survey satisfaction gauge
      ctx.fillStyle = '#1E1E24';
      ctx.roundRect(710, 130, 270, 480, 8);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Satisfacción Evaluaciones', 730, 165);

      ctx.fillStyle = '#22C55E';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('4.9/5', 780, 260);

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '14px sans-serif';
      ctx.fillText('NPS Entrenamiento: +88', 750, 310);
      ctx.fillText('Encuestas respondidas: 1,840', 735, 345);

    } else {
      // General Dashboard Showcase (Section 7, 8)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Bienvenido a R.E.D. — Centro de Comando Nacional', 250, 110);

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '15px sans-serif';
      ctx.fillText('Monitoreo en vivo de +170 tiendas KFC Colombia en 7 regiones.', 250, 140);

      // 4 Main Feature Tiles
      const tiles = [
        { title: 'Certificación de Curvas', sub: 'Auditorías 100% digitales', color: '#E4002B' },
        { title: 'Gestión de Bancas', sub: 'Plan de carrera para gerentes', color: '#3B82F6' },
        { title: 'Control de Horarios', sub: 'Especialistas y coberturas', color: '#10B981' },
        { title: 'Inteligencia Operativa', sub: 'Dashboards y métricas en vivo', color: '#F59E0B' }
      ];

      tiles.forEach((t, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 250 + col * 360;
        const y = 175 + row * 200;

        ctx.fillStyle = '#1E1E26';
        ctx.roundRect(x, y, 340, 180, 10);
        ctx.fill();

        ctx.fillStyle = t.color;
        ctx.fillRect(x, y, 340, 6);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(t.title, x + 24, y + 45);

        ctx.fillStyle = '#9CA3AF';
        ctx.font = '14px sans-serif';
        ctx.fillText(t.sub, x + 24, y + 75);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.roundRect(x + 24, y + 100, 140, 36, 6);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('Ver Módulo →', x + 40, y + 123);
      });
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [sectionIndex]);

  useFrame((state, delta) => {
    if (!laptopRef.current) return;
    // Parallax mouse tilt
    const targetRotX = 0.15 - state.pointer.y * 0.15;
    const targetRotY = (sectionIndex === 8 ? -0.2 : sectionIndex === 9 ? 0.2 : 0) + state.pointer.x * 0.2;
    
    laptopRef.current.rotation.x = THREE.MathUtils.lerp(laptopRef.current.rotation.x, targetRotX, 0.05);
    laptopRef.current.rotation.y = THREE.MathUtils.lerp(laptopRef.current.rotation.y, targetRotY, 0.05);

    if (card1Ref.current) {
      card1Ref.current.position.y = 1.1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
    if (card2Ref.current) {
      card2Ref.current.position.y = -1.0 + Math.cos(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group position={[0.4, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={laptopRef}>
          {/* Laptop Screen Bezel */}
          <mesh castShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[3.4, 2.2, 0.08]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Screen Display Face */}
          <mesh position={[0, 0.5, 0.045]}>
            <planeGeometry args={[3.25, 2.05]} />
            <meshBasicMaterial map={screenTexture} />
          </mesh>

          {/* Glowing Red Bezel Accent */}
          <mesh position={[0, -0.58, 0.05]}>
            <boxGeometry args={[3.3, 0.04, 0.02]} />
            <meshBasicMaterial color="#E4002B" />
          </mesh>

          {/* Laptop Base / Keyboard Deck */}
          <mesh position={[0, -0.65, 0.8]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[3.4, 0.08, 1.8]} />
            <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, -0.60, 1.25]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[0.9, 0.01, 0.6]} />
            <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Keyboard Keys Bed */}
          <mesh position={[0, -0.62, 0.7]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[3.0, 0.02, 0.9]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.7} />
          </mesh>

          {/* Floating Feature Glass Card 1 (Top Right) */}
          <group ref={card1Ref} position={[2.0, 1.1, 0.6]} rotation={[0, -0.3, 0]}>
            <RoundedBox args={[1.5, 0.8, 0.04]} radius={0.06}>
              <meshPhysicalMaterial
                color="#E4002B"
                roughness={0.1}
                transmission={0.6}
                thickness={0.5}
                transparent
                opacity={0.85}
              />
            </RoundedBox>
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.3, 0.65]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
            </mesh>
          </group>

          {/* Floating Feature Glass Card 2 (Bottom Left) */}
          <group ref={card2Ref} position={[-2.0, -0.9, 0.8]} rotation={[0, 0.35, 0]}>
            <RoundedBox args={[1.6, 0.75, 0.04]} radius={0.06}>
              <meshPhysicalMaterial
                color="#FFFFFF"
                roughness={0.1}
                transmission={0.7}
                thickness={0.5}
                transparent
                opacity={0.85}
              />
            </RoundedBox>
          </group>
        </group>
      </Float>
    </group>
  );
};
