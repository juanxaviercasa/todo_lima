export default function BrandLogo({ inverse = false }) {
  return <span className={`brand-logo${inverse ? ' brand-logo-inverse' : ''}`}>
    <img src={inverse ? '/brand/logo-symbol-white.svg' : '/brand/logo-symbol.svg'} width="55" height="50" alt="" />
    <span className="brand-logo-copy"><span className="brand-logo-name">Todo Lima</span><span className="brand-logo-tagline">Tu guía local</span></span>
  </span>;
}
