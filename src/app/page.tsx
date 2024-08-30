"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Lights } from "./components/Lights";
import { MeshFloor } from "./components/meshFloor";
import { CustomOrbitControls } from "./components/CustomOrbitControls";
import { RenderRandomCubes } from "./components/RenderRandomCubes";

export default function Home() {
	const canvasRef = useRef(null);

	return (
		<main className="flex h-screen bg-slate-200 flex-col items-center justify-between p-24">
			Pega nois Malandragem 🔥😄🔥
			<div className="w-full h-full border-2 border-white bg-black">
				<Canvas ref={canvasRef}>
					<Lights />
					<MeshFloor />
					<CustomOrbitControls />
					<RenderRandomCubes />
				</Canvas>
			</div>
		</main>
	);
}
