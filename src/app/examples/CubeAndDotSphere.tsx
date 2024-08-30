import { Fonts3D } from "../components/3DFonts";
import { CubeWithPhotos } from "../components/cubeWithPhotos";
import { DotedSphereAndOrbitControls } from "../components/dotedSphereWithOrbitControls";
import { MeshFloor } from "../components/meshFloor";

export const CubeAndDothSphere = () => {
	return (
		<>
			<Fonts3D />
			<CubeWithPhotos />
			<MeshFloor />
			<DotedSphereAndOrbitControls />
		</>
	);
};
