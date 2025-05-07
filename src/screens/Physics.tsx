import { useFrame, useThree } from "@react-three/fiber";

import { phy, math } from "phy-engine";
import { useEffect } from "react";

function physicsReady() {
	phy.set({ substep: 1, gravity: [0, -9.81, 0], fps: 60 });
	phy.add({ type: "plane", size: [300, 1, 300], visible: true });
	phy.add({ type: "box", size: [1, 1, 1], pos: [0, 4, 0], mass: 1 });
	phy.add({ type: "sphere", size: [0.5], pos: [0, 6, 0], mass: 1 });
	phy.add({
		type: "sphere",
		size: [0.5],
		pos: [0, 6, 0],
		mass: 1,
	});
	phy.add({
		type: "sphere",
		size: [0.5],
		pos: [0, 6, 0],
		mass: 1,
	});
}

export const Physics = () => {
	const { gl, camera, scene } = useThree();

	useEffect(() => {
		// init phy-engine
		camera.position.y += 2;

		phy.init({
			type: "AMMO",
			worker: true,
			compact: true,
			scene: scene,
			renderer: gl,
			callback: physicsReady,
		});
	}, [gl, scene]);

	return <></>;
};
