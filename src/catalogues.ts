export type Catalogue = { title:string; url:string; filename:string; note?:string };
export const catalogues:Record<string,Catalogue>={
 "campus": {
  "title": "Campus Pro",
  "url": "/catalogues/jd-campus-pro.pdf?v=9ed9f13cc45f",
  "filename": "JD_Campus_Pro_2026-27_WEBSITE.pdf"
 },
 "corporate": {
  "title": "Corporate Pro",
  "url": "/catalogues/jd-corporate-pro.pdf?v=35f4be157ad7",
  "filename": "JD_Corporate_Pro_2026-27_WEBSITE.pdf"
 },
 "healthcare": {
  "title": "Healthcare Pro",
  "url": "/catalogues/jd-healthcare-pro.pdf?v=9a75426948f1",
  "filename": "JD_Healthcare_Pro_2026-27_WEBSITE.pdf"
 },
 "lifestyle": {
  "title": "Lifestyle Pro",
  "url": "/catalogues/jd-lifestyle-pro.pdf?v=286f717a4a12",
  "filename": "JD_Lifestyle_Pro_2026-27_WEBSITE.pdf",
  "note": "Concept / sample validation pending, as noted in the supplied catalogue."
 },
 "logistics": {
  "title": "Logistics Pro",
  "url": "/catalogues/jd-logistics-pro.pdf?v=bee5a659f7b8",
  "filename": "JD_Logistics_Pro_2026-27_WEBSITE.pdf"
 },
 "mining": {
  "title": "Mining Pro",
  "url": "/catalogues/jd-mining-pro.pdf?v=c172ac7a1a24",
  "filename": "JD_Mining_Pro_2026-27_WEBSITE.pdf"
 },
 "safari": {
  "title": "Safari Pro",
  "url": "/catalogues/jd-safari-pro.pdf?v=68c70b1eb4b6",
  "filename": "JD_Safari_Pro_2026-27_WEBSITE.pdf"
 },
 "sport": {
  "title": "Sport Pro",
  "url": "/catalogues/jd-sport-pro.pdf?v=7e9131f42efe",
  "filename": "JD_Sport_Pro_2026-27_WEBSITE.pdf"
 },
 "tactical": {
  "title": "Tactical Pro",
  "url": "/catalogues/jd-tactical-pro.pdf?v=5949577115ef",
  "filename": "JD_Tactical_Pro_2026-27_RECONSTRUCTED_REVIEW.pdf"
 }
};
export const customizationCatalogue:Catalogue={title:'JD Customization System',url:'/catalogues/jd-customization-system.pdf',filename:'JD Customization System, page 1-8  Separate PDF folder.pdf'};
export function catalogueReaderUrl(catalogue:Catalogue){
 const id=Object.keys(catalogues).find(key=>catalogues[key].url===catalogue.url)||'customization-system';
 return `/catalogue/${id}`;
}
