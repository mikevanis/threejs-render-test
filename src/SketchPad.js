import React from 'react';
import paper from 'paper';

class SketchPad extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDrag = this.onMouseDrag.bind(this);
  }

  componentDidMount() {
    let canvas = document.getElementById("sketchCanvas");
    canvas.style.background = "#FFE600";
    paper.setup(canvas);

    // Setup tool
    let tool = new paper.Tool();
    tool.onMouseDown = this.onMouseDown;
    tool.onMouseDrag = this.onMouseDrag;
    tool.onMouseUp = this.onMouseUp;
  }

  onMouseDown(event) {
    console.log("Mouse down!");
    let path = this.props.currentPath;
    if (path) {
      path.selected = false;
    }

    path = new paper.Path({
      segments: [event.point],
      strokeColor: "black",
      strokeWidth: 5,
      strokeCap: "round"
    });
    this.props.onPathUpdate(path);
    //this.setState({currentPath: path});
  }

  onMouseDrag(event) {
    const path = this.props.currentPath;
    path.add(event.point);
    //this.setState({currentPath: path});
    this.props.onPathUpdate(path);
  }

  onMouseUp(event) {
    const path = this.props.currentPath;
    path.simplify(40);
    path.closed = true;
    path.fillColor = "white";
    this.props.onPathUpdate(path);
  }

  render() {
    return (
      <canvas
        id='sketchCanvas'
        ref={this.canvasRef}
        data-paper-resize
      >
      </canvas>
    );
  }
}

export default SketchPad;
