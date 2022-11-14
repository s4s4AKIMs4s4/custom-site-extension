const changeDomen = (state, element) => {
    return {...state, domen: element.getAttribute("data-domen")} 
}

const changeArea = (state, element) => {
    return {...state, area: element.getAttribute("data-area")} 
}

const changePallet = (state, element) => {
    return {...state, pallet: element.getAttribute("data-pallet")} 
}

const changeColor = (state,element) =>{
    if(element.getAttribute("data-pallet") === 'n')
        return {...state, color:selectedColor}
    else
        return {...state, pallet: element.getAttribute("data-pallet")}   
}

let flagApply = false
//closes for menu event - click
const initStateAction = {
    domen:null,
    area:null,
    pallet:null,
    color:null,
}

let menuHandler =(stateAction = initStateAction) => ({index}) => (event) => {
    index = page.index
    const button = event.target
    let dict = {
        1:changeDomen,
        2:changeArea,
        3:changePallet,
        4:changeColor,
    }
    if(index !== 4){
        deleteLiElement()
        stateAction =  dict[index](stateAction, button)
        page = sesionBreadCrumbs(index+1)
        flagApply = false 
    }
    else{
        stateAction =  dict[index](stateAction, button)
        
        flagApply = true 
        chrome.runtime.sendMessage({flagApply: flagApply, stateAction: stateAction})
        
    }
}
let menuEvent = menuHandler()

ul.addEventListener('click',ulHandler(page))
menu.addEventListener('click',menuEvent(page))

if(selectdButtonApply)
    selectdButtonApply.addEventListener('click',menuEvent(page))
if(buttonResetRef)
    buttonResetRef.addEventListener('click',menuEvent(page))