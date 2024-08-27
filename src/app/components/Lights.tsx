import { useRef } from "react";
import { useGUI } from "../hooks/useGUI";
import { AmbientLight, DirectionalLight, Light } from "three";

export const Lights = () => {
	const lightRef = useRef<AmbientLight | null>(null);
	const directionalLight = useRef<DirectionalLight | null>(null);

	useGUI({
		ambientLightRef: lightRef,
		directionalLightRef: directionalLight,
	});

	return (
		<>
			<ambientLight ref={lightRef} />
			<directionalLight ref={directionalLight} />
		</>
	);
};
