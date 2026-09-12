import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// A slow-rotating icosahedron wireframe with a soft point-cloud halo.
// Rotation drifts continuously and eases toward the pointer position,
// so the scene feels alive without ever demanding attention.
export default function WireframeGeometry() {
  const groupRef = useRef();
  const coreRef = useRef();
  const pointer = useThree((state) => state.pointer);

  const pointsGeometry = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.08;
      coreRef.current.rotation.x += delta * 0.02;
    }
    if (groupRef.current) {
      // Gentle parallax: the whole scene eases toward the pointer.
      const targetX = pointer.y * 0.25;
      const targetY = pointer.x * 0.35;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[2.1, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[2.1, 0]} />
          <meshBasicMaterial color="#a3ff00" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#7dd3fc" size={0.02} transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
}
