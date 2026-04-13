'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

const testimonials = [
  {
    text: 'Contratei para fazer o site do meu estúdio e fiquei impressionada com o resultado. Super profissional, entregou antes do prazo e ainda me ensinou como mexer. Recomendo demais!',
    name: 'Ana Souza',
    role: 'Proprietária',
    company: 'Estúdio Floral',
    initials: 'AS',
    gradient: 'from-[hsl(330,85%,60%)] to-[hsl(350,80%,55%)]',
    border: 'hsl(330,85%,60%,0.4)',
  },
  {
    text: 'Desenvolvemos um sistema de gerenciamento de clientes juntos. A comunicação foi impecável do começo ao fim, o código é limpo e organizado. Com certeza vamos fechar mais projetos.',
    name: 'Carlos Mendes',
    role: 'CEO',
    company: 'Agência CM Digital',
    initials: 'CM',
    gradient: 'from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)]',
    border: 'hsl(263,90%,65%,0.4)',
  },
  {
    text: 'Precisava de um portfólio rápido e bem feito. Ficou incrível! Vários clientes já me elogiaram o site. Atendimento excelente e muito paciente nas explicações.',
    name: 'Fernanda Lima',
    role: 'Freelancer',
    company: 'Designer Gráfico',
    initials: 'FL',
    gradient: 'from-[hsl(217,91%,55%)] to-[hsl(190,90%,50%)]',
    border: 'hsl(217,91%,65%,0.4)',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute left-[10%] top-[20%] w-[450px] h-[450px] rounded-full bg-[hsl(263,90%,65%,0.06)] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--primary)] font-semibold">
            Depoimentos
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="font-grotesk font-bold text-[clamp(2rem,5vw,3rem)] text-[var(--text)] mb-4">
          O que dizem os <span className="gradient-text">clientes</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-[var(--text-secondary)] text-[0.95rem] mb-14 max-w-xl">
          Resultados reais de pessoas reais. Cada projeto começa com uma conversa — e termina com um cliente satisfeito.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              whileHover={{ y: -4, borderColor: 'hsl(263,90%,65%,0.4)' }}
              className="relative flex flex-col gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] transition-all duration-300 hover:shadow-[0_8px_30px_hsl(263,90%,65%,0.08)]"
            >
              {/* Quote decoration */}
              <span className="absolute top-5 right-5 font-serif text-[3rem] leading-none text-[hsl(263,90%,65%,0.15)] select-none font-bold">
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[var(--text-secondary)] text-[0.85rem] leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="h-px bg-[var(--border)]" />

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-grotesk font-bold text-[0.8rem] bg-gradient-to-br ${t.gradient} shrink-0`}
                  style={{ boxShadow: `0 0 0 2px ${t.border}` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-grotesk font-bold text-[0.875rem] text-[var(--text)]">{t.name}</p>
                  <p className="text-[0.72rem] text-[var(--text-secondary)]">{t.role} — {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}