// import { useMemo, useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Environment, Lightformer } from '@react-three/drei'
// import * as THREE from 'three'

// const waterVertex = /* glsl */ `
//   uniform float uTime;
//   uniform vec2 uMouse;
//   varying vec3 vWorldPos;
//   varying float vHeight;
//   varying vec2 vUv;

//   float wave(vec2 p, vec2 dir, float freq, float speed, float amp, float t) {
//     return sin(dot(p, normalize(dir)) * freq + t * speed) * amp;
//   }

//   void main() {
//     vUv = uv;
//     vec3 pos = position;
//     float t = uTime;

//     float w = 0.0;
//     w += wave(pos.xy, vec2(1.0, 0.55), 0.34, 0.85, 0.46, t);
//     w += wave(pos.xy, vec2(-0.72, 1.0), 0.58, 1.18, 0.24, t);
//     w += wave(pos.xy, vec2(0.28, -1.0), 1.12, 1.62, 0.115, t);
//     w += wave(pos.xy, vec2(-1.0, -0.35), 1.95, 2.15, 0.055, t);

//     float d = distance(pos.xy, uMouse * 6.0);
//     w += sin(d * 1.6 - t * 2.4) * 0.12 * exp(-d * 0.32);

//     pos.z += w;
//     vHeight = w;

//     vec4 worldPos = modelMatrix * vec4(pos, 1.0);
//     vWorldPos = worldPos.xyz;
//     gl_Position = projectionMatrix * viewMatrix * worldPos;
//   }
// `

// const waterFragment = /* glsl */ `
//   uniform float uTime;
//   uniform vec3 uDeep;
//   uniform vec3 uShallow;
//   uniform vec3 uGlow;
//   varying vec3 vWorldPos;
//   varying float vHeight;
//   varying vec2 vUv;

//   void main() {
//     vec3 dx = dFdx(vWorldPos);
//     vec3 dy = dFdy(vWorldPos);
//     vec3 normal = normalize(cross(dx, dy));
//     if (normal.y < 0.0) normal = -normal;

//     vec3 viewDir = normalize(cameraPosition - vWorldPos);
//     float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.35);
//     fresnel = clamp(fresnel, 0.0, 1.0);

//     float h = smoothstep(-0.55, 0.75, vHeight);
//     vec3 base = mix(uDeep, uShallow, h * 0.72 + fresnel * 0.5);

//     vec3 lightDir = normalize(vec3(-0.42, 0.86, 0.35));
//     vec3 halfDir = normalize(lightDir + viewDir);
//     float spec = pow(max(dot(normal, halfDir), 0.0), 128.0);
//     float spec2 = pow(max(dot(normal, halfDir), 0.0), 22.0);

//     float sheen = smoothstep(0.55, 1.0, fresnel);
//     vec3 color = base + uGlow * (spec * 1.45 + spec2 * 0.16) + sheen * uGlow * 0.16;

//     float edgeFade = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x)
//                   * smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);

//     gl_FragColor = vec4(color, 0.92 + fresnel * 0.08);
//     #include <colorspace_fragment>
//   }
// `

// function Water() {
//   const material = useMemo(
//     () =>
//       new THREE.ShaderMaterial({
//         vertexShader: waterVertex,
//         fragmentShader: waterFragment,
//         transparent: true,
//         uniforms: {
//           uTime: { value: 0 },
//           uMouse: { value: new THREE.Vector2(0, 0) },
//           uDeep: { value: new THREE.Color('#06202c') },
//           uShallow: { value: new THREE.Color('#2fb5b8') },
//           uGlow: { value: new THREE.Color('#a9fff4') },
//         },
//       }),
//     [],
//   )

//   const mesh = useRef<THREE.Mesh>(null)

//   useFrame((state) => {
//     const t = state.clock.elapsedTime
//     material.uniforms.uTime.value = t * 0.62
//     const m = material.uniforms.uMouse.value as THREE.Vector2
//     m.x = THREE.MathUtils.lerp(m.x, state.pointer.x, 0.05)
//     m.y = THREE.MathUtils.lerp(m.y, state.pointer.y, 0.05)
//     if (mesh.current) {
//       mesh.current.rotation.z = Math.sin(t * 0.08) * 0.045
//     }
//   })

//   return (
//     <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
//       <planeGeometry args={[34, 34, 220, 220]} />
//       <primitive object={material} attach="material" />
//     </mesh>
//   )
// }

// function Rings() {
//   const group = useRef<THREE.Group>(null)

//   useFrame((state) => {
//     const t = state.clock.elapsedTime
//     if (!group.current) return
//     group.current.children.forEach((child, i) => {
//       child.rotation.x = t * (0.12 + i * 0.045)
//       child.rotation.y = t * (0.16 + i * 0.06)
//       child.position.y = child.userData.baseY + Math.sin(t * (0.5 + i * 0.22) + i) * 0.34
//     })
//     group.current.rotation.y = THREE.MathUtils.lerp(
//       group.current.rotation.y,
//       state.pointer.x * 0.32,
//       0.035,
//     )
//     group.current.rotation.x = THREE.MathUtils.lerp(
//       group.current.rotation.x,
//       -state.pointer.y * 0.18,
//       0.035,
//     )
//   })

//   return (
//     <group ref={group} position={[0, 1.15, 0]}>
//       <mesh position={[-2.35, 1.35, -1.1]} userData={{ baseY: 1.35 }}>
//         <torusGeometry args={[1.16, 0.075, 28, 128]} />
//         <meshPhysicalMaterial
//           color="#e8d4a6"
//           metalness={1}
//           roughness={0.16}
//           clearcoat={1}
//           clearcoatRoughness={0.22}
//           envMapIntensity={1.55}
//         />
//       </mesh>
//       <mesh position={[2.55, 0.25, -0.35]} userData={{ baseY: 0.25 }}>
//         <torusGeometry args={[1.52, 0.1, 28, 148]} />
//         <meshPhysicalMaterial
//           color="#9fe9e6"
//           metalness={0.92}
//           roughness={0.19}
//           clearcoat={1}
//           clearcoatRoughness={0.28}
//           envMapIntensity={1.75}
//         />
//       </mesh>
//       <mesh position={[0.15, 2.28, -2.1]} userData={{ baseY: 2.28 }}>
//         <torusGeometry args={[0.78, 0.062, 24, 112]} />
//         <meshPhysicalMaterial
//           color="#f2eee4"
//           metalness={1}
//           roughness={0.12}
//           clearcoat={1}
//           envMapIntensity={1.5}
//         />
//       </mesh>
//       <mesh position={[0.15, 1.62, -1.95]}>
//         <icosahedronGeometry args={[0.92, 3]} />
//         <meshPhysicalMaterial
//           color="#1d7f92"
//           metalness={0.35}
//           roughness={0.06}
//           transmission={0.62}
//           thickness={1.45}
//           ior={1.42}
//           clearcoat={1}
//           envMapIntensity={1.9}
//           transparent
//         />
//       </mesh>
//     </group>
//   )
// }

// function CameraRig() {
//   useFrame((state) => {
//     const { camera, pointer, clock } = state
//     const t = clock.elapsedTime
//     const targetX = pointer.x * 1.25 + Math.sin(t * 0.11) * 0.5
//     const targetY = 3.05 + pointer.y * 0.72 + Math.cos(t * 0.09) * 0.28
//     camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.032)
//     camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.032)
//     camera.lookAt(0, 0.92, 0)
//   })
//   return null
// }

// function Scene() {
//   return (
//     <>
//       <color attach="background" args={['#04121a']} />
//       <fog attach="fog" args={['#04121a', 11, 30]} />

//       <ambientLight intensity={0.55} color="#7fd8e6" />
//       <directionalLight position={[-6, 9, 5]} intensity={2.1} color="#eaf7ff" />
//       <directionalLight position={[7, 4, -6]} intensity={1.25} color="#d6ab62" />
//       <pointLight position={[0, 3.4, 3.2]} intensity={22} distance={16} color="#66e4dc" />

//       <Environment resolution={128}>
//         <Lightformer form="rect" intensity={2.6} color="#8ff0e6" position={[0, 6, -8]} scale={[12, 6, 1]} />
//         <Lightformer form="rect" intensity={1.9} color="#f0d9a8" position={[-8, 3, 4]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
//         <Lightformer form="rect" intensity={1.4} color="#2aa7c2" position={[8, 2, 4]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 5, 1]} />
//         <Lightformer form="circle" intensity={1.2} color="#ffffff" position={[0, 8, 6]} scale={[6, 6, 1]} />
//       </Environment>

//       <Water />
//       <Rings />
//       <CameraRig />
//     </>
//   )
// }

// export default function WaterScene({ className = '' }: { className?: string }) {
//   return (
//     <div className={`water-canvas ${className}`} style={{ width: '100%', height: '100%' }}>
//       <Canvas
//         dpr={[1, 1.75]}
//         gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
//         camera={{ position: [0, 3.05, 8.4], fov: 44, near: 0.1, far: 60 }}
//       >
//         <Scene />
//       </Canvas>
//     </div>
//   )
// }














////

import { useEffect, useRef, useState } from "react";

type WaterSceneProps = {
  className?: string;
};

export default function WaterScene({
  className = "",
}: WaterSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleCanPlay = () => setLoaded(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    video.addEventListener("canplay", handleCanPlay);
    const playTimer = reduceMotion
      ? undefined
      : window.setTimeout(() => {
          void video.play().catch(() => {})
        }, 1200)

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      if (playTimer !== undefined) window.clearTimeout(playTimer)
    };
  }, []);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-black ${className}`}
    >
      <img
        src="/images/hero-pool.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="/videos/res-pool-hero-optimized.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}




