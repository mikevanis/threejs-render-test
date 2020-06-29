import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

function Extrusion({ curves, ...props }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const shape = useMemo(() => {
    let shape = new THREE.Shape();

    const centreCoord = (p) => {
      const width = window.innerWidth / 2;
      const height = window.innerHeight / 2;
  		// move to the center
  		p.x -= 200;
  		p.y += 200;
  		return p;
  	}

    console.log("Number of curves: " + curves.length);
    console.log(shape);
    curves.forEach((curve, i) => {
      const currentCurve = curves[i];
      const p1 = currentCurve.point1;
      const p2 = currentCurve.point2;
      const h1 = currentCurve.handle1;
      const h2 = currentCurve.handle2;
      if (i === 0) {
        shape.moveTo(p1.x, p1.y);
        console.log("First point: " + p1);
      }
      shape.bezierCurveTo(
        p1.x + h1.x, p1.y + h1.y,
        p2.x + h2.x, p2.y + h2.y,
        p2.x, p2.y
      );
    });

    shape.closePath();
    return shape;

  }, [curves]);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [0.02, 0.02, 0.02] : [0.01, 0.01, 0.01]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <extrudeGeometry attach="geometry" args={[shape, props]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Extrusion;
