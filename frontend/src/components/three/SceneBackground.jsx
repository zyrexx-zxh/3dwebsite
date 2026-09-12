import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import WireframeGeometry from "./WireframeGeometry";

// Sits fixed behind the entire page. pointer-events: none so it never
// intercepts clicks — react-three-fiber still reads pointer position
// from window events for the parallax effect in WireframeGeometry.
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <WireframeGeometry />
        </Suspense>
      </Canvas>
      {/* Radial vignette so the wireframe recedes toward the page edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090d_78%)]" />
    </div>
  );
}
