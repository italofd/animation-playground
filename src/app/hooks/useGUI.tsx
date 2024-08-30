import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo } from "react";
import { AmbientLight, DirectionalLight, DirectionalLightHelper } from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

class ColorGUIHelper {
	constructor(object, prop) {
		this.object = object;
		this.prop = prop;
	}
	get value() {
		return `#${this.object[this.prop].getHexString()}`;
	}
	set value(hexString) {
		this.object[this.prop].set(hexString);
	}
}

const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
	const folder = gui.addFolder(name);
	folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
	folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
	folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
	folder.open();
};

/**
 * Set all the necessary GUI helpers for the lights (for now)
 * Can be expanded to other objects
 */
export const useGUI = ({
	ambientLightRef,
	directionalLightRef,
}: {
	ambientLightRef: { current: AmbientLight | null };
	directionalLightRef: { current: DirectionalLight | null };
}) => {
	//Use memo prevents double GUI to be created
	const gui = useMemo(() => new GUI(), []);
	const { scene } = useThree();

	gui.close();

	//Ambient Light Section
	useEffect(() => {
		const ambientLightsfolder = gui.addFolder("Ambient Lights");

		if (ambientLightRef?.current) {
			ambientLightsfolder
				.addColor(new ColorGUIHelper(ambientLightRef.current, "color"), "value")
				.name("color");
			ambientLightsfolder.add(ambientLightRef.current, "intensity", 0, 2, 0.01);
		}
	}, [ambientLightRef]);

	//Directional Light Section
	useEffect(() => {
		if (directionalLightRef?.current) {
			const directionalLightsfolder = gui.addFolder("Directional Lights");

			const updateLight = () => {
				directionalLightRef?.current?.target.updateMatrixWorld();
				helper.update();
			};

			//Helper Section
			const helper = new DirectionalLightHelper(directionalLightRef.current);

			scene.add(helper);

			makeXYZGUI(
				gui,
				directionalLightRef.current.position,
				"position",
				updateLight
			);
			makeXYZGUI(
				gui,
				directionalLightRef.current.target.position,
				"target",
				updateLight
			);

			//

			//GUI Section
			directionalLightsfolder
				.addColor(
					new ColorGUIHelper(directionalLightRef.current, "color"),
					"value"
				)
				.name("color");
			directionalLightsfolder.add(
				directionalLightRef.current,
				"intensity",
				0,
				2,
				0.01
			);
		}
	}, [directionalLightRef]);
};
