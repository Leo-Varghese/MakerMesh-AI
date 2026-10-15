const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
let ts;
try { ts = require('typescript'); } catch { ts = require(require('node:path').join(require('node:child_process').execFileSync('npm',['root','-g'],{encoding:'utf8'}).trim(),'typescript')); }
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,filename);
const {calculateQuote,validateQuote}=require('../lib/quote.ts');
const {validateFile,poolOrders,canAssign,canAdvance}=require('../lib/rules.ts');
const {orders,vendors}=require('../lib/demo.ts');
const q={quantity:40,setupCost:2400,machiningHours:12,hourlyRate:900,materialPerUnit:180,inspectionPerUnit:45,additional:500};
test('quote breakdown matches documented formula',()=>assert.deepEqual(calculateQuote(q),{material:7200,machining:10800,inspection:1800,total:22700,unit:567.5}));
test('quote rejects zero, fractional, negative and non-finite inputs',()=>{for(const patch of [{quantity:0},{quantity:1.5},{setupCost:-1},{hourlyRate:NaN},{additional:Infinity}])assert.throws(()=>calculateQuote({...q,...patch}));assert.equal(validateQuote(q),'')});
test('CAD supports all declared extensions case-insensitively',()=>{for(const ext of ['step','STP','stl','GBR'])assert.equal(validateFile({name:`part.${ext}`,size:100}),'')});
test('CAD rejects unsupported, empty and oversized files',()=>{for(const file of [{name:'x.exe',size:1},{name:'x.stl',size:0},{name:'x.stl',size:15*1024*1024+1}])assert.notEqual(validateFile(file),'');assert.equal(validateFile({name:'x.stl',size:15*1024*1024}),'')});
test('pooling calculates dataset savings and allocated setup',()=>{const p=poolOrders(orders.slice(0,3));assert.equal(p.quantity,105);assert.equal(p.individual,48270);assert.equal(p.pooled,43470);assert.equal(p.saving,4800);assert.ok(Math.abs(p.allocations.reduce((s,o)=>s+o.setup,0)-2400)<1e-8)});
test('pooling rejects incompatible material/process/part/setup and one job',()=>{assert.throws(()=>poolOrders([orders[0]]));for(const patch of [{material:'SS 304'},{process:'CNC Turning'},{part:'Different part'},{setup:999}])assert.throws(()=>poolOrders([orders[0],{...orders[1],...patch}]))});
test('vendor assignment requires verification, availability and capability',()=>{assert.equal(canAssign(vendors[0],orders[0]),true);assert.equal(canAssign(vendors[2],orders[3]),false);assert.equal(canAssign({...vendors[0],available:false},orders[0]),false);assert.equal(canAssign(vendors[1],orders[3]),false)});
test('all timeline stages reject invalid progression and require QC for delivery/payout',()=>{for(const stage of [0,1,2,3,4])assert.equal(canAdvance(stage,'Pending'),true);for(const stage of [5,6]){for(const status of ['Pending','Review','Fail'])assert.equal(canAdvance(stage,status),false);assert.equal(canAdvance(stage,'Pass'),true)}for(const stage of [-1,7,8,NaN,1.5])assert.equal(canAdvance(stage,'Pass'),false)});
