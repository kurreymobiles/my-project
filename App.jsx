import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function App() {

  const mountRef = useRef(null);

  useEffect(() => {

    /* SCENE */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    /* CAMERA */

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    camera.position.set(0, 50, 400);

    /* RENDERER */

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      window.devicePixelRatio
    );

    mountRef.current.appendChild(
      renderer.domElement
    );

    /* LIGHTS */

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        0.2
      );

    scene.add(ambientLight);

    const pointLight =
      new THREE.PointLight(
        0xffffff,
        4,
        3000
      );

    pointLight.position.set(0, 0, 0);

    scene.add(pointLight);

    /* STARS */

    const starsGeometry =
      new THREE.BufferGeometry();

    const starVertices = [];

    for (let i = 0; i < 15000; i++) {

      const x =
        (Math.random() - 0.5) * 5000;

      const y =
        (Math.random() - 0.5) * 5000;

      const z =
        (Math.random() - 0.5) * 5000;

      starVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        starVertices,
        3
      )
    );

    const starsMaterial =
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2
      });

    const stars =
      new THREE.Points(
        starsGeometry,
        starsMaterial
      );

    scene.add(stars);

    /* SUN */

    const sunGeometry =
      new THREE.SphereGeometry(
        50,
        64,
        64
      );

    const sunMaterial =
      new THREE.MeshStandardMaterial({
        emissive: 0xff9900,
        emissiveIntensity: 3,
        color: 0xffcc00
      });

    const sun =
      new THREE.Mesh(
        sunGeometry,
        sunMaterial
      );

    scene.add(sun);

    /* SUN GLOW */

    const glowGeometry =
      new THREE.SphereGeometry(
        65,
        64,
        64
      );

    const glowMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xff8800,
        transparent: true,
        opacity: 0.25
      });

    const glow =
      new THREE.Mesh(
        glowGeometry,
        glowMaterial
      );

    scene.add(glow);

    /* PLANETS FUNCTION */

    function createPlanet({
      size,
      color,
      distance,
      speed
    }) {

      const geometry =
        new THREE.SphereGeometry(
          size,
          64,
          64
        );

      const material =
        new THREE.MeshStandardMaterial({
          color
        });

      const planet =
        new THREE.Mesh(
          geometry,
          material
        );

      scene.add(planet);

      /* ORBIT */

      const orbitGeometry =
        new THREE.RingGeometry(
          distance - 1,
          distance + 1,
          128
        );

      const orbitMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.2
        });

      const orbit =
        new THREE.Mesh(
          orbitGeometry,
          orbitMaterial
        );

      orbit.rotation.x =
        Math.PI / 2;

      scene.add(orbit);

      return {
        mesh: planet,
        distance,
        speed,
        angle: Math.random() * Math.PI * 2
      };
    }

    /* PLANETS */

    const mercury =
      createPlanet({
        size: 7,
        color: 0x999999,
        distance: 90,
        speed: 0.02
      });

    const venus =
      createPlanet({
        size: 12,
        color: 0xffaa33,
        distance: 140,
        speed: 0.015
      });

    const earth =
      createPlanet({
        size: 14,
        color: 0x3399ff,
        distance: 200,
        speed: 0.01
      });

    const mars =
      createPlanet({
        size: 10,
        color: 0xff3300,
        distance: 260,
        speed: 0.008
      });

    const jupiter =
      createPlanet({
        size: 28,
        color: 0xd2b48c,
        distance: 350,
        speed: 0.005
      });

    const saturn =
      createPlanet({
        size: 24,
        color: 0xf7d774,
        distance: 470,
        speed: 0.003
      });

    /* SATURN RING */

    const ringGeometry =
      new THREE.RingGeometry(
        35,
        50,
        64
      );

    const ringMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });

    const saturnRing =
      new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

    saturnRing.rotation.x =
      Math.PI / 2;

    saturn.mesh.add(saturnRing);

    /* MOON */

    const moonGeometry =
      new THREE.SphereGeometry(
        4,
        32,
        32
      );

    const moonMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xffffff
      });

    const moon =
      new THREE.Mesh(
        moonGeometry,
        moonMaterial
      );

    scene.add(moon);

    /* LABELS */

    function createLabel(text) {

      const div =
        document.createElement("div");

      div.innerHTML = text;

      div.style.position = "absolute";
      div.style.color = "white";
      div.style.fontSize = "14px";
      div.style.pointerEvents = "none";

      document.body.appendChild(div);

      return div;
    }

    const labels = {
      Mercury: createLabel("Mercury"),
      Venus: createLabel("Venus"),
      Earth: createLabel("Earth"),
      Mars: createLabel("Mars"),
      Jupiter: createLabel("Jupiter"),
      Saturn: createLabel("Saturn")
    };

    /* POSITION LABEL */

    function updateLabel(
      label,
      object
    ) {

      const vector =
        object.position.clone();

      vector.project(camera);

      const x =
        (vector.x * 0.5 + 0.5) *
        window.innerWidth;

      const y =
        (-vector.y * 0.5 + 0.5) *
        window.innerHeight;

      label.style.left = `${x}px`;
      label.style.top = `${y}px`;
    }

    /* ANIMATION */

    function animate() {

      requestAnimationFrame(
        animate
      );

      stars.rotation.y += 0.0003;

      const planets = [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn
      ];

      planets.forEach((planet) => {

        planet.angle +=
          planet.speed;

        planet.mesh.position.x =
          Math.cos(
            planet.angle
          ) * planet.distance;

        planet.mesh.position.z =
          Math.sin(
            planet.angle
          ) * planet.distance;

        planet.mesh.rotation.y +=
          0.01;
      });

      /* MOON */

      moon.position.x =
        earth.mesh.position.x +
        Math.cos(Date.now() * 0.003)
        * 25;

      moon.position.z =
        earth.mesh.position.z +
        Math.sin(Date.now() * 0.003)
        * 25;

      /* LABELS */

      updateLabel(
        labels.Mercury,
        mercury.mesh
      );

      updateLabel(
        labels.Venus,
        venus.mesh
      );

      updateLabel(
        labels.Earth,
        earth.mesh
      );

      updateLabel(
        labels.Mars,
        mars.mesh
      );

      updateLabel(
        labels.Jupiter,
        jupiter.mesh
      );

      updateLabel(
        labels.Saturn,
        saturn.mesh
      );

      renderer.render(
        scene,
        camera
      );
    }

    animate();

    /* RESIZE */

    window.addEventListener(
      "resize",
      () => {

        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }
    );

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden"
      }}
    />
  );
}