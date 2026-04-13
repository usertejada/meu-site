'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

const projects = [
  {
    name: 'Campeonato',
    description: 'Sistema completo de gerenciamento de campeonatos esportivos. Cadastro de times, tabela de jogos, classificação e resultados em tempo real.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)]',
    accent: 'hsl(263,90%,65%)',
    accentMuted: 'hsl(263,90%,65%,0.15)',
    demo: 'https://novo-alpha.vercel.app/', code: '#',
    comingSoon: false,
  },
  {
    name: 'Ótica Remoto',
    description: 'Site profissional para ótica com catálogo de produtos, informações de serviços e contato. Design moderno e responsivo.',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-[hsl(217,91%,55%)] to-[hsl(190,90%,50%)]',
    accent: 'hsl(217,91%,65%)',
    accentMuted: 'hsl(217,91%,65%,0.15)',
    demo: 'https://otica-connect.vercel.app/', code: '#',
    comingSoon: false,
  },
  {
    name: 'E-commerce',
    description: 'Em breve: sistema completo de e-commerce com carrinho, pagamentos, painel administrativo e gestão de estoque em tempo real.',
    stack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    gradient: 'from-[hsl(38,90%,55%)] to-[hsl(45,95%,50%)]',
    accent: 'hsl(38,90%,60%)',
    accentMuted: 'hsl(38,90%,60%,0.15)',
    demo: '#', code: '#',
    comingSoon: true,
  },
  {
    name: 'Landing — Advogado',
    description: 'Landing page profissional para clínicas e consultórios médicos. Agendamento online, apresentação de especialidades e depoimentos de pacientes.',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-[hsl(190,90%,45%)] to-[hsl(210,85%,50%)]',
    accent: 'hsl(190,90%,50%)',
    accentMuted: 'hsl(190,90%,50%,0.15)',
    demo: '#', code: '#',
    comingSoon: true,
  },
  {
    name: 'Site — Médico',
    description: 'Landing page elegante para escritórios de advocacia. Áreas de atuação, equipe, formulário de contato e credibilidade jurídica.',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-[hsl(330,85%,65%)] to-[hsl(350,80%,60%)]',
    accent: 'hsl(330,85%,68%)',
    accentMuted: 'hsl(330,85%,68%,0.15)',
    demo: '#', code: '#',
    comingSoon: true,
  },
  {
    name: 'Site — Academia',
    description: 'Landing page dinâmica para academias e personal trainers. Planos, galeria, horários de aulas e captação de leads para matrículas.',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    gradient: 'from-[hsl(152,70%,45%)] to-[hsl(173,80%,40%)]',
    accent: 'hsl(152,70%,50%)',
    accentMuted: 'hsl(152,70%,50%,0.15)',
    demo: '#', code: '#',
    comingSoon: true,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projetos" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute left-[10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(217,91%,60%,0.07)] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--primary)] font-semibold">
            Projetos
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="font-grotesk font-bold text-[clamp(2rem,5vw,3rem)] text-[var(--text)] mb-4">
          Trabalhos <span className="gradient-text">em destaque</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-[var(--text-secondary)] text-[0.95rem] mb-14 max-w-xl">
          Projetos reais construídos do zero — do design à produção.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const }}
              whileHover={{ y: project.comingSoon ? 0 : -6 }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--card)] border transition-all duration-300 cursor-pointer ${
                project.comingSoon
                  ? 'border-dashed border-[var(--border)] opacity-70'
                  : 'border-[var(--border)] hover:border-[hsl(263,90%,65%,0.4)] hover:shadow-[0_8px_30px_hsl(263,90%,65%,0.1)]'
              }`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} ${project.comingSoon ? 'opacity-40' : ''}`} />
              <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: project.accentMuted }}>
                <span className="font-grotesk font-bold text-[2.0rem] opacity-20 select-none" style={{ color: project.accent }}>
                  {project.name}
                </span>
                {project.comingSoon ? (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest border" style={{ color: project.accent, borderColor: project.accent, background: project.accentMuted }}>
                    Em Breve
                  </span>
                ) : (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }} />
                )}
              </div>

              <div className="flex flex-col gap-3 p-5 flex-1">
                <h3 className="font-grotesk font-bold text-[1.05rem] text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-200">
                  {project.name}
                </h3>
                <p className="text-[var(--text-secondary)] text-[0.82rem] leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-[0.7rem] font-medium bg-[var(--muted)] text-[var(--text-secondary)] border border-[var(--border)]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  {project.comingSoon ? (
                    <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.78rem] font-semibold text-[var(--text-secondary)] border border-dashed border-[var(--border)] select-none">
                      Em desenvolvimento...
                    </span>
                  ) : (
                    <>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.78rem] font-semibold text-white no-underline bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)] hover:shadow-[0_4px_20px_hsl(263,90%,65%,0.4)] transition-all duration-200">
                        <ExternalLink size={13} />
                        Ver Demo
                      </a>
                      <a href={project.code} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[0.78rem] font-semibold text-[var(--text)] no-underline border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.5)] hover:shadow-[0_4px_15px_hsl(263,90%,65%,0.1)] transition-all duration-200">
                        <FaGithub size={13} />
                        Ver Código
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}