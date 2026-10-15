export type QuoteInput={quantity:number;setupCost:number;machiningHours:number;hourlyRate:number;materialPerUnit:number;inspectionPerUnit:number;additional:number};
export function validateQuote(q: QuoteInput): string {
 if (!Number.isInteger(q.quantity) || q.quantity < 1) return 'Quantity must be a positive whole number.';
 if (Object.values(q).some(v => !Number.isFinite(v) || v < 0)) return 'All amounts and machining hours must be finite, non-negative numbers.';
 const total=q.quantity*q.materialPerUnit+q.setupCost+q.machiningHours*q.hourlyRate+q.quantity*q.inspectionPerUnit+q.additional;
 if(!Number.isFinite(total)) return 'Quotation exceeds the supported numeric range.';
 return '';
}
export function calculateQuote(q:QuoteInput){
 const error=validateQuote(q); if(error) throw new Error(error);
 const material=q.quantity*q.materialPerUnit, machining=q.machiningHours*q.hourlyRate, inspection=q.quantity*q.inspectionPerUnit;
 const total=material+q.setupCost+machining+inspection+q.additional;
 if (!Number.isFinite(total)) throw new Error('Quotation exceeds the supported numeric range.');
 return {material,machining,inspection,total,unit:total/q.quantity};
}
