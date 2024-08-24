import { SRGBColorSpace, TextureLoader } from "three";
import { FontLoader } from "three/examples/jsm/Addons.js";

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
