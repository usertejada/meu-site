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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <div className="absolute left-0 top-[10%] w-[600px] h-[600px] rounded-full bg-[hsl(263,90%,65%,0.20)] blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[hsl(217,91%,65%,0.15)] blur-[150px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(263 90% 65% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(263 90% 65% / 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.8rem] bg-[hsl(263,90%,65%,0.10)] border border-[hsl(263,90%,65%,0.25)] text-[hsl(263,90%,80%)] tracking-wide"
        >
          <Sparkles size={14} />
          Disponível para projetos
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} className="font-grotesk font-bold leading-[1.05]">
          <span className="block text-[clamp(3.5rem,9vw,5rem)] text-[var(--text)]">
            Olá, meu nome é
          </span>
          <span className="block text-[clamp(3.5rem,9vw,7rem)] gradient-text">
            Anderson Tejada
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} className="flex items-center gap-2 text-[var(--text-secondary)] text-[1rem]">
          <Terminal size={16} className="text-[var(--primary)]" />
          Desenvolvedor Full Stack &amp; Web Developer
        </motion.p>

        <motion.p {...fadeUp(0.4)} className="text-[clamp(1.1rem,2.5vw,1.35rem)] font-semibold text-[var(--text)]">
          &ldquo;Transformando ideias em{' '}
          <span className="gradient-text">sistemas reais</span>
          &rdquo;
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center gap-4 mt-2">
          <a
            href="#projetos"
            className="px-8 py-3.5 rounded-xl font-semibold text-[0.95rem] text-white no-underline bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)] shadow-[0_4px_30px_hsl(263,90%,65%,0.4)] hover:shadow-[0_6px_40px_hsl(263,90%,65%,0.6)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3.5 rounded-xl font-semibold text-[0.95rem] text-[var(--text)] no-underline border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.5)] hover:shadow-[0_4px_20px_hsl(263,90%,65%,0.1)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Entrar em Contato
          </a>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.9)}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          Role para baixo
        </span>
        <ArrowDown size={20} className="text-[var(--text-secondary)] animate-scrollBounce" />
      </motion.div>
    </section>
  )
}