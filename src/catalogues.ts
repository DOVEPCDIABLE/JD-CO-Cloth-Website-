export type Catalogue = { title:string; url:string; filename:string; note?:string };
export const catalogues:Record<string,Catalogue>={
 corporate:{title:'Corporate Pro',url:'/catalogues/jd-corporate-pro.pdf',filename:'JD corporate pro.pdf'},
 logistics:{title:'Logistics Pro',url:'/catalogues/jd-logistics-pro.pdf',filename:'JD logistics pro.pdf'},
 tactical:{title:'Tactical Pro',url:'/catalogues/jd-tactical-pro.pdf',filename:'JD tactical pro.pdf'},
 campus:{title:'Campus Pro',url:'/catalogues/jd-campus-pro.pdf',filename:'JD campos pro.pdf'},
 safari:{title:'Safari Pro',url:'/catalogues/jd-safari-pro.pdf',filename:'JD safari pro.pdf'},
 sport:{title:'Sport Pro',url:'/catalogues/jd-sport-pro.pdf',filename:'JD Sport Pro, page 1-12. But page 4-5 and 9-10 to be added.pdf',note:'The supplied Sport catalogue is marked as awaiting pages 4–5 and 9–10.'},
 mining:{title:'Mining Pro',url:'/catalogues/jd-mining-pro.pdf',filename:'JD mining pro.pdf'},
 healthcare:{title:'Healthcare Pro',url:'/catalogues/jd-healthcare-pro.pdf',filename:'JD healthcare pro.pdf'},
};
export const customizationCatalogue:Catalogue={title:'JD Customization System',url:'/catalogues/jd-customization-system.pdf',filename:'JD Customization System, page 1-8  Separate PDF folder.pdf'};
