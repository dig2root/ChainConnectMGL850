import React from 'react'

class Canvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        canvas.getContext("2d")
    }

    render() {
        return(
            <canvas id="canvas" ref="canvas" width="350" height="600" className="tool-canvas-canva"/>
        );
    }
  }

  export default Canvas;