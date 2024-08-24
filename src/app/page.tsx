"use client";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import Image from "next/image";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CustomMesh } from "./components/dotedSphereWithOrbitControls";
import { CubeWithPhotos } from "./components/cubeWithPhotos";
import { Fonts3D } from "./components/3DFonts";

export default function Home() {
	const canvasRef = useRef(null);

	console.log("EVA03", canvasRef);

	return (
		<main className="flex h-screen bg-slate-200 flex-col items-center justify-between p-24">
			Pega nois Malandragem 🔥😄🔥
			<div className="w-full h-full border-2 border-white">
				<Canvas ref={canvasRef}>
					<ambientLight intensity={0.3} />
					<directionalLight args={[0xffffff, 1]} position={[1, 1, 1]} />
					<CustomMesh />
					<Fonts3D />
					<CubeWithPhotos />
				</Canvas>
			</div>
		</main>
	);
}
