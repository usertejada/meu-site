'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, CheckCircle, Mail } from 'lucide-react'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

const inputClass = `
  w-full px-4 py-3 rounded-xl text-[0.875rem] text-[var(--text)]
  bg-[var(--muted)] border border-[var(--border)]
  placeholder:text-[var(--text-secondary)]
  focus:outline-none focus:border-[hsl(263,90%,65%,0.6)]
  focus:shadow-[0_0_0_3px_hsl(263,90%,65%,0.1)]
  transition-all duration-200
`

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const texto = `Olá Anderson! 👋\n\nMeu nome é *${form.name}*\nE-mail: ${form.email}\n\n*Mensagem:*\n${form.message}`
    const url = `https://wa.me/5592994847151?text=${encodeURIComponent(texto)}`

    window.open(url, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="contato" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute left-[5%] bottom-[10%] w-[450px] h-[450px] rounded-full bg-[hsl(263,90%,65%,0.07)] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--primary)] font-semibold">
            Contato
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="font-grotesk font-bold text-[clamp(2rem,5vw,3rem)] text-[var(--text)] mb-4">
          Vamos <span className="gradient-text">trabalhar juntos</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-[var(--text-secondary)] text-[0.95rem] mb-14 max-w-md">
          Aberto a freela, projetos e oportunidades. Me manda uma mensagem!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="flex flex-col gap-6"
          >
            <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed">
              Estou aberto a freelas, projetos full-time e colaborações. 
              Se você tem um projeto em mente ou quer apenas bater um papo sobre tecnologia, 
              manda uma mensagem!
            </p>
            <a
              href="mailto:dnacody@gmail.com"
              className="flex items-center gap-4 px-5 py-4 rounded-xl no-underline bg-[hsl(240,10%,7%)] border border-[var(--border)] hover:border-[hsl(263,90%,65%,0.4)] hover:shadow-[0_4px_20px_hsl(263,90%,65%,0.08)] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[hsl(263,90%,65%,0.15)] shrink-0">
                <Mail size={16} className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-[0.7rem] uppercase tracking-widest text-[var(--text-secondary)] font-semibold mb-0.5">Email</p>
                <p className="text-[0.875rem] font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors duration-200">dnacody@gmail.com</p>
              </div>
            </a>

            <div className="flex flex-col gap-3">
              <p className="text-[0.75rem] uppercase tracking-widest text-[var(--text-secondary)] font-semibold">
                Redes sociais
              </p>
              <a href="https://wa.me/5592994847151" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-[0.875rem] text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_#22c55e40]" style={{ background: '#22c55e' }}>
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="https://www.facebook.com/anderson.tejadamacedo.5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-[0.875rem] text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_#1877f240]" style={{ background: '#1877f2' }}>
                <FaFacebook size={18} />
                Facebook
              </a>
              <a href="#" className="flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-[0.875rem] text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_#2563eb40]" style={{ background: '#0c2352' }}>
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className="p-6 rounded-2xl glow-border"
            style={{ background: 'hsl(240 10% 7% / 0.8)', backdropFilter: 'blur(12px)' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle size={48} className="text-[hsl(152,70%,50%)]" />
                <p className="font-grotesk font-bold text-[1.2rem] text-[var(--text)]">WhatsApp aberto!</p>
                <p className="text-[var(--text-secondary)] text-[0.875rem]">A mensagem já está pronta, é só enviar pelo WhatsApp.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-2 text-[0.8rem] text-[var(--primary)] underline underline-offset-2"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] text-[var(--text-secondary)] uppercase tracking-wide">Nome</label>
                  <input type="text" required placeholder="Seu nome" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] text-[var(--text-secondary)] uppercase tracking-wide">E-mail</label>
                  <input type="email" required placeholder="seu@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] text-[var(--text-secondary)] uppercase tracking-wide">Mensagem</label>
                  <textarea required rows={5} placeholder="Descreva seu projeto ou oportunidade..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={inputClass + ' resize-none'} />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[0.9rem] text-white bg-gradient-to-r from-[hsl(263,90%,60%)] to-[hsl(217,91%,55%)] shadow-[0_4px_30px_hsl(263,90%,65%,0.4)] hover:shadow-[0_6px_40px_hsl(263,90%,65%,0.6)] hover:-translate-y-0.5 transition-all duration-200">
                  <Send size={16} />
                  Enviar pelo WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}