import { Camera, Clock, Intersection, Raycaster, Scene } from "three";

export const pickHelper = () => {
	const raycaster = new Raycaster();
	let pickedObject: null | Intersection["object"] = null;
	let pickedObjectSavedColor = 0;
	let objectsToReturnNormal: {
		[key: string]: Intersection["object"];
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
					if (objectsToReturnNormal[object].position.y >= 0) {
						objectsToReturnNormal[object].position.y -= 0.03;
					}
				}
			});
		}

		// restore the color if there is a picked object
		if (pickedObject) {
			pickedObject?.material?.emissive?.setHex?.(pickedObjectSavedColor);

			objectsToReturnNormal[pickedObject.uuid] = pickedObject;
			pickedObject = null;
		}

		// cast a ray through the frustum
		raycaster.setFromCamera(normalizedPosition, camera);

		// get the list of objects the ray intersected
		const intersectedObjects = raycaster
			.intersectObjects(scene.children)
			.filter(
				(object) =>
					// Ignore objects that we dont want to pick
					object.object.geometry.type !== "PlaneGeometry" &&
					object?.object?.parent?.type !== "DirectionalLightHelper"
			);

		if (intersectedObjects.length) {
			// pick the first object. It's the closest one
			pickedObject = intersectedObjects[0].object;
			// save its color

			if (pickedObject.position.y < 4) pickedObject.position.y += 0.02;
			pickedObject.rotation.x += 0.02;

			pickedObjectSavedColor = pickedObject?.material?.emissive?.getHex?.();
			// set its emissive color to flashing red/yellow

			pickedObject?.material?.emissive?.setHex?.(
				(time.clock.elapsedTime * 6) % 2 > 1 ? 0xffff00 : 0xff0000
			);
		}
	};

	return { pick };
};
