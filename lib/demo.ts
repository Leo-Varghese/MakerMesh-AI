import {Order,Vendor} from './types';
export const orders:Order[]=[
{id:'MM-1042',startup:'AeroSeed',part:'Motor Mount',qty:36,material:'Aluminium 6061',process:'CNC Milling',setup:2400,unitRun:410,deadline:'24 Oct 2026',status:'Manufacturing'},
{id:'MM-1047',startup:'NexBot',part:'Motor Mount',qty:24,material:'Aluminium 6061',process:'CNC Milling',setup:2400,unitRun:365,deadline:'26 Oct 2026',status:'Quote Approved'},
{id:'MM-1051',startup:'FieldIQ',part:'Motor Mount',qty:45,material:'Aluminium 6061',process:'CNC Milling',setup:2400,unitRun:390,deadline:'28 Oct 2026',status:'Quote Created'},
{id:'MM-1056',startup:'VoltEdge',part:'Drive Shaft',qty:30,material:'SS 304',process:'CNC Turning',setup:2000,unitRun:520,deadline:'29 Oct 2026',status:'Quality Check'}];
export const vendors:Vendor[]=[
{id:'V1',name:'Aravali Precision Works',location:'Jaipur, Rajasthan',capabilities:['CNC Milling','CNC Turning'],lead:'3–5 days',rating:4.8,verified:true,bis:'Demo: certificate declared',available:true},
{id:'V2',name:'Pune MicroFab',location:'Pune, Maharashtra',capabilities:['CNC Milling','Laser Cutting'],lead:'4–6 days',rating:4.6,verified:true,bis:'Demo: not provided',available:true},
{id:'V3',name:'Southern Toolroom',location:'Chennai, Tamil Nadu',capabilities:['CNC Turning'],lead:'5–7 days',rating:4.5,verified:false,bis:'Demo: unverified',available:true}];
export const workflow=['Quote Created','Quote Approved','Payment Held (Simulated)','Vendor Accepted','Manufacturing','Quality Check','Delivered','Payout Released (Simulated)'];
