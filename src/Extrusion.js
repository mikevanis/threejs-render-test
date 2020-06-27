import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

function Extrusion({ start = [0, 0], curves, ...props }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const shape = useMemo(() => {
    let shape = new THREE.Shape();
    console.log("Number of curves: " + curves.length);
    console.log(shape);
    curves.forEach((curve, i) => {
      const currentCurve = curves[i];
      if (i === 0) {
        shape.moveTo(currentCurve.point1.x, currentCurve.point1.y)
        console.log("First point: " + currentCurve.point1.x + ", " + currentCurve.point1.y);
      }
      shape.bezierCurveTo(
        currentCurve.handle1.x, currentCurve.handle1.y,
        currentCurve.handle2.x, currentCurve.handle2.y,
        currentCurve.point2.x, currentCurve.point2.y
      );
      console.log("X: " + currentCurve.point2.x + " Y: " + currentCurve.point2.y);
      console.log(shape);
    });

    shape.closePath();
    return shape;

  }, [start, curves]);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [0.01, 0.01, 0.01]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <extrudeGeometry attach="geometry" args={[shape, props]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Extrusion;
