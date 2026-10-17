import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { ALL_TOOLS } from '../lib/toolsCatalog.js';

assert.equal(ALL_TOOLS.length, 16, 'Expected 16 tools');

for (const tool of ALL_TOOLS) {
  const filePath = fs.existsSync(path.join('out', 'herramientas', `${tool.slug}.html`))
    ? path.join('out', 'herramientas', `${tool.slug}.html`)
    : path.join('out', 'herramientas', tool.slug, 'index.html');
  assert.ok(fs.existsSync(filePath), `Missing static HTML file for ${tool.slug} at ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf-8');

  // Verify core sections and content
  assert.ok(html.includes(tool.name), `Missing title for ${tool.slug}`);
  assert.ok(html.includes('id="proposito"'), `Missing #proposito for ${tool.slug}`);
  assert.ok(html.includes('id="interfaz"'), `Missing #interfaz for ${tool.slug}`);
  assert.ok(html.includes('id="tutorial"'), `Missing #tutorial for ${tool.slug}`);
  assert.ok(html.includes('id="formulas"'), `Missing #formulas for ${tool.slug}`);
  assert.ok(html.includes('id="ejemplo"'), `Missing #ejemplo for ${tool.slug}`);
  assert.ok(html.includes('id="usos-diarios"'), `Missing #usos-diarios for ${tool.slug}`);
  assert.ok(html.includes('id="faqs"'), `Missing #faqs for ${tool.slug}`);
  assert.ok(html.includes('application/ld+json'), `Missing JSON-LD for ${tool.slug}`);
  assert.ok(html.includes(`https://todolima.com/herramientas/${tool.slug}`), `Missing canonical link for ${tool.slug}`);
  assert.ok(html.includes(tool.url), `Missing external link to interactive tool ${tool.url} for ${tool.slug}`);
}

console.log('PASS: All 16 static HTML tool tutorial pages contain all required sections, JSON-LD, external launcher, and canonical tags.');
