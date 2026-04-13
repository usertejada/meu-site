'use client'

import { motion } from 'framer-motion'
import { Zap, Star, Building2, Check, CreditCard } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

const plans = [
  {
    icon: Zap,
    name: 'Landing Page',
    description: 'Ideal para freelancers, profissionais autônomos e pequenos negócios que precisam de presença online rápida.',
    price: 'A partir de R$ 800',
    sub: 'pagamento único',
    gradient: 'from-[hsl(217,91%,55%)] to-[hsl(190,90%,50%)]',
    accent: 'hsl(190,90%,50%)',
    accentMuted: 'hsl(190,90%,50%,0.12)',
    popular: false,
    features: [
      'Design moderno e responsivo',
      'Até 5 seções (hero, sobre, serviços, contato...)',
      'Formulário de contato funcional',
      'SEO básico configurado',
      'Entrega em até 10 dias',
      '1 rodada de revisões',
    ],
  },
  {
    icon: Star,
    name: 'Site / Sistema Web',
    description: 'Para empresas e projetos que precisam de mais funcionalidades, painel admin, autenticação e integrações.',
    price: 'A partir de R$ 2.500',
    sub: 'pagamento único ou parcelado',
    gradient: 'from-[hsl(263,90%,60%)] to-[hsl(330,85%,65%)]',
    accent: 'hsl(263,90%,65%)',
    accentMuted: 'hsl(263,90%,65%,0.12)',
    popular: true,
    features: [
      'Tudo do plano Landing Page',
      'Painel administrativo',
      'Autenticação de usuários',
      'Banco de dados e API própria',
      'Integrações (WhatsApp, pagamentos, etc.)',
      'Prazo acordado conforme escopo',
      '3 rodadas de revisões',
      'Entrega em até 30 dias',
      '30 dias de suporte pós-entrega',
    ],
  },
  {
    icon: Building2,
    name: 'Projeto Personalizado',
    description: 'Para projetos complexos, sistemas sob medida, e-commerce, SaaS ou contratos de desenvolvimento contínuo.',
    price: 'Sob consulta',
    sub: 'orçamento detalhado',
    gradient: 'from-[hsl(152,70%,45%)] to-[hsl(173,80%,40%)]',
    accent: 'hsl(152,70%,50%)',
    accentMuted: 'hsl(152,70%,50%,0.12)',
    popular: false,
    features: [
      'Escopo 100% personalizado',
      'Arquitetura planejada do zero',
      'Time dedicado conforme necessidade',
      'Suporte e manutenção contínua',
      'Contrato e NDA disponíveis',
      'Prazo acordado conforme projeto',
      'Reuniões de acompanhamento',
    ],
  },
]

export default function PricingSection() {
  return (
    <section id="precos" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute right-[5%] top-[20%] w-[500px] h-[500px] rounded-full bg-[hsl(263,90%,65%,0.06)] blur-[140px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(190,90%,50%,0.05)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--primary)] font-semibold">
            Investimento
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="font-grotesk font-bold text-[clamp(2rem,5vw,3rem)] text-[var(--text)] mb-4">
          Transparência <span className="gradient-text">desde o início</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-[var(--text-secondary)] text-[0.95rem] mb-14 max-w-xl">
          Sem surpresas. Esses são os valores de referência — cada projeto é único e o preço final depende do escopo, prazo e complexidade.{' '}
          <a href="#contato" className="text-[var(--text)] font-semibold underline underline-offset-2">
            Entre em contato para um orçamento gratuito.
          </a>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-[hsl(263,90%,65%,0.6)] shadow-[0_0_40px_hsl(263,90%,65%,0.15)]'
                  : 'border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.3)]'
              } bg-[var(--card)]`}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(263,90%,65%)] to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(330,85%,65%)] text-white">
                    Mais popular
                  </div>
                </>
              )}

              <div className="h-32 flex items-center justify-center" style={{ background: plan.accentMuted }}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${plan.gradient} shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}>
                  <plan.icon size={26} color="#fff" strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6 flex-1">
                <div>
                  <h3 className="font-grotesk font-bold text-[1.1rem] text-[var(--text)] mb-1">{plan.name}</h3>
                  <p className="text-[var(--text-secondary)] text-[0.8rem] leading-relaxed">{plan.description}</p>
                </div>

                <div>
                  <p className={`font-grotesk font-bold text-[1.5rem] bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </p>
                  <p className="text-[var(--text-secondary)] text-[0.72rem] mt-0.5">{plan.sub}</p>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.82rem] text-[var(--text-secondary)]">
                      <Check size={14} className="text-[var(--primary)] mt-0.5 shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className={`mt-2 flex items-center justify-center py-3 rounded-xl font-semibold text-[0.875rem] no-underline transition-all duration-200 ${
                    plan.popular
                      ? 'text-white bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(330,85%,65%)] shadow-[0_4px_20px_hsl(263,90%,65%,0.4)] hover:shadow-[0_6px_30px_hsl(263,90%,65%,0.6)]'
                      : 'text-[var(--text)] border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.5)] hover:text-[var(--primary)]'
                  }`}
                >
                  Solicitar Orçamento
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-10 flex items-center justify-center gap-2 text-[0.8rem] text-[var(--text-secondary)]">
          <CreditCard size={15} className="text-[var(--primary)]" />
          <span>Pagamento via PIX, transferência ou cartão. Parcelamento disponível para projetos acima de R$ 1.500.</span>
        </motion.div>
      </div>
    </section>
  )
}