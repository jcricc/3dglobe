import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { TextureLoader, MeshBasicMaterial } from 'three';
import PropTypes from 'prop-types';

const Globe = () => {
  const mesh = useRef(null);

  return (
    <mesh ref={mesh}>
      <sphereGeometry ref={[5, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
      {}
    </mesh>
  );
};

const FloatingIcon = ({ position, icon }) => {
  const texture = new TextureLoader().load(icon);
  const material = new MeshBasicMaterial({ map: texture });

  return (
    <mesh ref={position} material={material}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="white" transparent opacity={0.8} />
      <sprite position={[0, 0, 0]} scale={[1, 1, 1]}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </mesh>
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
      <FloatingIcon position={[5, 0, 0]} icon="/path/to/icon.jpg" />
      <OrbitControls />
    </Canvas>
  );
};

export default GlobeAnimation;
