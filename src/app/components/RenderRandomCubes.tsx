import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { BoxGeometry, Mesh, MeshPhongMaterial, Raycaster } from "three";

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

function clearPickPosition(pickPosition) {
	// unlike the mouse which always has a position
	// if the user stops touching the screen we want
	// to stop picking. For now we just pick a value
	// unlikely to pick something
	pickPosition.x = -100000;
	pickPosition.y = -100000;
}

//
class PickHelper {
	constructor() {
		this.raycaster = new Raycaster();
		this.pickedObject = null;
		this.pickedObjectSavedColor = 0;
	}
	pick(normalizedPosition, scene, camera, time) {
		// restore the color if there is a picked object
		if (this.pickedObject) {
			this.pickedObject?.material?.emissive?.setHex?.(
				this.pickedObjectSavedColor
			);
			this.pickedObject = undefined;
		}

		// cast a ray through the frustum
		this.raycaster.setFromCamera(normalizedPosition, camera);
		// get the list of objects the ray intersected
		const intersectedObjects = this.raycaster.intersectObjects(scene.children);
		if (intersectedObjects.length) {
			// pick the first object. It's the closest one
			this.pickedObject = intersectedObjects[0].object;
			// save its color
			console.log("EVA02", this.pickedObject);

			this.pickedObjectSavedColor =
				this.pickedObject?.material?.emissive?.getHex?.();
			// set its emissive color to flashing red/yellow

			console.log("EVA03", time, time % 2);

			this.pickedObject?.material?.emissive?.setHex?.(
				(time.clock.elapsedTime * 6) % 2 > 1 ? 0xffff00 : 0xff0000
			);
		}
	}
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}

	return needResize;
}

function getCanvasRelativePosition(event: MouseEvent, canvas) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: ((event.clientX - rect.left) * canvas.width) / rect.width,
		y: ((event.clientY - rect.top) * canvas.height) / rect.height,
	};
}

function setPickPosition(event: MouseEvent, canvas, pickPosition) {
	const pos = getCanvasRelativePosition(event, canvas);
	pickPosition.x = (pos.x / canvas.width) * 2 - 1;
	pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y
}

export const RenderRandomCubes = () => {
	const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
	const threeCanvas = useThree();

	const { gl, camera, scene } = threeCanvas;

	const pickPosition = { x: 0, y: 0 };

	const pickHelper = new PickHelper();
	clearPickPosition(pickPosition);

	const numObjects = 50;

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

	window.addEventListener("mousemove", (e) =>
		setPickPosition(e, gl.domElement, pickPosition)
	);
	window.addEventListener("mouseout", (e) => clearPickPosition(pickPosition));
	window.addEventListener("mouseleave", () => clearPickPosition(pickPosition));

	function render(time) {
		// time *= 0.001; // convert to seconds;

		if (resizeRendererToDisplaySize(gl)) {
			const canvas = gl.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		pickHelper.pick(pickPosition, scene, camera, time);

		gl.render(scene, camera);
	}

	useFrame(render);

	return <></>;
};
