import rawAreas from '@/content/services/areas.json'
import rawServices from '@/content/services/services.json'

export type Area = {
  slug: string
  name: string
  borough: string
  blurb: string
}

export type Service = {
  slug: string
  name: string
  titleTemplate: string
  metaTemplate: string
  category: string
  cta: string
  highlights: string[]
  checklist: string[]
  faqs: Array<{ q: string; a: string }>
}

const areas: Area[] = rawAreas as unknown as Area[]
const services: Service[] = rawServices as unknown as Service[]

export function getAllAreas(): Area[] {
  return areas
}

export function getAllServices(): Service[] {
  return services
}

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function titleFor(service: Service, area: Area): string {
  return service.titleTemplate.replaceAll('{area}', area.name)
}

export function metaFor(service: Service, area: Area): string {
  return service.metaTemplate.replaceAll('{area}', area.name)
}

export function humanServiceName(serviceSlug: string): string {
  return (
    services.find((s) => s.slug === serviceSlug)?.name ||
    serviceSlug
      .replaceAll('-', ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase())
  )
}

export function allServiceAreaParams() {
  return services.flatMap((s) => areas.map((a) => ({ service: s.slug, area: a.slug })))
}

export function allServiceParams() {
  return services.map((s) => ({ service: s.slug }))
}
