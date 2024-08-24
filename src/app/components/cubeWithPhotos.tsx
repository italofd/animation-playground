"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	SRGBColorSpace,
	TextureLoader,
} from "three";

function loadColorTexture(path: string, loader: TextureLoader) {
	const texture = loader.load(path);
	texture.colorSpace = SRGBColorSpace;
	return texture;
}

export const CubeWithPhotos = () => {
	const myMesh = useRef<null | Mesh>(null);
	const alreadyAdded = useRef(false);

	const loader = new TextureLoader();

	useFrame(() => {
		if (myMesh.current && myMesh.current.rotation) {
			myMesh.current.rotation.x += 0.01;
			myMesh.current.rotation.y += 0.01;
		}
	});

	const Materials = Array.from(Array(6).keys()).map(
		(i) =>
			new MeshBasicMaterial({
				map: loadColorTexture(`photo${i + 1}.jpg`, loader),
			})
	);

	const cube = new Mesh(new BoxGeometry(), Materials);

	useEffect(() => {
		if (!alreadyAdded.current && myMesh.current) {
			myMesh.current.add(cube);

			alreadyAdded.current = true;
		}
	}, [myMesh?.current?.add]);

	return <mesh ref={myMesh}></mesh>;
};
