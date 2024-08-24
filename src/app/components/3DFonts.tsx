import { useRef } from "react";
import { Mesh, MeshBasicMaterial, Object3D } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

const loadFont = (path: string, loader: FontLoader) => {
	return new Promise((resolve, reject) => {
		loader.load(path, resolve, undefined, reject);
	});
};

const insertTextGeometry = async (myMesh: { current: Mesh }) => {
	const fontLoader = new FontLoader();
	const font = await loadFont("NewAmsterdam_Regular.json", fontLoader);
	const geometry = new TextGeometry("Italinho", {
		font: font,
		size: 0.5,
		height: 0.1,
		depth: 0.04,
	});

	const mesh = new Mesh(geometry, new MeshBasicMaterial({ color: "blue" }));

	mesh.position.x = -0.8;
	mesh.position.y = 2.4;

	const object = new Object3D().add(mesh);

	myMesh.current.add(object);
};

export const Fonts3D = () => {
	const myMesh = useRef<null | Mesh>(null);

	const fontLoader = new FontLoader();

	insertTextGeometry(myMesh);

	return <mesh ref={myMesh}></mesh>;
};
