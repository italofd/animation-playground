"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Lights } from "./components/Lights";
import { MeshFloor } from "./components/meshFloor";
import { CustomOrbitControls } from "./components/CustomOrbitControls";
import { RenderRandomCubes } from "./components/RenderRandomCubes";
import { Testing } from "./components/Testing";
import { Stats } from "@react-three/drei";

export default function Home() {
	const canvasRef = useRef(null);

	return (
		<main className="flex h-screen w-screen bg-slate-200 flex-col items-center justify-between">
			<div className="min-w-full h-screen border-2 border-white bg-slate-500">
				<Canvas
					ref={canvasRef}
					className="h-full"
					style={{
						width: "100%",
						height: "100%",
					}}
				>
					<Lights />
					<MeshFloor />
					<CustomOrbitControls />
					<Testing />
					<Stats />
				</Canvas>
			</div>
		</main>
	);
}
