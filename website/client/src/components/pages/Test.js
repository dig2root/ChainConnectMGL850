import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box from '../functions/Box'

function Test () {

    return(
        <div className="container">
            <Canvas className="canvas">
                <OrbitControls />
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-2, 5, 2]} intensity={1}/>
                <Box/>
            </Canvas>
        </div>
    );
}

export default Test;