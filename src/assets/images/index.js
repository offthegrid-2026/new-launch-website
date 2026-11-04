// Central image registry. Raster assets are cropped from the Canva exports by
// scripts/export-design-assets.mjs; to swap in an original, keep the same name.
import eye from './why/layer3.webp'
import bees from './schedule/bees.webp'
import sphere from './schedule/sphere.webp'

export const images = { eye, bees, sphere }

// file names carry search keywords (they show in the built URLs); `suffix` is dropped from the key
const glob = (files, suffix = '') =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', '').replace(suffix, ''), url]),
  )

// keyed by file name: speakers['paul-sandip'], passes['first-front'], venuePhotos['new-town-kolkata-map']
// (speaker photos are named <id>-otg-design-summit-kolkata.webp)
export const speakerImages = glob(import.meta.glob('./speakers/*.webp', { eager: true, import: 'default' }), '-otg-design-summit-kolkata')
export const passImages = glob(import.meta.glob('./passes/*.webp', { eager: true, import: 'default' }))
export const venuePhotos = glob(import.meta.glob('./venue/{new-town-convention-centre-kolkata,new-town-kolkata-map,biswa-bangla-gate-kolkata}.webp', { eager: true, import: 'default' }))
