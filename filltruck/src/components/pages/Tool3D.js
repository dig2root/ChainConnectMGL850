import React, { useState } from 'react'
import pageTitle from '../functions/PageTitle';
import axios from '../functions/Axios';
import './scss/Tool3D.scss';

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box from '../functions/Box'

function Tool3D () {

    pageTitle("Application");

    const [container, setContainer] = useState({
        longueur: 0,
        largeur: 0,
        hauteur: 0
    });

    const [box, setBox] = useState({
        longueur: 0,
        largeur: 0,
        hauteur: 0,
        quantite: 0
    });

    const [boxList, setBoxList] = useState([]);

    const addBox = () => {
        var exist = false;
        for (const current of boxList) {
            if (((current.longueur === box.longueur)&&(current.largeur === box.largeur))||((current.longueur === box.largeur)&&(current.largeur === box.longueur))) {
                exist = true;
                var array = [...boxList];
                var index = array.indexOf(current);
                if (index !== -1) {
                    array.splice(index, 1);
                }
                var modifiedBox = {
                    longueur: current.longueur,
                    largeur: current.largeur,
                    hauteur: current.hauteur,
                    quantite: current.quantite
                };
                modifiedBox.quantite = parseInt(current.quantite) + parseInt(box.quantite);
                array.push(modifiedBox);
                setBoxList(array);
            }
        }
        if (!exist) {
            var newBox = {
                longueur: box.longueur,
                largeur: box.largeur,
                hauteur: box.hauteur,
                quantite: box.quantite
            };
            setBoxList(oldArray => [...oldArray, newBox]);
        }
    };

    const removeItem = (e) => {
        var array = [...boxList];
        var index = e.target.id;
        if (index !== -1) {
            array.splice(index, 1);
            setBoxList(array);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBoxListToDraw([]);
        setContainerToDraw({});
        const data = {
            container: container,
            boxes: boxList
        }
        try {
            const res = await axios.post('/application3d', JSON.stringify(data), {
                headers: { 'Content-type': 'application/json'},
                withCredentials: true
            });
            setContainerToDraw({
                longueur: res.data[0][0].longueur,
                largeur: res.data[0][0].largeur,
                hauteur: res.data[0][0].hauteur
            })
            for (const current of res.data[1]) {
                let newBox = {
                        x: current.x,
                        y: current.y,
                        z: current.z,
                        d: current.d,
                        w: current.w,
                        h: current.h,
                };
                setBoxListToDraw(oldArray => [...oldArray, newBox]);
            }
            console.log(containerToDraw, boxListToDraw)

        } catch (err) {
            console.log(err)
        }
    }

    const [containerToDraw, setContainerToDraw] = useState({
        longueur: 0,
        largeur: 0,
        hauteur: 0
    });

    const [boxListToDraw, setBoxListToDraw] = useState([]);    

    return(
        <div className="tool">
            <div className="tool-box">
                <h1 className="tool-box--title">Personnalisez votre container</h1>
                <div className="tool-box--container">
                    <h2 className="tool-box--container_title">Taille du container :</h2>
                    <div className="tool-box--container_inputs">
                        <input className="tool-box--container_inputs__input" placeholder="Longueur (cm)" onChange={(e) => setContainer({...container, longueur:e.target.value})} type="number" id="length" name="length" min="1"></input>
                        <input className="tool-box--container_inputs__input" placeholder="Largeur (cm)" onChange={(e) => setContainer({...container, largeur:e.target.value})} type="number" id="width" name="width" min="1"></input>
                        <input className="tool-box--container_inputs__input" placeholder="Hauteur (cm)" onChange={(e) => setContainer({...container, hauteur:e.target.value})} type="number" id="height" name="height" min="1"></input>
                    </div>
                </div>
                <div className="tool-box--elements">
                    <h2 className="tool-box--elements_title">Ajouter des éléments :</h2>
                    <div className="tool-box--elements_personnalise">
                        <input className="tool-box--elements_quantity" placeholder="Longueur (cm)" onChange={(e) => setBox({...box, longueur:e.target.value})} type="number" id="length" name="length" min="1"></input>
                        <input className="tool-box--elements_quantity" placeholder="Largeur (cm)" onChange={(e) => setBox({...box, largeur:e.target.value})} type="number" id="width" name="width" min="1"></input>
                        <input className="tool-box--elements_quantity" placeholder="Hauteur (cm)" onChange={(e) => setBox({...box, hauteur:e.target.value})} type="number" id="height" name="height" min="1"></input>                        
                        <input className="tool-box--elements_quantity" placeholder="Quantité" onChange={(e) => setBox({...box, quantite:e.target.value})} type="number" id="quantity" name="quantity" min="1" max="50"></input>
                        <button className="tool-box--elements_add" onClick={addBox}>+</button>
                    </div>
                </div>
                <div className="tool-box--list">
                    <h2 className="tool-box--list_title">Liste des éléments :</h2>
                    <ul className="tool-box--list_list">
                        {boxList.map((box, id)  => {
                            return(
                                <li key={id} className="tool-box--list__list__box">{box.quantite}x - {box.longueur}cm x {box.largeur}cm x {box.hauteur}cm<button id={id} className="tool-box--list_list__remove" onClick={(e) => removeItem(e)}>-</button></li>
                            );
                        })}
                    </ul>
                </div>
                <button className="tool-box--button" onClick={handleSubmit}>Calculer</button>
            </div>
            <div className="tool-canvas">
                <Canvas className="tool-canvas-canva">
                    <OrbitControls />
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[-2, 5, 2]} intensity={1}/>
                    { boxListToDraw.map((box) => (
                        boxListToDraw.length > 0
                            ? (<Box x={box.x/100} y={box.y/100} z={box.z/100} longueur={box.w/100} largeur={box.h/100} hauteur={box.d/100}/>)
                            : null
                    ))}
                </Canvas>
            </div>
        </div>
    );
}

export default Tool3D;