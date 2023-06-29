import React, { useEffect, useState } from 'react'
import style from "./Background.module.css"

function Background() {

    // const [boxArray, setBoxArray] = useState([])
    var boxArray = [];
    var b, countOfBoxes, limits;

    function slide(box){
        let startPosX = Math.floor(Math.random() * (limits.width - box.size))
        let startPosY = 0 - box.size
        box.ref.style.left = startPosX+"px"
        let posAnimation = [
            { top: startPosY+"px",
            // opacity: 1
         },
            { top: limits.height+"px",
            // opacity: 0
         },
          ];
        let time = 2 + Math.random()*3
        let posTiming = {
            duration: time*1000,
            iterations: 1,
        };
        box.ref.animate(posAnimation,posTiming)

        setTimeout(()=>slide(box),time*1000)
    }

    function generateBoxes(count){
        for (let i = 0; i < count; i++) {
            let newBox = {}
            newBox.size = 20 + Math.floor(Math.random() * 40)
            newBox.ref = document.createElement('div')
            newBox.ref.classList.add(style.box)
            newBox.ref.style.width = `${newBox.size}px`
            newBox.ref.style.height = `${newBox.size}px`
            boxArray.push(newBox)
            b.append(newBox.ref)
            // console.log(boxArray[i].size)
        }
    }

    useEffect(()=>{

        // console.log(document.body.querySelector('#root').children)
        b = document.querySelector('.'+style.background)
        countOfBoxes = 10
        limits = b.getBoundingClientRect()
        // console.log(b,countOfBoxes,limits)
        generateBoxes(countOfBoxes)
        for (let i = 0; i < countOfBoxes; i++) {
            slide(boxArray[i])
        }
        window.addEventListener('resize',()=>{console.log('resized');limits = b.getBoundingClientRect()})
    },[])


  return (
    <div className={style.background}>
        {/* <div className={style.box}></div> */}
    </div>
  )
}

export default Background