'use client'

import { motion } from 'framer-motion'
import { Sparkles, Terminal, ArrowDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden
                 pt-24 pb-28 md:pt-0 md:pb-0"> {/* pt-24 garante espaço abaixo da navbar em mobile; pb-28 garante que o scroll hint não sobreponha os botões */}
      {/* Glow blobs */}
      <div className="absolute left-0 top-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[hsl(263,90%,65%,0.20)] blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[hsl(217,91%,65%,0.15)] blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(263 90% 65% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(263 90% 65% / 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 md:gap-6">

        {/* Badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full
                     text-[0.75rem] md:text-[0.8rem]
                     bg-[hsl(263,90%,65%,0.10)] border border-[hsl(263,90%,65%,0.25)]
                     text-[hsl(263,90%,80%)] tracking-wide"
        >
          <Sparkles size={13} />
          Disponível para projetos
        </motion.div>

        {/* Heading */}
        <motion.h1 {...fadeUp(0.2)} className="font-grotesk font-bold leading-[1.05]">
          <span
            className="block text-[var(--text)]"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            Olá, meu nome é
          </span>
          <span
            className="block gradient-text"
            style={{ fontSize: 'clamp(2.4rem, 9vw, 7rem)' }}
          >
            Anderson Tejada
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.3)}
          className="flex items-center gap-2 text-[var(--text-secondary)]"
          style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}
        >
          <Terminal size={14} className="text-[var(--primary)] shrink-0" />
          Desenvolvedor Full Stack &amp; Web Developer
        </motion.p>

        {/* Quote */}
        <motion.p
          {...fadeUp(0.4)}
          className="font-semibold text-[var(--text)]"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.35rem)' }}
        >
          &ldquo;Transformando ideias em{' '}
          <span className="gradient-text">sistemas reais</span>
          &rdquo;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col sm:flex-row justify-center gap-3 mt-2 w-full max-w-xs sm:max-w-none"
        >
          <a
            href="#projetos"
            className="px-7 py-3 rounded-xl font-semibold text-[0.9rem] text-white no-underline
                       bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)]
                       shadow-[0_4px_30px_hsl(263,90%,65%,0.4)]
                       hover:shadow-[0_6px_40px_hsl(263,90%,65%,0.6)]
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-7 py-3 rounded-xl font-semibold text-[0.9rem] text-[var(--text)] no-underline
                       border border-[var(--border)]
                       hover:border-[hsl(263,90%,65%,0.5)]
                       hover:shadow-[0_4px_20px_hsl(263,90%,65%,0.1)]
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            Entrar em Contato
          </a>
        </motion.div>
      </div>

      {/* Scroll hint — posição absoluta com bottom maior para não sobrepor botões */}
      <motion.div
        {...fadeUp(0.9)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          Role para baixo
        </span>
        <ArrowDown size={16} className="text-[var(--text-secondary)] animate-scrollBounce" />
      </motion.div>
    </section>
  )
}