import responsiveAssets from '../data/responsive-site-images.json';

// Only emit URLs for files the build has actually produced.
// For JPEG, srcSet is consumed by <source type="image/webp">, with JPEG fallback.
export function getResponsiveSiteImage(src) {
  const asset = responsiveAssets[src];
  if (!asset) return {src, srcSet: undefined};
  const candidates = asset.variants.map((v) => v.src + ' ' + v.width + 'w');
  if (/\.webp$/i.test(src)) candidates.push(src + ' ' + asset.width + 'w');
  return {
    src,
    srcSet: candidates.join(', ') || undefined,
    width: asset.width,
    height: asset.height,
  };
}
