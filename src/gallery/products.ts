import products from './products.json';
export type GalleryProduct = typeof products[number];
export const galleryProducts: GalleryProduct[] = products;
export const collectionPreviews: Record<string, GalleryProduct> = {
 corporate: products[0], campus: products[1], healthcare: products[2], logistics: products[3],
 // No Tactical-labelled PNG was supplied: this is explicitly an illustrative technical style.
 tactical: products[5], mining: products[7], safari: products[11], sport: products[16],
};
