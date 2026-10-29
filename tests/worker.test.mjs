import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const uri = source => 'data:text/javascript,' + encodeURIComponent(source);
const fields = uri(await fs.readFile(new URL('../cloudflare/application-fields.js', import.meta.url), 'utf8'));
const storage = uri(await fs.readFile(new URL('../cloudflare/storage.js', import.meta.url), 'utf8'));
const source = (await fs.readFile(new URL('../cloudflare/worker.js', import.meta.url), 'utf8')).replace('"./application-fields.js"',JSON.stringify(fields)).replace('"./storage.js"',JSON.stringify(storage));
const {default: worker} = await import(uri(source));
const sample = {company:'Integration test',contact:'Test',email:'test@example.com',phone:'+12025550100',region:'New York',earliestStartDate:'2026-11-10',hasCargoVan:'yes',cargoVanCount:3,notes:'Test only'};
function environment({failBackup=false}={}) {
 const rows=[], backups=new Map();
 return {rows,backups,DB:{prepare(sql){return {bind(...values){this.values=values;return this},async run(){if(sql.startsWith('INSERT'))rows.push(this.values);return {success:true}},async all(){return {results:[]}}}}},APPLICATION_BACKUPS:{async put(key,value){if(failBackup)throw Error('R2 unavailable');backups.set(key,value)}}};
}
const submit = (data, env) => worker.fetch(new Request('https://example.test/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}),env);
test('valid application is durable in D1 and R2 with matching fields',async()=>{
 const env=environment();const response=await submit(sample,env);assert.equal(response.status,201);assert.equal(env.rows.length,1);assert.equal(env.backups.size,1);
 const saved=JSON.parse([...env.backups.values()][0]);assert.equal(saved.earliestStartDate,sample.earliestStartDate);assert.equal(saved.cargoVanCount,3);assert.equal((await response.json()).id,saved.id);
});
test('reject invalid date, fractional or missing fleet count before storage',async()=>{
 for(const changes of [{earliestStartDate:'2026-02-30'},{cargoVanCount:1.5},{cargoVanCount:0},{hasCargoVan:''}]){
 const env=environment();assert.equal((await submit({...sample,...changes},env)).status,400);assert.equal(env.rows.length,0);assert.equal(env.backups.size,0);}
});
test('no vans normalizes count to zero',async()=>{const env=environment();assert.equal((await submit({...sample,hasCargoVan:'no'},env)).status,201);assert.equal(JSON.parse([...env.backups.values()][0]).cargoVanCount,0)});
test('backup failure does not acknowledge successful application',async()=>{const env=environment({failBackup:true});assert.equal((await submit(sample,env)).status,503);assert.equal(env.rows.length,0)});
test('private records require admin session; arbitrary files remain inaccessible',async()=>{
 const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({authenticated:false});
 try{assert.equal((await worker.fetch(new Request('https://example.test/api/applications'),environment())).status,401)}finally{globalThis.fetch=original}
 assert.equal((await worker.fetch(new Request('https://example.test/data/dsp_applications.db'),environment())).status,404);
});
test('email provider failure does not lose or reject the saved application',async()=>{
 const original=globalThis.fetch;globalThis.fetch=async()=>new Response('Unavailable',{status:503});
 const env={...environment(),RESEND_API_KEY:'test-only',NOTIFY_EMAIL:'test@example.com',FROM_EMAIL:'sender@example.com'};
 try{assert.equal((await submit(sample,env)).status,201);assert.equal(env.rows.length,1)}finally{globalThis.fetch=original}
});
test('Formspree receives the applicant reply address and fleet details',async()=>{
 const original=globalThis.fetch;let notification;
 globalThis.fetch=async(url,options)=>{notification={url,body:JSON.parse(options.body)};return Response.json({ok:true})};
 const env={...environment(),FORMSPREE_FORM_ID:'testform'};
 try{assert.equal((await submit(sample,env)).status,201);assert.equal(notification.url,'https://formspree.io/f/testform');assert.equal(notification.body.email,sample.email);assert.match(notification.body.message,/Cargo van count: 3/)}finally{globalThis.fetch=original}
});
test('individual driver needs no company and persists explicit type in D1 and backup',async()=>{
 const env=environment();const {company,...driver}=sample;
 assert.equal((await submit({...driver,applicantType:'individual_driver'},env)).status,201);
 const saved=JSON.parse([...env.backups.values()][0]);assert.equal(saved.company,'');assert.equal(saved.applicantType,'individual_driver');assert.equal(env.rows[0].at(-1),'individual_driver');
});
test('company and fleet still require a company; invalid applicant types are rejected',async()=>{
 for(const changes of [{applicantType:'company_fleet',company:''},{applicantType:'unknown'}]){
 const env=environment();assert.equal((await submit({...sample,...changes},env)).status,400);assert.equal(env.backups.size,0);
 }
});
