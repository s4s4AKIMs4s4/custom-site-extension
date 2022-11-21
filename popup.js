const ul = document.querySelector('.breadcrumbs')
const menu = document.querySelector('.menu')



const addLiElement = (indx, text) =>{
    // const ul = document.querySelector('breadcrumbs')
    const li = document.createElement('li')
    li.setAttribute('data-breadCrumbs',indx)
    const a = document.createElement('a')
    document.createTextNode(text)
    a.setAttribute('href','#')

    a.append(text)
    li.append(a)
    ul.append(li)
}

const deleteLiElement = () =>{
    const liItems = document.querySelectorAll('ul li')
    liItems.forEach((val)=> val.remove() )
}



const deleteButtons = () => {
    let buttons = document.querySelectorAll('.menu *')
    if(buttons !== null) buttons.forEach((val)=> val.remove())
}

const rendorInit = () =>{
    const buttonYoutube = document.createElement('button')
    const buttonGoogle = document.createElement('button')

    buttonYoutube.classList.add('menu__item')
    buttonGoogle.classList.add('menu__item')

    const textYoutube = document.createTextNode('Youtube')
    const textGoogle = document.createTextNode('Google')

    

    buttonYoutube.append(textYoutube)
    buttonGoogle.append(textGoogle)

    buttonYoutube.setAttribute('data-domen','youtube')
    buttonGoogle.setAttribute('data-domen','google')



    menu.append(buttonGoogle)
    menu.append(buttonYoutube)
}

const rendorArea = () =>{
    // const buttonText = document.createElement('button')
    // const buttonLinks = document.createElement('button')
    // const buttonBackgrounds = document.createElement('button')
    // const buttonInput = document.createElement('button')



    // buttonText.classList.add('menu__item')
    // buttonLinks.classList.add('menu__item')
    // buttonBackgrounds.classList.add('menu__item')
    // buttonInput.classList.add('menu__item')

    // const textText = document.createTextNode('Text')
    // const textLinks = document.createTextNode('Links')
    // const textBackgrounds = document.createTextNode('Backgrounds')
    // const textInput = document.createTextNode('Input field')

    // buttonText.append(textText)
    // buttonLinks.append(textLinks)
    // buttonBackgrounds.append(textBackgrounds)
    // buttonInput.append(textInput)

    // buttonText.setAttribute("data-area","text")
    // buttonLinks.setAttribute("data-area","links")
    // buttonBackgrounds.setAttribute("data-area","backgrounds")
    // buttonInput.setAttribute("data-area","input")


    // menu.append(buttonText)
    // menu.append(buttonLinks)
    // menu.append(buttonBackgrounds)
    // menu.append(buttonInput)
}



const rendorPallet = () =>{
    const buttonFullColor = document.createElement('button')
    const buttonSomeColor = document.createElement('button')

    buttonFullColor.classList.add('menu__item')
    buttonSomeColor.classList.add('menu__item')

    const textFullColor = document.createTextNode('Full palltre')
    const textSomeColor = document.createTextNode('Some colors')

    buttonFullColor.append(textFullColor)
    buttonSomeColor.append(textSomeColor)


    buttonFullColor.setAttribute('data-pallet','fullColor')
    buttonSomeColor.setAttribute('data-pallet','someColor')

    menu.append(buttonFullColor)
    menu.append(buttonSomeColor)

}

let picker = null
let selectedColor = null
let selectdButtonApply = null
let interval = null

const rendorApply = () => {
    let template = document.getElementById('my-pallet');
    let templateContent = template.content;
    document.body.appendChild(templateContent.cloneNode(true));
    // menu.append(document.createElement('my-pallet'))
    // menu.appendChild(templateContent.cloneNode(true));
    picker = new Picker(document.getElementById("color-picker"), 250, 220);
    //Draw 
    interval = setInterval(() => picker.draw(), 1);
    selectedColor = picker.getPickedColor()
    
    picker.onChange((color) => {
        let selected = document.getElementsByClassName("selected")[0];
        selectedColor = color
        selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    });
    
    const buttonApply = document.createElement('button')
    const textButtonApply = document.createTextNode('Apply color')
    buttonApply.append(textButtonApply)
    selectdButtonApply = buttonApply
    menu.append(buttonApply)
}

const changeState = (state,index) => ({...state, index})

const init = (it) =>{
    addLiElement(it,'inseption')
    rendorInit()
}

const functionality = (it) =>{
    addLiElement(it,'functionality')
    rendorArea()
}
const pallet = (it) =>{
    addLiElement(it,'pallet')
    rendorPallet()
}
const apply = (it) =>{
    addLiElement(it, 'apply')
    rendorApply()
}

const methods= {
    0:init,
    1:functionality,
    2:pallet,
    3:apply,
}

const deleteMenu = () =>{
    let all = document.querySelectorAll('.menu2')
    clearInterval(interval)
    picker = null
    all.forEach((val) => {
        val.remove()
    })
}

const insert = (state, methods, idx) =>{
    state = changeState(state,0)
    for(let it = 0; it < idx; it++){
        state = changeState(state, state.index + 1)
        deleteButtons()
        methods[it](it)
    }
    return state
}

let initialState = {
    store:[],
    index:0
}

let breadCrumbs = (initialState,methods) => { 
    let state = initialState
    return (props) => {
        state = insert(state,methods,props)
        return state
    };

}

let  sesionBreadCrumbs = breadCrumbs(initialState,methods)
let state  = sesionBreadCrumbs(1)

const ulHandler = ({index}) => (event) =>{
    if(event.target.closest('li') ){
        deleteLiElement()
        if(state.index === 4){
            deleteMenu()
        }
        const li = event.target.closest('li')
        const idx = li.getAttribute('data-breadCrumbs')
        state = sesionBreadCrumbs(Number(idx)+1)
    }
}

const initStateAction = {
    domen:null,
    area:null,
    pallet:null,
    color:null,
}

const changeDomen = (state, element) => {
    return {...state, domen: element.getAttribute("data-domen")} 
}


const changeArea = (state, element) => {
    return {...state, area: element.getAttribute("data-area")} 
}

const changePallet = (state, element) => {
    return {...state, pallet: element.getAttribute("data-pallet")} 
}

const changeColor = (state) =>{
    return {...state, color:selectedColor}
}

 let flagApply = false

let menuHandler =(stateAction = initStateAction) => ({index}) => (event) => {
    index = state.index
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
        state = sesionBreadCrumbs(index+1)
        flagApply = false 
    }
    else{
        stateAction =  dict[index](stateAction)
        flagApply = true 
        chrome.runtime.sendMessage({flagApply: flagApply, stateAction: stateAction})
        
    }
}
let menuEvent = menuHandler()

ul.addEventListener('click',ulHandler(state))
menu.addEventListener('click',menuEvent(state))

if(selectdButtonApply)
    selectdButtonApply.addEventListener('click',menuEvent(state))


































