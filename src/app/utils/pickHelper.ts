import { Camera, Clock, Raycaster, Scene } from "three";

export const pickHelper = () => {
	const raycaster = new Raycaster();
	let pickedObject: null = null;
	let pickedObjectSavedColor = 0;
	let objectsToReturnNormal: {
		[key: string]: {};
	} = {};

	const pick = (
		normalizedPosition,
		scene: Scene,
		camera: Camera,
		time: { clock: Clock }
	) => {
		if (Object.keys(objectsToReturnNormal).length) {
			Object.keys(objectsToReturnNormal).forEach((object) => {
				if (pickedObject?.uuid !== object) {
					if (
						objectsToReturnNormal[object].position.y >= 0 &&
						objectsToReturnNormal[object].position.y <= 3.1
					) {
						objectsToReturnNormal[object].position.y -= 0.03;
					}
				}
			});
		}
		// restore the color if there is a picked object
		if (pickedObject) {
			pickedObject?.material?.emissive?.setHex?.(pickedObjectSavedColor);

			objectsToReturnNormal[pickedObject.uuid] = pickedObject;
			pickedObject = undefined;
		}

		console.log("EVA01", objectsToReturnNormal);

		// cast a ray through the frustum
		raycaster.setFromCamera(normalizedPosition, camera);
		// get the list of objects the ray intersected
		const intersectedObjects = raycaster
			.intersectObjects(scene.children)
			.filter(
				(object) =>
					object.object.geometry.type !== "PlaneGeometry" &&
					object.object.parent.type !== "DirectionalLightHelper"
			);
		if (intersectedObjects.length) {
			// pick the first object. It's the closest one
			pickedObject = intersectedObjects[0].object;
			// save its color

			console.log(
				"EVA04",
				1 - Math.pow(1 - pickedObject?.position?.y, 5) / 10,
				pickedObject?.position?.y
			);
			if (pickedObject.position.y < 10) pickedObject.position.y += 0.05;
			pickedObject.rotation.x += 0.02;

			console.log(pickedObject);

			pickedObjectSavedColor = pickedObject?.material?.emissive?.getHex?.();
			// set its emissive color to flashing red/yellow

			pickedObject?.material?.emissive?.setHex?.(
				(time.clock.elapsedTime * 6) % 2 > 1 ? 0xffff00 : 0xff0000
			);
		}
	};

	return { pick };
};
