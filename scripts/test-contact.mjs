import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/contacto.js';
const body={name:'Persona de prueba',email:'visitor@example.com',topic:'consulta-general',subject:'Consulta de prueba',message:'Necesito información sobre el directorio local.',consent:true};
const env={CLOUDFLARE_ACCOUNT_ID:'a'.repeat(32),CLOUDFLARE_EMAIL_API_TOKEN:'test-only'};
let ip=0;
const request=(data=body,origin='https://todolima.com')=>new Request('https://todolima.com/api/contacto',{method:'POST',headers:{origin,'content-type':'application/json','cf-connecting-ip':String(++ip)},body:JSON.stringify(data)});
assert.equal((await onRequest({request:request(),env:{}})).status,503);
assert.equal((await onRequest({request:request(body,'https://other.example'),env})).status,403);
assert.equal((await onRequest({request:request({...body,consent:false}),env})).status,400);
assert.equal((await onRequest({request:request({...body,subject:'Bad\r\nheader'}),env})).status,400);
const originalFetch=globalThis.fetch;
try {
  globalThis.fetch=async(url,options)=>{
    const sent=JSON.parse(options.body);
    assert.equal(sent.to,'contacto@todolima.com');
    assert.equal(sent.reply_to,body.email);
    return Response.json({success:true,result:{queued:['contacto@todolima.com']}});
  };
  const accepted=await onRequest({request:request(),env});
  assert.equal(accepted.status,200);
  assert.match((await accepted.json()).reference,/^TL-/);
  globalThis.fetch=async()=>Response.json({success:true,result:{permanent_bounces:['contacto@todolima.com']}});
  assert.equal((await onRequest({request:request(),env})).status,502);
  globalThis.fetch=async()=>{throw new Error('Network unavailable');};
  assert.equal((await onRequest({request:request(),env})).status,502);
} finally {globalThis.fetch=originalFetch;}
console.log('Contact tests passed; no real email sent.');
