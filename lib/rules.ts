import type { Order, Vendor, InspectionStatus } from './types';
export function validateFile(file: { name: string; size: number }): string {
  if (!/\.(step|stp|stl|gbr)$/i.test(file.name)) return 'Unsupported file. Use STEP, STP, STL, or GBR.';
  if (file.size <= 0) return 'The file is empty.';
  if (file.size > 15 * 1024 * 1024) return 'File exceeds the 15 MB demo upload limit.';
  return '';
}
export function poolOrders(orders: Order[]) {
  if (orders.length < 2) throw new Error('Select at least two orders.');
  const first = orders[0];
  if (!orders.every(o => o.material === first.material && o.process === first.process && o.part === first.part && o.setup === first.setup)) throw new Error('Incompatible part specification, material, process or setup.');
  const quantity = orders.reduce((sum, o) => sum + o.qty, 0);
  const individual = orders.reduce((sum, o) => sum + o.setup + o.qty * o.unitRun, 0);
  const pooled = first.setup + orders.reduce((sum, o) => sum + o.qty * o.unitRun, 0);
  return { quantity, individual, pooled, saving: individual - pooled, allocations: orders.map(o => ({ id: o.id, setup: first.setup * o.qty / quantity })) };
}
export function canAssign(vendor: Vendor, order: Order) { return vendor.verified && vendor.available && vendor.capabilities.includes(order.process); }
export function canAdvance(stage: number, quality: InspectionStatus) {
  return Number.isInteger(stage) && stage >= 0 && stage < 7 && (stage < 5 || quality === 'Pass');
}
