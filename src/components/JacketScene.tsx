import { Suspense, useMemo, useRef, useState, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}> {
 state={failed:false};static getDerivedStateFromError(){return {failed:true}};
 render(){return this.state.failed?this.props.fallback:this.props.children}
}
function Jacket({navy,back,reduced}:{navy:boolean;back:boolean;reduced:boolean}) {
 const group=useRef<THREE.Group>(null);const front=useTexture(`/images/corporate${navy?'-navy':''}.webp`);const rear=useTexture('/images/corporate-back.webp');
 const shape=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-.65,-1.2);s.lineTo(.65,-1.2);s.lineTo(.69,.45);s.lineTo(.86,-1.12);s.lineTo(1.1,-1.08);s.lineTo(.97,.66);s.quadraticCurveTo(.85,.93,.38,1.04);s.lineTo(.3,1.2);s.lineTo(-.3,1.2);s.lineTo(-.38,1.04);s.quadraticCurveTo(-.85,.93,-.97,.66);s.lineTo(-1.1,-1.08);s.lineTo(-.86,-1.12);s.lineTo(-.69,.45);s.closePath();return s},[]);
 useFrame((state,delta)=>{if(group.current){group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,back?Math.PI:0,5,delta);group.current.position.y=reduced?0:Math.sin(state.clock.elapsedTime*.85)*.055;}});
 return <group ref={group} rotation={[0,-.12,0]}><mesh position={[0,0,-.03]} scale={[.76,.87,1]}><extrudeGeometry args={[shape,{depth:.06,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.02,bevelThickness:.015}]}/><meshStandardMaterial color={navy?'#101c32':'#171918'} roughness={.94}/></mesh><mesh position={[0,0,.06]}><planeGeometry args={[2.45,2.7]}/><meshBasicMaterial map={front} transparent alphaTest={.15} side={THREE.FrontSide}/></mesh><mesh position={[0,-.04,-.06]} rotation={[0,Math.PI,0]}><planeGeometry args={[2.4,2.65]}/><meshBasicMaterial map={rear} transparent alphaTest={.15}/></mesh></group>
}
export default function JacketScene({navy,back}:{navy:boolean;back:boolean}) {
 const [webgl] =useState(()=>{try{return !!document.createElement('canvas').getContext('webgl2')}catch{return false}});
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fallback=<img className="jacket-fallback" src={`/images/corporate${navy?'-navy':''}.webp`} alt="JD Corporate Pro black puffer jacket"/>;
 if(!webgl)return fallback;
 return <SceneBoundary fallback={fallback}><Canvas dpr={[1,1.75]} camera={{position:[0,0,4.8],fov:37}} aria-label="Interactive jacket preview. Drag horizontally to rotate; use the front and back buttons to change view." gl={{alpha:true,antialias:true}}><ambientLight intensity={2}/><directionalLight position={[3,4,3]} intensity={3}/><Suspense fallback={null}><Jacket navy={navy} back={back} reduced={reduced}/></Suspense><OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2-.2} maxPolarAngle={Math.PI/2+.2} minAzimuthAngle={-.65} maxAzimuthAngle={.65} enableDamping/></Canvas></SceneBoundary>
}
