import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const CustomOrbitControls = () => {
	const {
		camera,
		gl: { domElement },
	} = useThree();

	const controls = new OrbitControls(camera, domElement);

	//Controls configuration
	controls.enableDamping = true;
	controls.enableZoom = true;
	controls.dampingFactor = 0.1;
	controls.rotateSpeed = 0.1;

	return <></>;
};
