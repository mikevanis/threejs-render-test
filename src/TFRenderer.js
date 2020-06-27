import React from 'react';
import { Canvas } from 'react-three-fiber';
import Box from './Box';
//import ExtrudedShape from './ExtrudedShape';
import Extrusion from './Extrusion';

class TFRenderer extends React.Component {

  render() {
    return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
        <Extrusion
          position={[0, 0, 0]}
          start={[
            this.props.shape.curves[0].point1.x,
            this.props.shape.curves[0].point1.y
          ]}
          curves={this.props.shape.curves}
          bevelEnabled
          depth={8}
          bevelSegments={2}
          steps={2}
          bevelSize={1}
          bevelThickness={1} />
      </Canvas>
    );
  }
}

export default TFRenderer;
