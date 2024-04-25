import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      {/* Main Canvas for rendering 3D scene */}
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        {/* Setting background color and fog */}
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />

        {/* Wrapping Experience component in Suspense for async loading */}
        <Suspense>
          <Experience />
        </Suspense>

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>

      {/* Home component for non-3D content */}
      <Home />
    </>
  );
}

export default App;
