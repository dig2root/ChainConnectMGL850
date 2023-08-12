import React from "react";

function Box(props) {

    return(
        <mesh position={[props.x, props.y, props.z]}>
            <boxBufferGeometry attach="geometry" args={[props.longueur, props.largeur, props.hauteur]}/>
            <meshLambertMaterial attach="material" color="blue"/>
        </mesh>
    );
}

export default Box;