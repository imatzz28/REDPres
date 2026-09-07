import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { SECTIONS } from './data/sectionsData';
import { SceneContainer } from './components/3d/SceneContainer';
import { SectionOverlay } from './components/scrolly/SectionOverlay';
import { Header } from './components/ui/Header';
import { ProgressBar } from './components/ui/ProgressBar';
import { NavigationDots } from './components/ui/NavigationDots';
import { sounds } from './components/audio/SoundManager';

export function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prevSectionRef = useRef(0);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Inertial Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Monitor scroll position efficiently without choking React re-renders
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollY / docHeight : 0;
          setScrollProgress(progress);

          const viewportMiddle = scrollY + window.innerHeight / 2;
          const sectionElements = SECTIONS.map((_, i) =>
            document.getElementById(`section-${i}`)
          );

          let currentIdx = 0;
          for (let idx = 0; idx < sectionElements.length; idx++) {
            const el = sectionElements[idx];
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (viewportMiddle >= top && viewportMiddle < top + height) {
                currentIdx = idx;
                break;
              }
            }
          }

          if (currentIdx !== prevSectionRef.current) {
            prevSectionRef.current = currentIdx;
            sounds.playWhoosh();
            setActiveSection(currentIdx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (idx) => {
    const targetIdx = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    const el = document.getElementById(`section-${targetIdx}`);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation for arrow keys and spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        sounds.playClick();
        scrollToSection(prevSectionRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        sounds.playClick();
        scrollToSection(prevSectionRef.current - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#111111] text-white select-none">
      {/* 3D Background Canvas (Three.js / React Three Fiber) */}
      <SceneContainer activeSection={activeSection} scrollProgress={scrollProgress} />

      {/* Cinematic Vignette Overlay to frame content with contrast */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      {/* Top Header & Sound Toggle */}
      <Header />

      {/* Progress Bar & Chapter Indicator */}
      <ProgressBar
        progress={scrollProgress}
        currentChapter={activeSection + 1}
        totalChapters={SECTIONS.length}
      />

      {/* Lateral Chapter Navigation Dots */}
      <NavigationDots
        activeIndex={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Scrollytelling Sections Overlay */}
      <main className="relative z-10">
        {SECTIONS.map((section, idx) => (
          <SectionOverlay
            key={section.id}
            section={section}
            index={idx}
            isActive={idx === activeSection}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
