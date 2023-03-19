import * as THREE from 'three'
import EarthSkin from '../assets/images/earthskin.jpg';

export const getEarthModel = (radius = 3, widthSegment = 64, heightSegment = 64) => {
    // creating earct sphere
    const geometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
    const material = new THREE.MeshPhongMaterial({
        metalness: 0,
        roughness: 0.2,
        shininess: 50,
        map: new THREE.TextureLoader().load(EarthSkin)
    });

    const Earth = new THREE.Mesh(geometry, material);
    return Earth;
}
