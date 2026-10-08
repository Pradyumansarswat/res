import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Timer,
} from 'lucide-react'
import PageHero from '../components/templates/PageHero'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { Marquee } from '../components/molecules/Marquee'
import { StatsBand } from '../components/ui'
import { CTAButtons } from '../components/molecules/CTAButtons'
import { Accordion } from './Services'
import { faqs, services, site } from '../lib/site'
import { useRefreshScrollTriggers, useStaggerReveal } from '../lib/anim'
import SEO from '../components/SEO'
import { pageSEO } from '../config/seo'
import { SITE_URL, siteProfile } from '../config/site'

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

export function ContactPage() {
  useRefreshScrollTriggers([])
  const cardsRef = useStaggerReveal<HTMLDivElement>('top 88%', 36)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0].title,
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = (): Errors => {
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 8)
      next.phone = 'Please enter a valid phone number.'
    if (form.message.trim().length < 12)
      next.message = 'Tell us a little more about your project (min. 12 characters).'
    return next
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()
    if (!endpoint) {
      setSubmitError('The enquiry form is not configured yet. Please email or call us directly.')
      return
    }

    const formData = new FormData(e.currentTarget)
    setSending(true)
    setSubmitError('')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Enquiry submission failed')
      setSubmitted(true)
    } catch {
      setSubmitError('We could not send your enquiry. Please try again or contact us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <SEO
        title={pageSEO.contact.title}
        description={pageSEO.contact.description}
        path="/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: pageSEO.contact.title,
          url: `${SITE_URL}/contact`,
        }}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
      />
      <PageHero
        eyebrow="Contact"
        title="Let us build something"
        highlight="extraordinary"
        description={`Contact ${siteProfile.name} to discuss pool construction, heating, lighting, waterproofing or water feature requirements in ${siteProfile.serviceAreaName}.`}
        image="/images/pool-contact.jpg"
      >
        <div className="flex flex-wrap gap-4">
          <a
            href={`tel:${site.phoneHref}`}
            className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            <Phone className="h-4 w-4" strokeWidth={2.3} />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            <Mail className="h-4 w-4" strokeWidth={2.2} />
            Email Us
          </a>
        </div>
      </PageHero>

      {/* ---------- Contact cards + form ---------- */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-aqua/10 blur-3xl" />

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Phone,
                label: 'Call us',
                value: site.phone,
                sub: siteProfile.openingHoursStatus,
                href: `tel:${site.phoneHref}`,
              },
              {
                icon: Mail,
                label: 'Email',
                value: site.email,
                sub: 'Send your project enquiry by email',
                href: `mailto:${site.email}`,
              },
              {
                icon: MapPin,
                label: 'Visit our office',
                value: siteProfile.address.addressLocality,
                sub: siteProfile.address.full,
                href: site.mapsLink,
              },
              {
                icon: Clock,
                label: 'Working hours',
                value: 'Business hours',
                sub: siteProfile.openingHoursStatus,
                href: null,
              },
            ].map((c) => {
              const Inner = (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua">
                    <c.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <p className="mt-6 text-[10px] font-700 uppercase tracking-[0.22em] text-mist">
                    {c.label}
                  </p>
                  <p className="mt-3 break-words font-display text-[1.32rem] font-600 leading-snug text-cream">
                    {c.value}
                  </p>
                  <p className="mt-2.5 text-[12.2px] leading-relaxed text-mist">{c.sub}</p>
                </>
              )

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group rounded-[22px] border border-white/10 bg-white/[0.036] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-aqua/30 hover:bg-white/[0.07]"
                >
                  {Inner}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="rounded-[22px] border border-white/10 bg-white/[0.036] p-7"
                >
                  {Inner}
                </div>
              )
            })}
          </div>

          {/* form + info */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {/* form */}
            <div className="lg:col-span-7">
              <div className="glass-dark relative overflow-hidden rounded-[30px] p-8 sm:p-11">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-aqua/12 blur-3xl" />

                {submitted ? (
                  <div className="relative py-10 text-center">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-aqua/38 bg-aqua/14">
                      <CheckCircle2 className="h-9 w-9 text-aqua" strokeWidth={1.8} />
                    </div>
                    <h2 className="display-xl mt-8 text-[clamp(2rem,3.6vw,2.85rem)] text-cream">
                      Thank you, {form.name.split(' ')[0] || 'there'}!
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-[14.6px] leading-[1.9] text-mist">
                      Your enquiry has been received. An RES engineer will reach out to you shortly
                      on <span className="text-bright">{form.phone || form.email}</span>.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                      >
                        <Phone className="h-4 w-4" strokeWidth={2.3} />
                        Call Now
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false)
                          setForm({
                            name: '',
                            email: '',
                            phone: '',
                            service: services[0].title,
                            message: '',
                          })
                        }}
                        className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3.5">
                      <span className="h-px w-9 bg-aqua/70" />
                      <p className="eyebrow text-aqua">Project enquiry</p>
                    </div>

                    <h2 className="display-xl mt-5 text-[clamp(2rem,3.7vw,2.95rem)] text-cream">
                      Tell us about your <span className="italic text-gradient">project</span>
                    </h2>

                    <p className="mt-5 max-w-xl text-[14.2px] leading-[1.86] text-mist">
                      Fill in the details below and our team will get back to you with the right
                      recommendations for your project requirements.
                    </p>

                    <form onSubmit={onSubmit} noValidate className="mt-9 space-y-6">
                      <input type="hidden" name="_subject" value="New RES website enquiry" />
                      <input type="hidden" name="_replyto" value={form.email} />
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px]"
                      />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2.5 block text-[10px] font-700 uppercase tracking-[0.21em] text-mist"
                          >
                            Full name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            className="field"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                          {errors.name && (
                            <p className="mt-2 text-[11.5px] text-goldsoft">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2.5 block text-[10px] font-700 uppercase tracking-[0.21em] text-mist"
                          >
                            Phone *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            className="field"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                          {errors.phone && (
                            <p className="mt-2 text-[11.5px] text-goldsoft">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2.5 block text-[10px] font-700 uppercase tracking-[0.21em] text-mist"
                          >
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="field"
                            placeholder="name@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                          {errors.email && (
                            <p className="mt-2 text-[11.5px] text-goldsoft">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="service"
                            className="mb-2.5 block text-[10px] font-700 uppercase tracking-[0.21em] text-mist"
                          >
                            Service needed
                          </label>
                          <select
                            id="service"
                            name="service"
                            className="field appearance-none"
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                          >
                            {services.map((s) => (
                              <option key={s.slug} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                            <option value="Other / Not sure">Other / Not sure</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2.5 block text-[10px] font-700 uppercase tracking-[0.21em] text-mist"
                        >
                          Project details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="field resize-none"
                          placeholder="Location, approximate size, timeline, budget range, or anything else that helps us understand your requirement..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                        {errors.message && (
                          <p className="mt-2 text-[11.5px] text-goldsoft">{errors.message}</p>
                        )}
                      </div>

                      {submitError && (
                        <p role="alert" className="text-[12px] leading-relaxed text-goldsoft">
                          {submitError}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-5 pt-2">
                        <button
                          type="submit"
                          disabled={sending}
                          className="btn-primary inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[11px] font-700 uppercase tracking-[0.2em] disabled:cursor-wait disabled:opacity-70"
                        >
                          {sending ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss/30 border-t-abyss" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" strokeWidth={2.3} />
                              Send Enquiry
                            </>
                          )}
                        </button>

                        <p className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-mist">
                          <ShieldCheck className="h-4 w-4 text-aqua" strokeWidth={2} />
                          For sensitive information, contact RES directly.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* side info */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[26px] border border-white/10">
                <iframe
                  title="RES office location map"
                  src="https://maps.google.com/maps?q=NX+One+Gaur+City+Mall+Greater+Noida+West&output=embed"
                  className="h-[320px] w-full grayscale-[0.25] contrast-[1.05]"
                  loading="lazy"
                />
              </div>

              <div className="mt-6 space-y-5">
                {[
                  {
                    icon: Timer,
                    t: 'Project requirements',
                    d: 'Share your site, application and swimming pool requirements with RES.',
                  },
                  {
                    icon: MessageCircle,
                    t: 'Engineering solutions',
                    d: 'Discuss design, construction, equipment and specialized engineering services.',
                  },
                  {
                    icon: ShieldCheck,
                    t: 'Complete service scope',
                    d: 'RES supports pool renovation, repair, heating, lighting, covering and waterproofing.',
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex gap-4 rounded-[20px] border border-white/10 bg-white/[0.036] p-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua">
                      <x.icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-[11px] font-700 uppercase tracking-[0.17em] text-cream">
                        {x.t}
                      </p>
                      <p className="mt-2 text-[12.6px] leading-[1.76] text-mist">{x.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-gold/26 bg-gold/[0.09] p-7">
                <p className="eyebrow text-goldsoft">Prefer to talk first?</p>
                <p className="mt-4 font-display text-[1.55rem] font-600 leading-snug text-cream">
                  Call us directly and speak to an RES engineer today.
                </p>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-gold/45 px-7 py-3.5 text-[10.5px] font-700 uppercase tracking-[0.19em] text-goldsoft transition-all duration-400 hover:-translate-y-1 hover:bg-gold hover:text-abyss"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.3} />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* FAQ */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Before you write"
              title="Frequently asked"
              highlight="questions"
              text="Quick answers to the things clients ask us most often."
            />
            <div className="mt-10">
              <CTAButtons
                primaryLabel="Ask Something Else"
                primaryTo="/contact"
                secondaryLabel="Our Services"
                secondaryTo="/services"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <StatsBand />

      {/* office block */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-px w-9 bg-aqua/70" />
                <p className="eyebrow text-aqua">Our office</p>
              </div>
              <h2 className="display-xl mt-5 text-[clamp(2.15rem,4.4vw,3.55rem)] text-cream">
                Visit us in <span className="italic text-gradient">{siteProfile.address.addressLocality}</span>
              </h2>

              <div className="mt-9 space-y-5">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua">
                    <MapPin className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <p className="text-[14.6px] leading-[1.9] text-mist">
                    {siteProfile.address.full}
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua">
                    <Clock className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <p className="text-[14.6px] leading-[1.9] text-mist">
                    <span className="text-cream">Business hours</span>
                    <br />
                    {siteProfile.openingHoursStatus}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2.3} />
                    {site.phone}
                  </a>
                  <Link
                    to="/about"
                    className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                  >
                    About RES
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
                  </Link>
                  <a
                    href={site.whatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border border-white/10">
                <img
                  src="/images/pool-contact.jpg"
                  alt="RES office in Noida, India"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -left-4 rounded-[22px] border border-white/12 bg-abyss/86 px-7 py-6 backdrop-blur-xl sm:-left-10">
                <p className="font-display text-[2.35rem] font-600 leading-none text-bright">
                  North India
                </p>
                <p className="mt-2 text-[9.5px] font-700 uppercase tracking-[0.19em] text-mist">
                  Delhi, Noida, Gurugram, Ghaziabad & Faridabad
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================ 404 ============================ */
export function NotFound() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32">
      <SEO
        title={pageSEO.notFound.title}
        description={pageSEO.notFound.description}
        path={typeof window !== 'undefined' ? window.location.pathname : '/404'}
        robots="noindex, follow"
      />
      <div className="absolute inset-0 -z-10">
        <img src="/images/water-texture.jpg" alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/86 to-abyss" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-aqua">Error 404</p>
          <h1 className="display-xl mt-6 text-[clamp(3.5rem,11vw,8.5rem)] text-cream">
            This page <span className="italic text-gradient">drifted away</span>
          </h1>
          <p className="mt-8 max-w-xl text-[16.4px] leading-[1.92] text-mist">
            The page you are looking for does not exist or has been moved. Dive back into one of
            our main sections instead.
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
            >
              Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title={pageSEO.privacy.title}
        description={pageSEO.privacy.description}
        path="/privacy-policy"
        noindex
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]}
      />
      <PageHero
        eyebrow="Privacy Policy"
        title="Privacy information"
        description="TODO(client): Provide a privacy policy reviewed for RES's data collection and website enquiry handling."
        image="/images/water-texture.jpg"
      >
        <Link
          to="/contact"
          className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
        >
          Contact RES
        </Link>
      </PageHero>
    </>
  )
}
