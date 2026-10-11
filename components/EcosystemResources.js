import Link from 'next/link';
const scenarios = {
  'museos-de-lima-como-elegir-una-visita-segun-tus-intereses': ['turismo-virtual-quiebra-aerolineas', '¿Qué cambiaría si el turismo fuera virtual?'],
  'que-visitar-centro-historico-lima': ['turismo-virtual-quiebra-aerolineas', 'Un escenario sobre el futuro del turismo virtual'],
};
function referral(host, path, slug) {
  return `https://${host}${path}?${new URLSearchParams({utm_source:'todolima',utm_medium:'referral',utm_campaign:'ecosistema',utm_content:slug})}`;
}
export default function EcosystemResources({post}) {
  const business = post.category === 'negocios-locales' || post.slug === 'revisar-informacion-negocio-lima';
  const scenario = scenarios[post.slug];
  if (!business && !scenario) return null;
  return <aside className="editorial-card mt-10" aria-label="Recursos complementarios">
    <h2 className="text-xl font-bold mb-4">Un siguiente paso según lo que necesitas</h2>
    {business && <><p>Si eres titular o representante de un negocio, puedes solicitar la revisión de tu ficha. Para organizar consultas y seguimiento, consulta también las herramientas de Nube para Pymes.</p><div className="flex flex-wrap gap-3 mt-5"><Link href="/para-negocios" className="editorial-chip">Revisar mi ficha de negocio →</Link><a className="editorial-chip" href={referral('nubeparapymes.online','/herramientas/',post.slug)} data-ecosystem-destination="nubeparapymes">Herramientas para organizar mi negocio →</a></div><p className="mt-4 text-sm"><Link href="/auditoria" className="underline">Consultar sobre web y automatización</Link></p></>}
    {scenario && <><p>Para continuar con una lectura de ficción especulativa y sus posibles consecuencias, explora este escenario de Mundos Simulados. No es una predicción ni una fuente sobre el lugar visitado.</p><a className="inline-block underline text-sky-700 dark:text-sky-300 mt-4" href={referral('mundossimulados.online',`/${scenario[0]}/`,post.slug)} data-ecosystem-destination="mundossimulados">{scenario[1]} →</a></>}
  </aside>;
}
