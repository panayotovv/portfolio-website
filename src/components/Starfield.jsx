import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    camera.position.z = 0;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // STARS
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = -Math.random() * 2000;

      velocities[i] = 0.5 + Math.random() * 1.5;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ANIMATION
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posArray = starGeometry.attributes.position.array;

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;

        posArray[i3 + 2] += velocities[i];

        if (posArray[i3 + 2] > 5) {
          posArray[i3] = (Math.random() - 0.5) * 2000;
          posArray[i3 + 1] = (Math.random() - 0.5) * 2000;
          posArray[i3 + 2] = -2000;
        }
      }

      stars.rotation.z += 0.0005;
      starGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
  <div
    ref={mountRef}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      zIndex: -1,
      pointerEvents: "none"
    }}
  />
);
}

