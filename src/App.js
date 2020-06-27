import React, {Fragment} from 'react';
import TFRenderer from './TFRenderer';
import SketchPad from './SketchPad';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onPathUpdate = this.onPathUpdate.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      index: 0,
      bezierCurve: null,
    };
  }

  onPathUpdate(path) {
    console.log("Updated path: ");
    console.log(path);
    this.setState({bezierCurve: path});
  }

  onButtonClick() {
    this.setState({index: 1});
    console.log("Final path: ");
    console.log(this.state.bezierCurve);
  }

  renderIndex() {
    if (this.state.index === 0) {
      return (
        <Fragment>
          <SketchPad
            currentPath={this.state.bezierCurve}
            onPathUpdate={this.onPathUpdate}
          />
          <button onClick={this.onButtonClick}>
            Next
          </button>
        </Fragment>
      );
    } else if (this.state.index === 1) {
      return (
        <TFRenderer
          shape={this.state.bezierCurve}
        />
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderIndex()}
      </div>
    );
  }
}

export default App;
