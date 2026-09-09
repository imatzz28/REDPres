import React from 'react';
import {
  ChevronDown,
  AlertTriangle,
  ShieldCheck,
  Award,
  Calendar,
  BarChart3,
  Sparkles,
  Lock,
  FileSpreadsheet,
  Cpu,
  Quote,
  GraduationCap,
  Users,
  Clock,
  UserCheck,
  Activity,
  CheckCircle,
  BookOpen,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { MetricCounter } from '../ui/MetricCounter';
import { sounds } from '../audio/SoundManager';
import confetti from 'canvas-confetti';

export const SectionOverlay = ({ section, index, isActive = false }) => {
  const triggerConfetti = () => {
    sounds.playChime();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E4002B', '#FFFFFF', '#E4002B']
    });
  };

  const badgeClass = isActive ? 'anim-badge-in' : 'anim-element-out';
  const titleClass = isActive ? 'anim-title-in' : 'anim-element-out';
  const descClass = isActive ? 'anim-desc-in' : 'anim-element-out';
  const getCardClass = (idx) => (isActive ? `anim-card-${Math.min(idx, 3)}` : 'anim-element-out');

  return (
    <section
      id={`section-${index}`}
      className="min-h-screen w-full flex items-center justify-center relative p-6 sm:p-10 md:p-14 lg:p-20 overflow-hidden"
    >
      <div
        className={`max-w-6xl w-full mx-auto z-10 transition-[opacity,transform] duration-800 ease-out will-change-[opacity,transform] ${
          isActive
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-3 scale-[0.99] pointer-events-none'
        }`}
      >
        {/* Section 01: PORTADA */}
        {index === 0 && (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-5xl mx-auto py-10">
            <div className={`flex items-center justify-center gap-3 ${badgeClass}`}>
              <span className="text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-white bg-kfc-red/90 px-6 py-2 rounded-full border border-kfc-red shadow-2xl text-contrast-subtle">
                {section.badge}
              </span>
            </div>

            <h1 className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
              R.E.D.
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-sans normal-case mt-4 tracking-normal text-contrast-title">
                Ruta de Entrenamiento y Desempeño
              </span>
            </h1>

            <p className={`text-xl sm:text-2xl md:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed text-contrast-body ${descClass}`}>
              {section.subtitle}
            </p>

            <div className={`pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 ${getCardClass(0)}`}>
              <a
                href="#section-1"
                onClick={() => sounds.playClick()}
                className="px-10 py-5 bg-kfc-red hover:bg-kfc-redLight text-white font-black text-base uppercase tracking-wider rounded-full shadow-[0_4px_30px_rgba(228,0,43,0.8)] hover:scale-105 transition-all flex items-center gap-3 text-contrast-subtle cursor-pointer"
              >
                Comenzar Recorrido
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>

            <div className={`pt-8 flex flex-col items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 text-contrast-subtle ${getCardClass(1)}`}>
              <span>Desliza para continuar</span>
              <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 bg-black/30 backdrop-blur-sm">
                <div className="w-1.5 h-3 bg-kfc-red rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* Section 02: CONTEXTO — ASÍ TRABAJÁBAMOS ANTES */}
        {index === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-7">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <FileSpreadsheet className="w-4 h-4 text-kfc-red" />
                <span>{section.category}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed font-normal text-contrast-body ${descClass}`}>
                {section.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {section.bullets?.map((b, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl bg-black/80 border border-white/20 flex items-center gap-4 backdrop-blur-xl shadow-lg card-hover-interactive ${getCardClass(i)}`}
                  >
                    <AlertTriangle className="w-6 h-6 text-kfc-red flex-shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-white text-contrast-body">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              {section.highlightStat && (
                <div className={`p-8 sm:p-10 rounded-3xl bg-black/85 border border-kfc-red/50 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.7)] text-center w-full max-w-md card-hover-interactive ${getCardClass(2)}`}>
                  <MetricCounter
                    value={section.highlightStat.value}
                    label={section.highlightStat.label}
                    sublabel={section.highlightStat.sublabel}
                    isVisible={isActive}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 03: EL PROBLEMA DE FONDO */}
        {index === 2 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-kfc-red border border-kfc-red/40 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
              <AlertTriangle className="w-4 h-4" />
              <span className="text-white">{section.badge}</span>
            </div>

            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
              {section.title}
            </h2>

            <p className={`text-lg sm:text-2xl text-white/95 leading-relaxed font-medium text-contrast-body ${descClass}`}>
              {section.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {section.points?.map((point, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-3 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <h3 className="font-bold text-white text-lg sm:text-xl text-contrast-title">{point.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed text-contrast-body">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 04: EL NACIMIENTO DE LA IDEA */}
        {index === 3 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
              <Sparkles className="w-4 h-4 text-kfc-red" />
              <span>{section.badge}</span>
            </div>

            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
              {section.title}
            </h2>

            <p className={`text-lg sm:text-2xl text-white/95 leading-relaxed font-medium text-contrast-body ${descClass}`}>
              {section.description}
            </p>

            {section.quote && (
              <div className={`p-8 rounded-3xl bg-black/85 border border-kfc-red/40 backdrop-blur-xl shadow-2xl space-y-3 card-hover-interactive ${getCardClass(0)}`}>
                <Quote className="w-8 h-8 text-kfc-red opacity-90" />
                <div className="text-xl sm:text-2xl font-bold text-white text-contrast-title leading-snug">
                  {section.quote}
                </div>
                {section.author && (
                  <div className="text-sm font-bold text-kfc-red uppercase tracking-widest text-contrast-subtle pt-2">
                    {section.author}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Section 05: POR QUÉ R.E.D. */}
        {index === 4 && (
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold uppercase tracking-widest text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
              <span>{section.badge}</span>
            </div>

            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
              {section.title}
            </h2>

            <p className={`text-lg sm:text-2xl text-white/95 font-medium max-w-3xl mx-auto leading-relaxed text-contrast-body ${descClass}`}>
              {section.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              {section.pillars?.map((pillar, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-4 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <div className="text-2xl font-black text-kfc-red font-heading">{`0${i + 1}`}</div>
                  <h3 className="font-bold text-white text-xl text-contrast-title">{pillar.name}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed text-contrast-body">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 06: EL DESARROLLO — CONSTRUYENDO R.E.D. */}
        {index === 5 && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <Cpu className="w-4 h-4 text-kfc-red" />
                <span>{section.badge}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {section.milestones?.map((m, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-3 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <div className="text-sm font-mono text-kfc-red font-bold">{m.step}</div>
                  <h3 className="font-bold text-white text-base sm:text-lg text-contrast-title">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed text-contrast-body">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 07: UNA HERRAMIENTA HECHA POR QUIENES LA VIVEN */}
        {index === 6 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <Lock className="w-4 h-4 text-kfc-red" />
                <span>{section.badge}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {section.complianceItems?.map((item, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 flex flex-col gap-4 backdrop-blur-xl shadow-xl card-hover-interactive justify-between ${getCardClass(i)}`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-kfc-red/15 border border-kfc-red/30 flex items-center justify-center">
                      {i === 0 && <Users className="w-6 h-6 text-kfc-red" />}
                      {i === 1 && <Sparkles className="w-6 h-6 text-kfc-red" />}
                      {i === 2 && <ShieldCheck className="w-6 h-6 text-kfc-red" />}
                    </div>
                    <h3 className="font-bold text-white text-lg sm:text-xl text-contrast-title">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed text-contrast-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 08: R.E.D. — EL PRODUCTO FINAL */}
        {index === 7 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <Sparkles className="w-4 h-4 text-kfc-red" />
                <span>{section.badge}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-2xl text-white/95 font-medium leading-relaxed max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {section.featuresOverview?.map((f, i) => (
                <div
                  key={i}
                  className={`p-6 sm:p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-2 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <div className="text-3xl sm:text-4xl font-black text-kfc-red font-heading">{f.value}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-200 uppercase text-contrast-subtle">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 09: CERTIFICACIÓN Y GESTIÓN DE TALENTO */}
        {index === 8 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <Award className="w-4 h-4 text-kfc-red" />
                <span>{section.category}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed font-normal max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {section.items?.map((item, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-4 shadow-xl card-hover-interactive flex flex-col justify-between ${getCardClass(i)}`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-kfc-red/15 border border-kfc-red/30 flex items-center justify-center">
                      {i === 0 && <GraduationCap className="w-6 h-6 text-kfc-red" />}
                      {i === 1 && <Users className="w-6 h-6 text-kfc-red" />}
                      {i === 2 && <ShieldCheck className="w-6 h-6 text-kfc-red" />}
                    </div>
                    <h3 className="font-bold text-white text-lg sm:text-xl text-contrast-title">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed text-contrast-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 10: PLANIFICACIÓN Y GENTE */}
        {index === 9 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <Calendar className="w-4 h-4 text-kfc-red" />
                <span>{section.category}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {section.items?.map((item, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-4 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg sm:text-xl text-contrast-title">{item.title}</h3>
                    <div className="w-12 h-12 rounded-2xl bg-kfc-red/15 border border-kfc-red/30 flex items-center justify-center flex-shrink-0">
                      {i === 0 && <Clock className="w-6 h-6 text-kfc-red" />}
                      {i === 1 && <UserCheck className="w-6 h-6 text-kfc-red" />}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed text-contrast-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 11: INTELIGENCIA Y TOMA DE DECISIONES */}
        {index === 10 && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <BarChart3 className="w-4 h-4 text-kfc-red" />
                <span>{section.category}</span>
              </div>

              <h2 className={`text-4xl sm:text-6xl font-black text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
                {section.title}
              </h2>

              <p className={`text-lg sm:text-xl text-white/95 leading-relaxed max-w-3xl text-contrast-body ${descClass}`}>
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {section.items?.map((item, i) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-4 shadow-xl card-hover-interactive ${getCardClass(i)}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg sm:text-xl text-contrast-title">{item.title}</h3>
                    <div className="w-12 h-12 rounded-2xl bg-kfc-red/15 border border-kfc-red/30 flex items-center justify-center flex-shrink-0">
                      {i === 0 && <BarChart3 className="w-6 h-6 text-kfc-red" />}
                      {i === 1 && <Activity className="w-6 h-6 text-kfc-red" />}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed text-contrast-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 12: CULTURA & PLAN DE CARRERA */}
        {index === 11 && (
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* Header: Badge, Title & Subtitle OUTSIDE the panels with shadows and white text */}
            <div className="space-y-3">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 text-xs sm:text-sm font-bold text-white border border-white/20 backdrop-blur-md shadow-md text-contrast-subtle ${badgeClass}`}>
                <GraduationCap className="w-4 h-4 text-kfc-red" />
                <span>{section.category}</span>
              </div>

              <div className="space-y-1.5">
                <h2 className={`text-3xl sm:text-5xl font-black text-white uppercase font-heading leading-tight text-contrast-title drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] ${titleClass}`}>
                  {section.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium text-white/95 text-contrast-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Content Grid: 2 Symmetrical Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Panel: Formación y Desarrollo Interno */}
              <div className={`lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-black/90 border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-5 ${getCardClass(0)}`}>
                {/* Header matching the right panel */}
                <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                  <BookOpen className="w-6 h-6 text-kfc-red flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white text-contrast-title">
                    Formación y Desarrollo Interno
                  </h3>
                </div>

                {/* 3 Numbered Points with WHITE number badges */}
                <div className="space-y-3.5 my-auto">
                  {section.highlightPoints?.map((text, i) => (
                    <div
                      key={i}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-start gap-3.5"
                    >
                      {/* White Number Badge */}
                      <div className="w-7 h-7 rounded-full bg-white text-black font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                        <span className="text-xs font-black">{i + 1}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal text-contrast-body">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel: Plan de Carrera Interno (Clean, sin subtítulo, sin badge ascensos, sin nota inferior) */}
              <div className={`lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-black/90 border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-5 ${getCardClass(1)}`}>
                {/* Header matching the left panel */}
                <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                  <Award className="w-6 h-6 text-kfc-red flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white text-contrast-title">
                    Plan de Carrera Interno
                  </h3>
                </div>

                {/* 3 Clean Horizontal Progression Rows */}
                <div className="space-y-3.5 my-auto">
                  {section.careerSteps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-kfc-red/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      {/* Current Position */}
                      <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 text-xs sm:text-sm font-bold text-gray-200 border border-white/10 text-center sm:text-left">
                        {step.from}
                      </div>

                      {/* Arrow Divider */}
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-kfc-red/15 border border-kfc-red/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-4 h-4 text-kfc-red" />
                        </div>
                      </div>

                      {/* Promoted Position */}
                      <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#E4002B] text-xs sm:text-sm font-black text-white shadow-[0_0_15px_rgba(228,0,43,0.35)] text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                        <Award className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
                        <span>{step.to}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 13: CIERRE FINAL */}
        {index === 12 && (
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 py-10">
            <div className={`flex items-center justify-center gap-3 ${badgeClass}`}>
              <span className="text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-white bg-kfc-red/90 px-6 py-2 rounded-full border border-kfc-red shadow-2xl text-contrast-subtle">
                {section.badge || 'KFC COLOMBIA'}
              </span>
            </div>

            <h2 className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white uppercase font-heading leading-tight text-contrast-title ${titleClass}`}>
              R.E.D.
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-sans normal-case mt-4 tracking-normal text-contrast-title">
                Ruta de Entrenamiento y Desempeño
              </span>
            </h2>

            <p className={`text-xl sm:text-2xl md:text-3xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed text-contrast-body ${descClass}`}>
              {section.closingSub || 'Construyendo el futuro del Departamento de Entrenamiento de KFC.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
