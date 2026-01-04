import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin, Newspaper, Search, ShieldCheck } from 'lucide-react'
import { allServiceAreaParams, getAreaBySlug, getServiceBySlug, metaFor, titleFor } from '@/lib/services'

export const dynamicParams = false

export async function generateStaticParams() {
  return allServiceAreaParams()
}

export async function generateMetadata({ params }: { params: { service: string; area: string } }) {
  const svc = getServiceBySlug(params.service)
  const area = getAreaBySlug(params.area)
  if (!svc || !area) return {}
  return {
    title: `${titleFor(svc, area)} | Building Health X`,
    description: metaFor(svc, area),
  }
}

function localTips(serviceSlug: string, borough: string) {
  const base: string[] = [
    'Confirm building rules early (move windows, elevator bookings, deposits).',
    'Ask for pricing in writing and watch for common add-ons.',
    'Plan logistics (parking/loading, long carries, stairs) to avoid delays.',
  ]

  const byService: Record<string, string[]> = {
    'moving-companies': [
      'If your building needs a COI, get the exact wording from management before booking.',
      'End-of-month demand spikes—weekday slots are usually cheaper and easier.',
    ],
    'move-out-cleaning': [
      'Ask what “move-out clean” includes (inside oven/fridge, baseboards, windows).',
      'If you have a management walkthrough, schedule cleaning the day before.',
    ],
    'storage-units': [
      'Check elevator access and loading rules at the facility (some require appointments).',
      'Climate control matters for wood furniture, art, and electronics.',
    ],
    'junk-removal': [
      'Ask about disposal fees for construction debris, electronics, and mattresses.',
      'If your building has a service entrance, confirm pickup location and timing.',
    ],
    'pest-control': [
      'Treating one unit is rarely enough—ask about building-wide coordination.',
      'Request clear prep instructions (laundry, bagging, access to baseboards).',
    ],
    'bed-bug-exterminators': [
      'Insist on a written treatment plan (follow-up visits + guarantees).',
      'Prep is everything—get a checklist and timeline before paying.',
    ],
    'rodent-control': [
      'Proofing (sealing entry points) is as important as baiting.',
      'Ask what’s included: inspection, exclusion, and follow-up visits.',
    ],
    'mold-remediation': [
      'Fix the moisture source first (leaks/condensation), then remediate.',
      'Ask whether containment and HEPA filtration are included.',
    ],
    'air-quality-testing': [
      'Decide what you’re testing for (mold spores, VOCs, particulate, CO2).',
      'Ask how results are interpreted and what actions they recommend.',
    ],
    'tenant-lawyers': [
      'Bring a timeline, photos, and copies of notices/complaints to the first call.',
      'Ask about expected outcomes, fees, and typical timeframes.',
    ],
    'home-inspection': [
      'For co-ops/condos, ask what can and can’t be inspected (common areas vs unit).',
      'Get photos and a prioritized repair list you can negotiate with.',
    ],
    'internet-providers': [
      'Ask your building which providers are wired—availability varies by address.',
      'For WFH, prioritize upload speeds and latency, not just download.',
    ],
  }

  const boroughNotes: Record<string, string> = {
    Manhattan: 'In Manhattan, curb space and building move windows are often the biggest bottlenecks.',
    Brooklyn: 'In Brooklyn, walk-ups and brownstone stairs can add time—plan for carrying distance.',
    Queens: 'In Queens, parking is sometimes easier, but building rules still vary widely.',
    Bronx: 'In the Bronx, confirm access routes and timing—some buildings have strict service-entry rules.',
    'Staten Island': 'In Staten Island, longer driveways and curb access help, but confirm HOA/building requirements.',
  }

  return [...(byService[serviceSlug] || []), boroughNotes[borough] || '', ...base].filter(Boolean)
}

export default function ServiceAreaPage({ params }: { params: { service: string; area: string } }) {
  const svc = getServiceBySlug(params.service)
  const area = getAreaBySlug(params.area)
  if (!svc || !area) return notFound()

  const tips = localTips(svc.slug, area.borough)

  return (
    <main className="min-h-screen bg-[#0a0e17]">
      <header className="sticky top-0 z-50 bg-[#0a0e17]/95 backdrop-blur-xl border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold hidden sm:block">Building Health X</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/services" className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition">
              <MapPin size={16} />
              Services
            </Link>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition">
              <Newspaper size={16} />
              Blog
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition">
              <Search size={16} />
              Search
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-[#94a3b8] mb-6">
          <Link className="hover:underline" href="/services">Services</Link>
          <span className="mx-2">/</span>
          <Link className="hover:underline" href={`/services/${svc.slug}`}>{svc.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{area.name}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 card p-6">
            <div className="text-xs text-[#64748b] mb-2">{svc.category} • {area.borough}</div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">{titleFor(svc, area)}</h1>
            <p className="text-[#94a3b8] max-w-3xl">
              Practical local guidance plus a quick checklist. Designed to help you pick a provider without surprises.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#1e293b] bg-[#0b1220] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={16} /> What to look for</div>
                <ul className="mt-3 space-y-2 text-sm text-[#94a3b8]">
                  {svc.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />{h}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#1e293b] bg-[#0b1220] p-4">
                <div className="text-sm font-semibold">Local notes for {area.name}</div>
                <p className="mt-2 text-sm text-[#94a3b8]">{area.blurb}</p>
              </div>
            </div>
          </section>

          <aside className="card p-6">
            <div className="text-sm font-semibold">Quick checklist</div>
            <ul className="mt-3 space-y-2 text-sm text-[#94a3b8]">
              {svc.checklist.map((c) => (
                <li key={c} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />{c}</li>
              ))}
            </ul>
            <a href="#cta" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-white/90">
              {svc.cta}
            </a>
            <p className="mt-3 text-xs text-[#64748b]">
              Tip: start with 2–3 quotes and ask for the full scope in writing.
            </p>
          </aside>
        </div>

        <section className="mt-6 card p-6">
          <h2 className="text-xl font-bold mb-2">Tips specific to {svc.name.toLowerCase()} in {area.name}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((t) => (
              <div key={t} className="rounded-xl border border-[#1e293b] bg-[#0b1220] p-4 text-sm text-[#94a3b8]">
                {t}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 card p-6">
          <h2 className="text-xl font-bold mb-2">FAQs</h2>
          <div className="space-y-3">
            {svc.faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-[#1e293b] bg-[#0b1220] p-4">
                <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-[#94a3b8]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="cta" className="mt-6 rounded-2xl border border-[#1e293b] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-[#cbd5e1] font-semibold">Next step</div>
              <div className="text-2xl font-black mt-1">{svc.cta} in {area.name}</div>
              <div className="text-sm text-[#94a3b8] mt-1">This can link to a form endpoint later. For now, it’s a simple placeholder CTA.</div>
            </div>
            <Link
              href={`/services/${svc.slug}`}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-white/90"
            >
              Browse all areas
            </Link>
          </div>
        </section>

        <div className="mt-10 text-sm text-[#94a3b8]">
          Want NYC building stats too? <Link className="hover:underline text-white" href="/">Search an address</Link>.
        </div>
      </div>
    </main>
  )
}
