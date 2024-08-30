import { Caustics, MeshTransmissionMaterial, Stats } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ConeGeometry, CylinderGeometry, Mesh } from "three";
import { pickHelper } from "../utils/pickHelper";
import { clearPickPosition, setPickPosition } from "../utils";

export const Testing = () => {
	const coneMesh = useRef<null | Mesh>(null);
	const boxMesh = useRef<null | Mesh>(null);
	const cylinderMesh = useRef<null | Mesh>(null);
	const { gl, camera, scene } = useThree();

	const picker = pickHelper();

	const pickPosition = { x: 0, y: 0 };

	window.addEventListener("mousemove", (e) =>
		setPickPosition(e, gl.domElement, pickPosition)
	);
	window.addEventListener("mouseout", () => clearPickPosition(pickPosition));
	window.addEventListener("mouseleave", () => clearPickPosition(pickPosition));

	useFrame((time) => {
		if (boxMesh.current && boxMesh.current.rotation) {
			boxMesh.current.rotation.x += 0.01;
			boxMesh.current.rotation.y += 0.01;
		}
		if (coneMesh.current && coneMesh.current.rotation) {
			coneMesh.current.rotation.x += 0.01;
			coneMesh.current.rotation.y += 0.01;
		}
		if (cylinderMesh.current && cylinderMesh.current.rotation) {
			cylinderMesh.current.rotation.x += 0.01;
			cylinderMesh.current.rotation.y += 0.01;
		}

		picker.pick(pickPosition, scene, camera, time);

		gl.render(scene, camera);
	});

	return (
		<>
			<mesh position={[0, 0.1, -1]} scale={0.5} ref={boxMesh}>
				<boxGeometry args={[4, 4, 4]} />
				<MeshTransmissionMaterial
					resolution={1920}
					distortion={0.25}
					color="#FF8F20"
					thickness={0.5}
					anisotropy={1}
					roughness={0.5}
				/>
			</mesh>
			<mesh position={[4, 0.3, -1]} scale={0.5} ref={coneMesh}>
				<coneGeometry args={[3, 6, 10]} />
				<MeshTransmissionMaterial
					resolution={1920}
					distortion={0.25}
					color="#FF8F20"
					thickness={2}
					anisotropy={1}
					roughness={0.5}
				/>
			</mesh>
			<mesh position={[-4, 0.1, -1]} scale={0.5} ref={cylinderMesh}>
				<cylinderGeometry args={[3, 3, 5, 100, 3]} />
				<MeshTransmissionMaterial
					resolution={1920}
					distortion={0.25}
					color="#FF8F20"
					thickness={2}
					anisotropy={1}
					roughness={0.5}
				/>
			</mesh>
		</>
	);
};
