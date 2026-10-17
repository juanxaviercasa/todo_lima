/**
 * Generador del Documento Maestro de Buyer Personas (56 Categorías) y Metodología MAPA
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PURCHASING_POWER_RANKING } from '../config/purchasingPowerRanking.js';
import { getBuyerPersona, calculateMapaEconomics } from '../config/buyerPersonas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export function generateBuyerPersonasDoc() {
  const lines = [];
  lines.push('# MATRIZ MAESTRA DE BUYER PERSONAS (56 CATEGORÍAS) Y METODOLOGÍA DE AUDITORÍA MAPA');
  lines.push('');
  lines.push('> **Ecosistema:** Todo Lima (`todolima.com`) × Hazlo Crecer (`hazlocrecer.com`) × Sistema Automatizado');
  lines.push('> **Marco Estratégico:** Russell Brunson (*DotCom Secrets*, *Expert Secrets*, *Traffic Secrets*) + Jim Edwards (*Copywriting Secrets*) + Metodología **MAPA** (*Mapear, Aislar, Poner Precio y Atacar*).');
  lines.push('> **Cobertura:** 56 Categorías Activas | 5,068 Negocios Auditados en Lima Metropolitana.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 1. Arquitectura de Doble Avatar (B2B2C) y Metodología MAPA');
  lines.push('');
  lines.push('Cada auditoría emitida desde **Todo Lima** hacia **Hazlo Crecer** opera sobre dos niveles simultáneos de psicología de conversión:');
  lines.push('');
  lines.push('1. **Nivel A — ICP B2B (El Decisor que contrata a Hazlo Crecer):** El propietario, médico director, socio de estudio o gerente técnico. Se diagnostica su realidad operativa diaria, su cuello de botella comercial, **El Gran Dominó** (*The Big Domino*), el **Cambio de Oportunidad** (*Opportunity Switch*) y la destrucción de sus **3 Falsas Creencias** (Vehículo, Interna y Externa).');
  lines.push('2. **Nivel B — Avatar B2C (El Cliente Ideal que busca al negocio en Lima):** El paciente, propietario o comprador final que busca en Google Maps / Todo Lima. Se modela su demografía en Lima, deseo ardiente, miedo visceral, evento disparador (*Trigger Event*) y comportamiento de descarte móvil.');
  lines.push('3. **Nivel C — Diagnóstico Determinista MAPA y Clasificación de Evidencia:**');
  lines.push('   - **OBSERVADO:** Hechos verificados en su ficha pública, sitio web y canal de WhatsApp.');
  lines.push('   - **REPORTADO:** Datos declarados por el titular en el formulario de intake (`hazlocrecer.com/auditoria`).');
  lines.push('   - **HIPÓTESIS POR VALIDAR:** Inferencia lógica sobre fugas de atención y seguimiento.');
  lines.push('   - **DESCONOCIDO:** Datos internos no asumidos ni inventados antes del intake.');
  lines.push('   - **Fórmula Económica Determinista:**');
  lines.push('     $$\\text{Clientes Adicionales} = L \\times (c_1 - c_0) \\quad | \\quad \\text{Ingreso Adicional Mensual} = \\text{Clientes Adicionales} \\times T$$');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 2. Tabla Resumen de Parámetros MAPA por Categoría (56 Rubros)');
  lines.push('');
  lines.push('| Rank | Categoría | Slug | Tier | Leads/mes ($L$) | Ticket ($T$) | Cierre Base ($c_0$) | Meta ($c_1$) | Clientes +/mes | Ingreso Recuperable/mes |');
  lines.push('| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |');

  for (const item of PURCHASING_POWER_RANKING) {
    const p = getBuyerPersona(item.slug);
    const eco = calculateMapaEconomics(item.slug, 0);
    lines.push(
      `| #${item.rank} | **${p.categoryName}** | \`${item.slug}\` | ${item.tier} | ${eco.inputs.L_monthlyLeads} | S/ ${eco.inputs.T_avgTicketPEN.toLocaleString()} | ${eco.inputs.c0_baselineConversion} | ${eco.inputs.c1_targetConversion} | +${eco.outputs.additionalClientsPerMonth} | **S/ ${eco.outputs.additionalMonthlyRevenuePEN.toLocaleString()}** |`
    );
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 3. Fichas Completas de Buyer Persona por Categoría (1 a 56)');
  lines.push('');

  for (const item of PURCHASING_POWER_RANKING) {
    const p = getBuyerPersona(item.slug);
    const eco = calculateMapaEconomics(item.slug, 0);
    lines.push(`### #${item.rank}. ${p.categoryName} (\`${item.slug}\` — ${item.tier})`);
    lines.push('');
    lines.push('#### A. Perfil del Decisor B2B (Cliente de Hazlo Crecer)');
    lines.push(`- **Decisor:** ${p.icpB2B.decisionMaker}`);
    lines.push(`- **Realidad Operativa:** ${p.icpB2B.dailyReality}`);
    lines.push(`- **Cuello de Botella Principal (Aislar):** ${p.icpB2B.primaryBottleneck}`);
    lines.push(`- **El Gran Dominó (Brunson):** ${p.icpB2B.theBigDomino}`);
    lines.push(`- **Cambio de Oportunidad (Opportunity Switch):** ${p.icpB2B.opportunitySwitch}`);
    lines.push('- **Destrucción de las 3 Falsas Creencias:**');
    lines.push(`  - *Vehículo (Sistema/IA):* ${p.icpB2B.falseBeliefs.vehicle}`);
    lines.push(`  - *Interna (Capacidad propia):* ${p.icpB2B.falseBeliefs.internal}`);
    lines.push(`  - *Externa (El mercado en Lima):* ${p.icpB2B.falseBeliefs.external}`);
    lines.push('');
    lines.push('#### B. Avatar del Cliente Final B2C (Quien contrata al profesional en Lima)');
    lines.push(`- **Arquetipo:** ${p.endCustomerAvatar.archetypeName}`);
    lines.push(`- **Demografía y Zonas:** ${p.endCustomerAvatar.demographics}`);
    lines.push(`- **Deseo Ardiente:** ${p.endCustomerAvatar.burningDesire}`);
    lines.push(`- **Miedo Visceral:** ${p.endCustomerAvatar.visceralFear}`);
    lines.push(`- **Evento Disparador (Trigger Event):** ${p.endCustomerAvatar.triggerEvent}`);
    lines.push(`- **Comportamiento Móvil:** ${p.endCustomerAvatar.mobileBehavior}`);
    lines.push('');
    lines.push('#### C. Estructura Hook–Story–Offer & Economía MAPA');
    lines.push(`- **Gancho (Hook):** *"${p.hookStoryOffer.hook}"*`);
    lines.push(`- **Historia (Story):** ${p.hookStoryOffer.story}`);
    lines.push(`- **Oferta de Entrada (Offer):** ${p.hookStoryOffer.offer}`);
    lines.push(
      `- **Escenario Base MAPA:** $L = ${eco.inputs.L_monthlyLeads}$ consultas/mes | $T = \\text{S/ }${eco.inputs.T_avgTicketPEN.toLocaleString()}$ | $c_0 = ${eco.inputs.c0_baselineConversion} \\to c_1 = ${eco.inputs.c1_targetConversion}$ | **Ingreso Adicional Estimado:** **S/ ${eco.outputs.additionalMonthlyRevenuePEN.toLocaleString()}/mes** (Contribución bruta: S/ ${eco.outputs.additionalGrossMarginPEN.toLocaleString()}/mes).`
    );
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  const outPath = path.join(rootDir, 'docs', 'MATRIZ_BUYER_PERSONAS_AUDITORIAS.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  return { outPath, totalLines: lines.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const res = generateBuyerPersonasDoc();
  console.log(`✅ Documento maestro generado en ${res.outPath} (${res.totalLines} líneas)`);
}
