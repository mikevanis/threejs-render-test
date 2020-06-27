import React, { useRef, useState, useMemo } from 'react';
import { useFrame} from 'react-three-fiber';
import * as THREE from 'three';

function ExtrudedShape(props) {

  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    props.shape.segments.forEach((segment, index) => {
      if (index === 0) {
        shape.moveTo(segment.point.x, segment.point.y);
      } else {
        shape.bezierCurveTo(
          segment.handleIn.x,
          segment.handleIn.y,
          segment.handleOut.x,
          segment.handleOut.y,
          segment.point.x,
          segment.point.y
        );
      }
    });
    return shape;
  })

  const extrudeSettings = {
  	steps: 2,
  	depth: 16,
  	bevelEnabled: true,
  	bevelThickness: 3,
  	bevelSize: 1,
  	bevelOffset: 0,
  	bevelSegments: 3
  };

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <extrudeGeometry attach="geometry" args={[shape, extrudeSettings]}/>
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default ExtrudedShape;
