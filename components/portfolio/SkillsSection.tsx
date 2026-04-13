'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

const skills = [
  { name: 'React / Next.js',  level: 92 },
  { name: 'TypeScript',       level: 85 },
  { name: 'Node.js',          level: 88 },
  { name: 'PostgreSQL',       level: 78 },
  { name: 'Python',           level: 72 },
  { name: 'Docker',           level: 68 },
  { name: 'Tailwind CSS',     level: 95 },
  { name: 'REST APIs',        level: 90 },
]

const tools = [
  { emoji: '⚡', name: 'VS Code' },
  { emoji: '🐙', name: 'GitHub' },
  { emoji: '🐳', name: 'Docker' },
  { emoji: '🗃️', name: 'Postgres' },
  { emoji: '🍃', name: 'MongoDB' },
  { emoji: '🔴', name: 'Redis' },
  { emoji: '▲',  name: 'Vercel' },
  { emoji: '☁️', name: 'AWS' },
  { emoji: '🎨', name: 'Figma' },
  { emoji: '📦', name: 'Prisma' },
  { emoji: '🔧', name: 'Postman' },
  { emoji: '🧪', name: 'Jest' },
]

const marqueeItems = Array(8).fill('React · Next.js · Node.js · TypeScript · PostgreSQL · Docker ·').join(' ')

export default function SkillsSection() {
  return (
    <section id="habilidades" className="relative py-24 px-6 overflow-hidden" style={{ background: 'hsl(240 10% 7% / 0.3)' }}>
      <div className="absolute right-[5%] top-[20%] w-[400px] h-[400px] rounded-full bg-[hsl(263,90%,65%,0.06)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--primary)] font-semibold">
            Habilidades
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="font-grotesk font-bold text-[clamp(2rem,5vw,3rem)] text-[var(--text)] mb-14">
          Stack &amp; <span className="gradient-text">Ferramentas</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' as const }}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[0.875rem] font-medium text-[var(--text)]">{skill.name}</span>
                  <span className="text-[0.75rem] text-[var(--text-secondary)]">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--muted)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: i * 0.07 }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, hsl(263,90%,60%), hsl(217,91%,55%))',
                      boxShadow: '0 0 8px hsl(263 90% 65% / 0.4)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
          >
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5 font-semibold">
              Ferramentas do dia a dia
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.04, ease: 'easeOut' as const }}
                  className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.3)] hover:shadow-[0_0_16px_hsl(263,90%,65%,0.07)] transition-all duration-200 cursor-default"
                >
                  <span className="text-[1.4rem]">{tool.emoji}</span>
                  <span className="text-[0.7rem] text-[var(--text-secondary)]">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 overflow-hidden border-y border-[var(--border)] py-4">
          <div
            className="whitespace-nowrap animate-marquee text-[0.8rem] tracking-widest uppercase font-medium"
            style={{ color: 'hsl(240 5% 55% / 0.4)' }}
          >
            {marqueeItems}
          </div>
        </div>
      </div>
    </section>
  )
}