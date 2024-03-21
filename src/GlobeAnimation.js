import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import PropTypes from 'prop-types';

const Globe = () => {
  const mesh = useRef(null);

  // Use the useLoader hook to load the globe texture
  const globeTexture = useLoader(TextureLoader, '/public/logo512.png');

  return (
    <mesh ref={mesh}>
      {/* Use SphereGeometry for the geometry */}
      <sphereGeometry args={[1, 32, 32]} />
      {/* Use MeshStandardMaterial for the material, with the globe texture as the map */}
      <meshStandardMaterial map={globeTexture} />
    </mesh>
  );
};

const FloatingIcon = ({ position, icon }) => {
  const texture = useLoader(TextureLoader, icon);

  return (
    <sprite position={position}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
};

FloatingIcon.propTypes = {
  position: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
};

const GlobeAnimation = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Stars />
      <Globe />
      {/* Example Icon - replace with actual icons and positions */}
      <FloatingIcon position={[5, 0, 0]} icon="/public/logo192.png" />
      <OrbitControls />
    </Canvas>
  );
};

export default GlobeAnimation;