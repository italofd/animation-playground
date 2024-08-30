import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshPhongMaterial, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { pickHelper } from "../utils/pickHelper";
import {
	clearPickPosition,
	resizeRendererToDisplaySize,
	setPickPosition,
} from "../utils";

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const rand = (min: number, max?: number) => {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return min + (max - min) * Math.random();
};

const randomColor = () => {
	return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
};

export const RenderRandomCubes = () => {
	const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
	const threeCanvas = useThree();

	const { gl, camera, scene } = threeCanvas;

	const pickPosition = { x: 0, y: 0 };

	const pickFunction = pickHelper();
	clearPickPosition(pickPosition);

	const numObjects = 200;

	window.addEventListener("mousemove", (e) =>
		setPickPosition(e, gl.domElement, pickPosition)
	);
	window.addEventListener("mouseout", (e) => clearPickPosition(pickPosition));
	window.addEventListener("mouseleave", () => clearPickPosition(pickPosition));

	const status = new Stats();
	gl?.domElement?.parentElement?.appendChild(status.dom);

	useFrame((time) => {
		status.begin();

		if (resizeRendererToDisplaySize(gl)) {
			const canvas = gl.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		pickFunction.pick(pickPosition, scene, camera, time);

		status.end();
		gl.render(scene, camera);
	});

	useEffect(() => {
		for (let i = 0; i < numObjects; ++i) {
			const material = new MeshPhongMaterial({
				color: randomColor(),
			});

			const cube = new Mesh(geometry, material);
			threeCanvas.scene.add(cube);

			cube.position.set(rand(-20, 20), rand(0, 40), rand(-20, 20));
			cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
			cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));
		}
	}, []);

	return <></>;
};
