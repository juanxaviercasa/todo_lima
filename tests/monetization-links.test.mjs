import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGrowthAuditLink, buildGeneralGrowthInquiryLink } from '../lib/contact.js';

test('referral link has stable source attribution and no visitor identifier', () => {
  const link = new URL(buildGeneralGrowthInquiryLink({ category: 'dentistas', profileSlug: 'ejemplo-miraflores', campaign: 'perfil_negocio' }));
  assert.equal(link.origin, 'https://hazlocrecer.com');
  assert.equal(link.searchParams.get('utm_source'), 'todolima');
  assert.equal(link.searchParams.get('categoria'), 'dentistas');
  assert.equal(link.searchParams.get('utm_content'), 'ejemplo-miraflores');
  assert.equal(link.searchParams.get('negocio'), null);
});
test('business link includes only verified business id', () => {
  assert.equal(buildGrowthAuditLink({ supabase_business_id: 'bad/id' }), null);
  const link = new URL(buildGrowthAuditLink({ supabase_business_id: 'biz_123', category: 'dentistas', slug: 'clinica-ejemplo' }));
  assert.equal(link.searchParams.get('negocio'), 'biz_123');
  assert.equal(link.searchParams.get('utm_source'), 'todolima');
});
test('untrusted source and category are not forwarded', () => {
  const link = new URL(buildGeneralGrowthInquiryLink({ category: '../secret', profileSlug: 'a?token=secret' }));
  assert.equal(link.searchParams.get('categoria'), null);
  assert.equal(link.searchParams.get('utm_content'), null);
});
