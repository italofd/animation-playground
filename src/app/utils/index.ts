import { SRGBColorSpace, TextureLoader, WebGLRenderer } from "three";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { XYCord } from "./types";

export const loadColorTexture = (path: string, loader: TextureLoader) => {
	const texture = loader.load(path);
	texture.colorSpace = SRGBColorSpace;
	return texture;
};

export const loadFont = (path: string, loader: FontLoader) => {
	return new Promise((resolve, reject) => {
		loader.load(path, resolve, undefined, reject);
	});
};

export function clearPickPosition(pickPosition: XYCord) {
	// unlike the mouse which always has a position
	// if the user stops touching the screen we want
	// to stop picking. For now we just pick a value
	// unlikely to pick something
	pickPosition.x = -100000;
	pickPosition.y = -100000;
}

export function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}

	return needResize;
}

export function getCanvasRelativePosition(
	event: MouseEvent,
	canvas: HTMLCanvasElement
) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: ((event.clientX - rect.left) * canvas.width) / rect.width,
		y: ((event.clientY - rect.top) * canvas.height) / rect.height,
	};
}

export function setPickPosition(
	event: MouseEvent,
	canvas: HTMLCanvasElement,
	pickPosition: XYCord
) {
	const pos = getCanvasRelativePosition(event, canvas);
	pickPosition.x = (pos.x / canvas.width) * 2 - 1;
	pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y
}
