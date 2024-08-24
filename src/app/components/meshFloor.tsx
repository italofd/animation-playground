"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const planeSize = 40;

export const MeshFloor = () => {
	const myMesh = useRef<null | THREE.Mesh>(null);

	const loader = new THREE.TextureLoader();
	const texture = loader.load("checker.png");

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.magFilter = THREE.NearestFilter;
	texture.colorSpace = THREE.SRGBColorSpace;

	const repeats = planeSize / 2;
	texture.repeat.set(repeats, repeats);

	const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
	const planeMat = new THREE.MeshPhongMaterial({
		map: texture,
		side: THREE.DoubleSide,
	});
	const mesh = new THREE.Mesh(planeGeo, planeMat);

	mesh.rotation.x = Math.PI * -0.5;

	mesh.position.y = -2.2;

	useEffect(() => {
		if (myMesh.current) {
			myMesh.current.castShadow = false;
			myMesh.current.receiveShadow = true;
			myMesh.current.add(mesh);
		}
	}, [myMesh?.current]);

	return <mesh ref={myMesh}></mesh>;
};
