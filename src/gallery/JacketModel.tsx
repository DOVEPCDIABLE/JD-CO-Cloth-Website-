import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { GalleryProduct } from './products';
type SceneProps={product:GalleryProduct;target:MutableRefObject<number>;current:MutableRefObject<number>;auto:boolean;reduced:boolean;visible:boolean;onReady:()=>void};
function Garment({product,target,current,auto,reduced,onReady}:SceneProps){
 const group=useRef<THREE.Group>(null);const renderedFrames=useRef(0);const original=useTexture(product.image);
 const textures=useMemo(()=>{const front=original.clone(),back=original.clone();front.colorSpace=back.colorSpace=THREE.SRGBColorSpace;front.repeat.set(.5,1);back.repeat.set(.5,1);back.offset.set(.5,0);front.needsUpdate=true;back.needsUpdate=true;return {front,back}},[original]);
 useEffect(()=>()=>{textures.front.dispose();textures.back.dispose()},[textures]);
 useFrame((state,delta)=>{if(!group.current)return;renderedFrames.current+=1;if(renderedFrames.current===3)onReady();if(auto&&!reduced)target.current+=Math.min(delta,.05)*.32;current.current=reduced?target.current:THREE.MathUtils.damp(current.current,target.current,8,Math.min(delta,.05));group.current.rotation.y=current.current;group.current.rotation.x=.025;group.current.position.y=reduced?0:Math.sin(state.clock.elapsedTime*.8)*.035});
 return <group ref={group}>{[-.02,-.01,0,.01,.02].map((z,i)=><group key={z}><mesh position={[0,0,z+.025]}><planeGeometry args={[3.2*product.aspect,3.2]}/><meshBasicMaterial map={textures.front} transparent toneMapped={false} alphaTest={.06} color={i===4?'#ffffff':'#737373'} side={THREE.FrontSide}/></mesh><mesh position={[0,0,-z-.025]} rotation={[0,Math.PI,0]}><planeGeometry args={[3.2*product.aspect,3.2]}/><meshBasicMaterial map={textures.back} transparent toneMapped={false} alphaTest={.06} color={i===4?'#ffffff':'#737373'} side={THREE.FrontSide}/></mesh></group>)}</group>
}
export default function JacketModel(props:SceneProps){return <Canvas dpr={[1,2]} frameloop={props.visible?'always':'never'} camera={{position:[0,0,5.8],fov:37}} gl={{alpha:true,antialias:true}}><Suspense fallback={null}><Garment {...props}/></Suspense></Canvas>}
