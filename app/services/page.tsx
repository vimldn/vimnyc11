import Link from 'next/link'
import { Building2, BriefcaseBusiness, ChevronRight, Newspaper, Search } from 'lucide-react'
import { getAllServices } from '@/lib/services'

export const metadata = {
  title: 'Services | Building Health X',
  description:
    'Local NYC services aligned with renting and building living: movers, pest control, move-out cleaning, storage, tenant help, and more.',
}

export default function ServicesHubPage() {
  const services = getAllServices()

  return (
    <main className="min-h-screen bg-[#0a0e17]">
      <header className="sticky top-0 z-50 bg-[#0a0e17]/95 backdrop-blur-xl border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold hidden sm:block">Building Health X</span>
          </Link>

          <div className="flex items-center gap-3">
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
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Services</h1>
            <p className="text-[#94a3b8] max-w-3xl">
              Helpful, local services that fit the NYC renting / moving / building-living journey. Pick a service, then choose your neighborhood.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center gap-2 text-sm text-[#94a3b8]">
            <BriefcaseBusiness size={16} />
            NYC-focused
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="card p-5 hover:translate-y-[-1px] transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#64748b] mb-1">{s.category}</div>
                  <h2 className="text-lg font-bold leading-snug">{s.name}</h2>
                </div>
                <ChevronRight className="text-[#64748b]" size={18} />
              </div>
              <div className="mt-3 text-sm text-[#94a3b8]">
                {s.highlights.slice(0, 3).join(' • ')}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 card p-6">
          <div className="text-sm font-semibold text-white">How these pages work</div>
          <p className="mt-2 text-sm text-[#94a3b8] max-w-3xl">
            Each service has neighborhood pages with local tips and a quick checklist. They’re designed to be genuinely useful (not just keyword swaps), and link back to building pages and guides.
          </p>
        </div>
      </div>
    </main>
  )
}
