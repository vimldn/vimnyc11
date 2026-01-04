import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, ChevronRight, MapPin, Newspaper, Search } from 'lucide-react'
import { allServiceParams, getAllAreas, getServiceBySlug } from '@/lib/services'

export async function generateStaticParams() {
  return allServiceParams()
}

export async function generateMetadata({ params }: { params: { service: string } }) {
  const svc = getServiceBySlug(params.service)
  if (!svc) return {}
  return {
    title: `${svc.name} by neighborhood | Building Health X`,
    description: `Local ${svc.name.toLowerCase()} pages for NYC neighborhoods with practical tips and a quick checklist.`,
  }
}

export default function ServiceHubPage({ params }: { params: { service: string } }) {
  const svc = getServiceBySlug(params.service)
  if (!svc) return notFound()

  const areas = getAllAreas()

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
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition"
            >
              <MapPin size={16} />
              Services
            </Link>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition"
            >
              <Newspaper size={16} />
              Blog
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e293b] text-sm text-[#cbd5e1] hover:bg-white/5 transition"
            >
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
          <span className="text-white">{svc.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">{svc.name}</h1>
            <p className="text-[#94a3b8] max-w-3xl">
              Choose your neighborhood for local tips, a quick checklist, and a simple next-step CTA.
            </p>
          </div>
          <div className="card p-4">
            <div className="text-xs text-[#64748b]">Typical checklist</div>
            <div className="mt-2 text-sm text-[#cbd5e1]">
              {svc.checklist.slice(0, 3).join(' • ')}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/services/${svc.slug}/${a.slug}`}
              className="card p-5 hover:translate-y-[-1px] transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#64748b] mb-1">{a.borough}</div>
                  <h2 className="text-lg font-bold leading-snug">{a.name}</h2>
                </div>
                <ChevronRight className="text-[#64748b]" size={18} />
              </div>
              <p className="mt-3 text-sm text-[#94a3b8]">{a.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
