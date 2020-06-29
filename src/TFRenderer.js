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
        <Extrusion
          position={[0, 0, 0]}
          curves={this.props.shape.curves}
          bevelEnabled
          depth={70}
          bevelSegments={4}
          steps={4}
          bevelSize={15}
          bevelThickness={15} />
      </Canvas>
    );
  }
}

export default TFRenderer;
