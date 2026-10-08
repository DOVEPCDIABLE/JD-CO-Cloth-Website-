import type { CSSProperties } from 'react';
import type { GalleryProduct } from './products';
export default function JacketPhoto({product,back=false,eager=false,className=''}:{product:GalleryProduct;back?:boolean;eager?:boolean;className?:string}){
 return <div className={`jacket-photo ${back?'photo-back':''} ${className}`} style={{'--photo-aspect':product.aspect} as CSSProperties}><img src={product.image} alt={`${product.name}, ${back?'back':'front'} view`} width={Math.round(product.aspect*2048)} height={1024} loading={eager?'eager':'lazy'} decoding="async" draggable={false}/></div>
}
