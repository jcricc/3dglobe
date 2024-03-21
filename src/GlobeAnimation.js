import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, shaderMaterial, Float } from '@react-three/drei';
import { Color } from 'three';
import * as THREE from 'three';

// Define a shader material for the atmospheric glow effect
const GlowShaderMaterial = shaderMaterial(
  // Uniforms
  {
    c: 0.34,
    p: 3.0,
    glowColor: new THREE.Color(0x00ff00),
    viewVector: new THREE.Vector3(0, 0, 1),
  },
  // Vertex Shader
  `
    uniform vec3 viewVector;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(c - dot(vNormal, vNormel), p);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 glowColor;
    varying float intensity;
    void main() {
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4(glow, 1.0);
    }
  `
);

// Register the shader material in react-three-fiber
extend({ GlowShaderMaterial });

const GlowingHotspot = ({ position, color, cycleDuration }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const intensity = (Math.sin((elapsedTime * 2 * Math.PI) / cycleDuration) + 1) / 2;
    meshRef.current.material.emissiveIntensity = intensity;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
};

const ShinyShapes = () => {
  // Integrate ShinyShapes as per the previous example
  const icosahedronRef = useRef();
  const torusKnotRef = useRef();

  useFrame(() => {
    icosahedronRef.current.rotation.x += 0.01;
    icosahedronRef.current.rotation.y += 0.01;
    torusKnotRef.current.rotation.x += 0.01;
    torusKnotRef.current.rotation.y -= 0.01;
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={icosahedronRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="hotpink" emissive="hotpink" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
        <mesh ref={torusKnotRef}>
          <torusKnotGeometry args={[0.5, 0.2, 100, 16]} />
          <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </>
  );
};

const CoolBackgroundGlobe = () => {
  const globeRef = useRef();
  useFrame(() => {
    globeRef.current.rotation.y += 0.001;
  });

  const earthTexture = useTexture('bo2map.jpg');

  // Enhance brightness by adjusting emissiveIntensity
  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        emissive={new THREE.Color('#FFDC7BC2')} // Set a white color for a brighter effect
        emissiveMap={earthTexture}
        emissiveIntensity={1} // Increase the intensity for a brighter night map
      />
    </mesh>
  );
};

const GlobeAnimation = () => {
  const hotspots = useMemo(() => [
    { position: new THREE.Vector3(1, 2, 1), color: new Color('#ffcc00'), cycleDuration: 3 },
    // Add more hotspots as desired...
  ], []);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <OrbitControls />
      <CoolBackgroundGlobe />
      {hotspots.map((hotspot, index) => (
        <GlowingHotspot
          key={index}
          position={hotspot.position}
          color={hotspot.color}
          cycleDuration={hotspot.cycleDuration}
        />
      ))}
      <ShinyShapes />
    </Canvas>
  );
};

export default GlobeAnimation;

