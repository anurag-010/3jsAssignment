// Importing necessary components and utilities from libraries
import { 
  CameraControls, 
  Environment, 
  Float,  
  MeshReflectorMaterial,  
  RenderTexture,  
  Text, 
  useFont
} from "@react-three/drei";

import { SwampIsland } from './SwampIsland';
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect, useRef, useState } from "react";
import { Color } from "three";
import { currentPageAtom } from "./Home";
import { useAtom } from "jotai";
import { useFrame } from "@react-three/fiber";

// Preparing a color for bloom effect
const bloomColor  = new Color("#fff")
bloomColor.multiplyScalar(1.3); // Scaling the color for bloom effect

// Defining the main component
export const Experience = () => {
  // Refs for camera controls and specific mesh elements
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
 

  // Using Jotai for state management
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // Function to set up initial camera position and transition to home page
  const intro = async () => {
    controls.current.dolly(-22); // Pushing the camera back
    controls.current.smoothTime = 1.6; // Setting smooth transition time for camera
    setTimeout(() => {
      setCurrentPage("home"); // Changing the current page after a delay
    }, 1200);
    fitCamera(); // Method to position the camera correctly
  };

  // Function to adjust camera position based on current page
  const fitCamera = async () => {
    if (currentPage === "store") {
      controls.current.smoothTime = 0.8;
      controls.current.fitToBox(meshFitCameraStore.current, true);
    } else {
      controls.current.smoothTime = 1.6;
      controls.current.fitToBox(meshFitCameraHome.current, true);
    }
  };

  // Effect hook for initial setup
  useEffect(() => {
    intro(); // Running the intro function when component mounts
  }, []);

  // Effect hook to adjust camera on page change and handle window resize
  useEffect(() => {
    fitCamera(); // Adjusting camera position
    window.addEventListener("resize", fitCamera); // Adding resize event listener
    return () => window.removeEventListener("resize", fitCamera); // Removing event listener on component unmount
  }, [currentPage]);

  // Rendering the 3D scene
  return (
    <>
      {/* Camera controls component */}
      <CameraControls ref={controls} />

      {/* Invisible mesh for positioning the camera */}
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>

      {/* Text component with 3D elements */}
      <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(30)}
        anchorY={"bottom"}
      >
        MY LITTLE{"\n"}ISLAND
        {/* 3D environment with swamp island */}
        <meshBasicMaterial color={bloomColor} toneMapped={false} >
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#fff"]} />
            <Environment preset="sunset" />
            <Float floatIntensity={4} rotationIntensity={5}>
              <SwampIsland
                scale={1.6}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>

      {/* Group of 3D elements */}
      <group rotation-y={degToRad(-25)} position-x={3}>
        {/* Swamp island */}
        <SwampIsland scale={0.6} />

        {/* Invisible mesh for positioning the camera on the store page */}
        <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Reflector material for ground */}
      <mesh position={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.6}
        />
      </mesh>

      {/* 3D environment */}
      <Environment preset="sunset" />
    </>
  );
};

// Preloading font resource for better performance
useFont.preload("fonts/Poppins-Black.ttf");
