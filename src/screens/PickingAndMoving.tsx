import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import {
	Camera,
	Event,
	Mesh,
	Object3D,
	Raycaster,
	Scene,
	Vector2,
} from "three";

function onPointerMove(event: MouseEvent, pointer: Vector2) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const customPickAndDrag = (
	raycaster: Raycaster,
	pointer: Vector2,
	camera: Camera,
	scene: Scene,
	lastObject: MutableRefObject<Object3D>
) => {
	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera(pointer, camera);

	// calculate objects intersecting the picking ray
	const [intersected] = raycaster.intersectObjects(scene.children);

	if (lastObject.current) lastObject.current.material?.color.set("#fff");

	lastObject.current = intersected?.object;

	if (!intersected) return;

	intersected.object?.material?.color.set(0xff0000);
};

export const PickingAndMoving = () => {
	const boxMesh = useRef<null | Mesh>(null);
	const pointer = new Vector2();
	const raycaster = new Raycaster();
	const lastObject = useRef<Object3D | null>(null);
	const pickedObject = useRef<Object3D | null>(null);

	const { gl, camera, scene } = useThree();

	// Testing the scene with first just a vision above 90 degree

	useEffect(() => {
		camera.position.y = 30;
		camera.position.x = 0;
		camera.position.z = 0;
		camera.rotateX(4.7);
	}, []);

	window.addEventListener("mousemove", (e) => onPointerMove(e, pointer));

	window.addEventListener("mousedown", (e) => {
		e.preventDefault();
		raycaster.setFromCamera(pointer, camera);

		const [intersected] = raycaster.intersectObjects(scene.children);

		if (!intersected || !intersected.object.material) return;

		pickedObject.current = intersected.object;

		e.stopPropagation();
	});

	window.addEventListener("mouseup", () => {
		pickedObject.current = null;
	});

	useFrame(() => {
		customPickAndDrag(raycaster, pointer, camera, scene, lastObject);

		if (pickedObject.current) {
			pickedObject.current.position.x = pointer.x * 24;
			pickedObject.current.position.z = -(pointer.y * 24);
		}

		gl.render(scene, camera);
	});

	return (
		<mesh ref={boxMesh}>
			<boxGeometry args={[4, 4, 4]} />
			<meshPhongMaterial reflectivity={0.5} color="#034078" />
		</mesh>
	);
};
