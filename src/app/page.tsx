"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { CustomMesh } from "./components/dotedSphereWithOrbitControls";
import { CubeWithPhotos } from "./components/cubeWithPhotos";
import { Fonts3D } from "./components/3DFonts";
import { MeshFloor } from "./components/meshFloor";
import { Lights } from "./components/Lights";

export default function Home() {
	const canvasRef = useRef(null);

	return (
		<main className="flex h-screen bg-slate-200 flex-col items-center justify-between p-24">
			Pega nois Malandragem 🔥😄🔥
			<div className="w-full h-full border-2 border-white">
				<Canvas ref={canvasRef}>
					<Lights />
					<CustomMesh />
					<Fonts3D />
					<CubeWithPhotos />
					<MeshFloor />
				</Canvas>
			</div>
		</main>
	);
}
