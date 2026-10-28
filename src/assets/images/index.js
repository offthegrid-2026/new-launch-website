// Central image registry. Raster assets are cropped from the Canva exports by
// scripts/export-design-assets.mjs; to swap in an original, keep the same name.
import logo from './logo.webp'
import eye from './why/layer3.webp'
import bees from './schedule/bees.webp'
import sphere from './schedule/sphere.webp'

export const images = { logo, eye, bees, sphere }

const glob = (files) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]))

// keyed by file name: speakers['paul-sandip'], passes['first-front'], venuePhotos.map
export const speakerImages = glob(import.meta.glob('./speakers/*.webp', { eager: true, import: 'default' }))
export const passImages = glob(import.meta.glob('./passes/*.webp', { eager: true, import: 'default' }))
export const venuePhotos = glob(import.meta.glob('./venue/{building,map,gate}.webp', { eager: true, import: 'default' }))
