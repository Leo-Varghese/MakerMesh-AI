export type Process='CNC Milling'|'CNC Turning'|'Laser Cutting';
export type Order={id:string;startup:string;part:string;qty:number;material:string;process:Process;setup:number;unitRun:number;deadline:string;status:string;vendorId?:string};
export type Vendor={id:string;name:string;location:string;capabilities:Process[];lead:string;rating:number;verified:boolean;bis:string;available:boolean};
export type InspectionStatus='Pending'|'Pass'|'Review'|'Fail';
