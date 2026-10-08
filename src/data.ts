export const collections = [
 {id:'corporate',name:'Corporate Pro',type:'Business',tag:'THE EVERYDAY STANDARD',description:'A professional finish. An unmistakable identity. Made for the people behind your business.',features:['Puffer · Softshell · Parka','Plain, trimmed or sublimated'],color:'#424b57'},
 {id:'logistics',name:'Logistics Pro',type:'Industry',tag:'BUILT FOR EVERY DELIVERY',description:'Flexible, practical jackets for the teams that keep your business moving.',features:['Softshell · Fleece · Hi-vis','Functional storage & branding'],color:'#87372d'},
 {id:'tactical',name:'Tactical Pro',type:'Industry',tag:'READY FOR THE MISSION',description:'Purposeful outerwear for demanding environments and operational teams.',features:['Tactical outerwear','Practical, professional design'],color:'#4a503e'},
 {id:'campus',name:'Campus Pro',type:'Teams',tag:'ONE CAMPUS. ONE IDENTITY.',description:'School pride, thoughtfully made. A smart look for students and campus leaders.',features:['Softshell · Bomber · Puffer','Crests, colours & personalisation'],color:'#233a57'},
 {id:'safari',name:'Safari Pro',type:'Outdoor',tag:'MADE FOR THE GREAT OUTDOORS',description:'Earthy tones and dependable comfort for guides, lodges and outdoor crews.',features:['Puffer · Parka · Bodywarmer','Plain, trimmed or wildlife print'],color:'#77704e'},
 {id:'sport',name:'Sport Pro',type:'Teams',tag:'ONE TEAM. ALL IN.',description:'From the touchline to the training ground. Wear your team identity with pride.',features:['Windbreaker · Bodywarmer','Team colours & sublimation'],color:'#51a7cf'},
 {id:'mining',name:'Mining Pro',type:'Industry',tag:'BUILT FOR THE SHIFT',description:'Work-focused outerwear with high-visibility options for industrial crews.',features:['Puffer · Parka · Softshell','Hi-vis & reflective options'],color:'#e79727'},
 {id:'healthcare',name:'Healthcare Pro',type:'Business',tag:'PROFESSIONAL. PROTECTED.',description:'Comfortable, coordinated jackets for the people who care for others.',features:['Softshell · Puffer · Parka','Names, roles & organisation logos'],color:'#26496f'},
] as const;
export type Collection = typeof collections[number];
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g,'');
export const sizes = ['XS','S','M','L','XL','XXL','XXXL','Custom'] as const;
export function whatsappUrl(message:string) { return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`; }
