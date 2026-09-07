import React, { useState } from 'react';
import { X, CheckCircle, Clock, ShieldCheck, Users, Calendar, BarChart3, Award, Sparkles, Filter } from 'lucide-react';
import { KFCLogo, REDLogo } from './KFCBrandElements';
import { sounds } from '../audio/SoundManager';

export const InteractiveModuleModal = ({ isOpen, onClose, initialTab = 'talent' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // State for simulated interactive actions
  const [simulatedCertifications, setSimulatedCertifications] = useState([
    { id: 1, name: 'Camilo Torres', role: 'Cocinero Pro', store: 'KFC Calle 100 (Bogotá)', step: 4, totalSteps: 4, certified: true },
    { id: 2, name: 'María Paula Ríos', role: 'Servicio & Caja', store: 'KFC Poblado (Medellín)', step: 2, totalSteps: 3, certified: false },
    { id: 3, name: 'Julián Salcedo', role: 'Banca a Subgerente', store: 'KFC Jardín Plaza (Cali)', step: 3, totalSteps: 4, certified: false },
    { id: 4, name: 'Tatiana Osorio', role: 'Manipulación Alimentos', store: 'KFC Bocagrande (Cartagena)', step: 3, totalSteps: 3, certified: true },
  ]);

  if (!isOpen) return null;

  const handleToggleCert = (id) => {
    sounds.playClick();
    setSimulatedCertifications(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.certified;
          return {
            ...item,
            certified: nextState,
            step: nextState ? item.totalSteps : item.step - 1
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fadeIn pointer-events-auto">
      <div className="bg-[#141418] border border-white/15 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-4">
            <KFCLogo className="h-7 w-auto" />
            <div className="h-5 w-px bg-white/20" />
            <REDLogo className="h-7 w-auto" />
            <span className="hidden md:inline-block text-xs font-bold uppercase tracking-widest text-kfc-red bg-kfc-red/10 px-3 py-1 rounded-full border border-kfc-red/30">
              Demo Interactivo R.E.D.
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#18181F] overflow-x-auto">
          {[
            { id: 'talent', label: '1. Curvas & Certificación', icon: Award },
            { id: 'schedule', label: '2. Horarios Especialistas', icon: Calendar },
            { id: 'analytics', label: '3. Inteligencia & KPIs', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-kfc-red text-white bg-kfc-red/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-kfc-red' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'talent' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#1E1E26] p-4 rounded-xl border border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-kfc-red" />
                    Simulador de Avance de Curvas en Restaurante
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Haz clic en el botón de estado para simular la firma de aprobación y expedición digital de carnet.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold bg-kfc-red/20 text-kfc-red px-3 py-1.5 rounded-lg border border-kfc-red/30">
                  <Sparkles className="w-4 h-4" /> 100% Inmutable y Trazable
                </div>
              </div>

              {/* Simulated Records Table */}
              <div className="space-y-3">
                {simulatedCertifications.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#1A1A22] border border-white/10 hover:border-kfc-red/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">{item.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300 font-medium">
                          {item.role}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">{item.store}</div>

                      {/* Progress bar */}
                      <div className="w-full max-w-xs mt-2 flex items-center gap-3">
                        <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              item.certified ? 'bg-green-500' : 'bg-kfc-red'
                            }`}
                            style={{ width: `${(item.step / item.totalSteps) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-gray-400">
                          {item.step}/{item.totalSteps} Etapas
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleCert(item.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
                        item.certified
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30'
                          : 'bg-kfc-red hover:bg-kfc-redLight text-white shadow-[0_0_15px_rgba(228,0,43,0.4)]'
                      }`}
                    >
                      {item.certified ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Certificado Digital Emitido
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" /> Aprobar Evaluación
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="bg-[#1E1E26] p-4 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-kfc-red" />
                  Malla de Especialistas y Visitas Regionales
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Distribución inteligente de especialistas de entrenamiento para garantizar cobertura en 170+ tiendas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { region: 'Bogotá Norte & Centro', specialist: 'Lorena Cárdenas', stores: '24 Tiendas', visits: '12 Programadas', status: 'En Ruta' },
                  { region: 'Medellín & Valle de Aburrá', specialist: 'Felipe Henao', stores: '18 Tiendas', visits: '8 Programadas', status: 'En Ruta' },
                  { region: 'Cali & Eje Cafetero', specialist: 'Natalia Varela', stores: '21 Tiendas', visits: '14 Programadas', status: 'Completado' },
                  { region: 'Barranquilla & Cartagena', specialist: 'Carlos Mendoza', stores: '16 Tiendas', visits: '9 Programadas', status: 'En Ruta' },
                  { region: 'Santanderes & Cúcuta', specialist: 'Andrea Bautista', stores: '11 Tiendas', visits: '6 Programadas', status: 'Planificado' },
                  { region: 'Tolima & Huila', specialist: 'Guillermo Pinzón', stores: '9 Tiendas', visits: '5 Programadas', status: 'Planificado' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1A1A22] border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white text-sm">{item.region}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-kfc-red/20 text-kfc-red border border-kfc-red/30">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Especialista:</span> <span className="font-semibold">{item.specialist}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 border-t border-white/5 pt-2 font-mono">
                      <span>{item.stores}</span>
                      <span className="text-kfc-red">{item.visits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-[#1E1E26] p-4 rounded-xl border border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-kfc-red" />
                  Tablero de Control y Satisfacción Operativa
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Métricas agregadas en tiempo real para gerencia de operaciones y entrenamiento KFC.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Eficacia de Certificación', val: '97.2%', change: '+12.4% vs 2023' },
                  { label: 'Tiempo Promedio de Curva', val: '18 Días', change: '-40% optimizado' },
                  { label: 'Carnets de Sanidad al Día', val: '99.8%', change: 'Cero sanciones' },
                  { label: 'NPS de Formación', val: '+89', change: 'Top Tier KFC Global' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1A1A22] border border-white/10">
                    <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                    <div className="text-2xl font-black text-white mt-1 font-heading text-kfc-red">
                      {stat.val}
                    </div>
                    <div className="text-[11px] text-green-400 font-semibold mt-1">{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex justify-between items-center text-xs text-gray-400">
          <div>R.E.D. KFC Colombia • Sistema Corporativo Oficial</div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-kfc-red hover:bg-kfc-redLight text-white font-bold rounded-lg transition-colors"
          >
            Continuar la Historia
          </button>
        </div>
      </div>
    </div>
  );
};
