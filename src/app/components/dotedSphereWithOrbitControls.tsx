"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export const DotedSphereAndOrbitControls = () => {
	const myMesh = useRef<null | Mesh>(null);

	let accelerationRef = useRef(0.01);

	useFrame(() => {
		//The optimal thing would have to be another way to do this, but I'm not sure how to.
		// addEventListener("click", (e) => {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	accelerationRef.current += 0.001;
		// });
		//

		//There is a number of ways to make a object rotate, this is very simple and works well.
		if (myMesh && myMesh.current && myMesh?.current?.rotation) {
			// myMesh.current.rotation.x = clock.getElapsedTime() / 2;
			myMesh.current.rotation.y += 0.01 + accelerationRef.current / 30;

			myMesh.current.rotation.x += 0.01 + accelerationRef.current / 20;
		}

		removeEventListener("click", () => {});
	});

	return (
		<mesh ref={myMesh}>
			<points>
				<sphereGeometry args={[2, 10, 6]} />
				<pointsMaterial color={"blue"} size={0.2} />
			</points>
		</mesh>
	);
};
