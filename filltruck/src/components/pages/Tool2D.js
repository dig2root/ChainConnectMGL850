import React, { useState } from 'react';
import pageTitle from '../functions/PageTitle';
import axios from '../functions/Axios';
import Canvas from '../functions/Canvas';
import './scss/Tool2D.scss';

function Tool2D () {

    pageTitle("Application");

    const [container, setContainer] = useState({
        hauteur: 0,
        largeur: 0
    });

    const [box, setBox] = useState({
        hauteur: 0,
        largeur: 0,
        quantite: 0
    });

    const [boxList, setBoxList] = useState([]);

    const addBox = () => {
        var exist = false;
        for (const current of boxList) {
            if (((current.hauteur === box.hauteur)&&(current.largeur === box.largeur))||((current.hauteur === box.largeur)&&(current.largeur === box.hauteur))) {
                exist = true;
                var array = [...boxList];
                var index = array.indexOf(current);
                if (index !== -1) {
                    array.splice(index, 1);
                }
                var modifiedBox = {
                    hauteur: current.hauteur,
                    largeur: current.largeur,
                    quantite: current.quantite
                };
                modifiedBox.quantite = parseInt(current.quantite) + parseInt(box.quantite);
                array.push(modifiedBox);
                setBoxList(array);
            }
        }
        if (!exist) {
            var newBox = {
                hauteur: box.hauteur,
                largeur: box.largeur,
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
        const data = {
            container: container,
            boxes: boxList
        }
        try {
            const res = await axios.post('/application2d', JSON.stringify(data), {
                headers: { 'Content-type': 'application/json'},
                withCredentials: true
            });
            drawRectangles(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const colors = ['green', 'red', 'yellow', 'blue', 'pink']

    const drawRectangles = (data) => {
        const dataContainer = data[0][0];
        const dataBoxes = data[1];
        const scaleRatio = 580/dataContainer.width;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect((350 - dataContainer.height*scaleRatio)/2, 10, dataContainer.height*scaleRatio, 580);
        for (const box of dataBoxes) {
            const x = box.x;
            const y = box.y;
            const w = box.w;
            const h = box.h;
            const id = box.id;
            const text = w + "x" + h;
            ctx.fillStyle = colors[id];
            ctx.fillRect((350 - dataContainer.height*scaleRatio)/2 + y*scaleRatio, 10 + x*scaleRatio, h*scaleRatio, w*scaleRatio);
            ctx.fillStyle = 'black';
            ctx.fillText(text, (350 - dataContainer.height*scaleRatio)/2 + y*scaleRatio, 10 + (x + 0.5*w)*scaleRatio);
            ctx.strokeRect((350 - dataContainer.height*scaleRatio)/2 + y*scaleRatio, 10 + x*scaleRatio, h*scaleRatio, w*scaleRatio);
        }
    }

    return(
        <div className="tool">
            <div className="tool-box">
                <h1 className="tool-box--title">Personnalisez votre container</h1>
                <div className="tool-box--container">
                    <h2 className="tool-box--container_title">Taille du container :</h2>
                    <div className="tool-box--container_inputs">
                        <input className="tool-box--container_inputs__input" placeholder="Hauteur (cm)" onChange={(e) => setContainer({...container, hauteur:e.target.value})} type="number" id="height" name="height" min="1"></input>
                        <input className="tool-box--container_inputs__input" placeholder="Largeur (cm)" onChange={(e) => setContainer({...container, largeur:e.target.value})} type="number" id="width" name="width" min="1"></input>
                    </div>
                </div>
                <div className="tool-box--elements">
                    <h2 className="tool-box--elements_title">Ajouter des éléments :</h2>
                    <div className="tool-box--elements_personnalise">
                        <input className="tool-box--elements_quantity" placeholder="Hauteur (cm)" onChange={(e) => setBox({...box, hauteur:e.target.value})} type="number" id="height" name="height" min="1"></input>
                        <input className="tool-box--elements_quantity" placeholder="Largeur (cm)" onChange={(e) => setBox({...box, largeur:e.target.value})} type="number" id="width" name="width" min="1"></input>
                        <input className="tool-box--elements_quantity" placeholder="Quantité" onChange={(e) => setBox({...box, quantite:e.target.value})} type="number" id="quantity" name="quantity" min="1" max="50"></input>
                        <button className="tool-box--elements_add" onClick={addBox}>+</button>
                    </div>
                </div>
                <div className="tool-box--list">
                    <h2 className="tool-box--list_title">Liste des éléments :</h2>
                    <ul className="tool-box--list_list">
                        {boxList.map((box, id)  => {
                            return(
                                <li key={id} className="tool-box--list__list__box">{box.quantite}x - {box.hauteur}cm x {box.largeur}cm<button id={id} className="tool-box--list_list__remove" onClick={(e) => removeItem(e)}>-</button></li>
                            );
                        })}
                    </ul>
                </div>
                <button className="tool-box--button" onClick={handleSubmit}>Calculer</button>
            </div>
            <div className="tool-canvas">
                <Canvas/>
            </div>
        </div>
    );
}

export default Tool2D;