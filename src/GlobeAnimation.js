import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const CoolBackgroundGlobe = () => {
  const globeRef = useRef();
  useFrame(() => {
    globeRef.current.rotation.y += 0.001;
  });

  const earthTexture = useTexture('J16Br0022Fiber006.jpg');

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[-6, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        emissive={new THREE.Color('#FFDC7BC2')}
        emissiveMap={earthTexture}
        emissiveIntensity={1}
      />
    </mesh>
  );
};

const ExtrudedRing = () => {
  const { scene } = useThree();

  // Define the shape of the ring
  const ringShape = new THREE.Shape();
  const innerRadius = 11;
  const outerRadius = 11.5;

  ringShape.moveTo(innerRadius, 0);
  ringShape.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.moveTo(outerRadius, 0);
  hole.absarc(0, 0, outerRadius, 0, Math.PI * 2, true);
  ringShape.holes.push(hole);

  // Extrude settings
  const extrudeSettings = {
    steps: 2,
    depth: 0.1, // Small depth for a slight extrusion
    bevelEnabled: false,
  };

  // Create the geometry and mesh
  const geometry = new THREE.ExtrudeGeometry(ringShape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);

  // Position and rotate the ring similar to Jupiter's
  mesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
  mesh.rotation.z = Math.PI / 4; // Additional rotation for the inclined look

  // Ensure the mesh is updated and added only once
  if (!scene.getObjectByName('jupiterRing')) {
    mesh.name = 'jupiterRing';
    scene.add(mesh);
  }

  return null; // This component doesn't render anything itself
};

const GlobeAnimation = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <OrbitControls />
      <CoolBackgroundGlobe />
      <ExtrudedRing />
    </Canvas>
  );
};

export default GlobeAnimation;
