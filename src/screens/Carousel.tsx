import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CircleGeometry, Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const MODELS_URLS = [
	"guitar",
	"small_drum",
	"saxophone_alto",
	"logitech_audio_speaker",
];

export const Carousel = ({ controls }: { controls }) => {
	const { gl, camera, scene } = useThree();
	const gltfLoader = new GLTFLoader();

	useEffect(() => {
		//Grabs half to be divided into a shape
		const half = MODELS_URLS.length / 2;

		//Create circle to be rotated making it feel like a carousel
		const circleGeometry = new CircleGeometry(4, 80);

		const material = new MeshBasicMaterial({ color: 0xffff00 });

		const circleObject = new Mesh(circleGeometry, material);

		//Rotate to be laid down flatted onto the scene
		circleObject.rotateX(1.65);
		//

		//Add the models to the circle
		MODELS_URLS.map((url, index) => {
			const increment = 3.5;

			const is_odd = (index + 1) % 2 !== 0;

			gltfLoader.load(`models/${url}/scene.gltf`, (gltf) => {
				const root = gltf.scene;

				// Below it will just be scene normalization (position of camera, objects standing up)
				//Separate this into a normalizer outside function
				if (url.includes("saxophone")) root.scale.set(0.35, 0.35, 0.35);
				if (url.includes("guitar")) {
					root.scale.set(0.8, 0.8, 0.8);
					root.rotateX(1.2);
				}
				if (url.includes("logitech")) {
					root.position.y -= 1;
					root.scale.set(8, 8, 8);
				}

				//Common attributes to divide into a square shape into the scene
				//Warning: This solution is a generic one just for square shape
				const positionToSet = is_odd ? -increment : increment;

				root.position[index + 1 > half ? "x" : "z"] = positionToSet;
				//

				scene.add(root);
				scene.add(circleObject);
			});
		});
	}, []);

	useFrame(() => {
		gl.render(scene, camera);
		controls?.update();
	});
	return <></>;
};
