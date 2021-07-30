
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
    liItems = document.querySelectorAll('ul li')
    liItems.forEach((val)=> val.remove() )
}



const deleteButtons = () => {
    let buttons = document.querySelectorAll('.menu *')
    if(buttons !== null) buttons.forEach((val)=> val.remove())
}

const rendorInit = () =>{
    buttonYoutube = document.createElement('button')
    buttonGoogle = document.createElement('button')

    buttonYoutube.classList.add('menu__item')
    buttonGoogle.classList.add('menu__item')

    textYoutube = document.createTextNode('Youtube')
    textGoogle = document.createTextNode('Google')

    

    buttonYoutube.append(textYoutube)
    buttonGoogle.append(textGoogle)

    buttonYoutube.setAttribute('data-domen','youtube')
    buttonGoogle.setAttribute('data-domen','google')



    menu.append(buttonGoogle)
    menu.append(buttonYoutube)
}

const rendorArea = () =>{
    buttonText = document.createElement('button')
    buttonLinks = document.createElement('button')
    buttonBackgrounds = document.createElement('button')




    buttonText.classList.add('menu__item')
    buttonLinks.classList.add('menu__item')
    buttonBackgrounds.classList.add('menu__item')


    textText = document.createTextNode('Text')
    textLinks = document.createTextNode('Links')
    textBackgrounds = document.createTextNode('Backgrounds')

    buttonText.append(textText)
    buttonLinks.append(textLinks)
    buttonBackgrounds.append(textBackgrounds)


    buttonText.setAttribute("data-area","text")
    buttonLinks.setAttribute("data-area","links")
    buttonBackgrounds.setAttribute("data-area","Backgrounds")

    menu.append(buttonText)
    menu.append(buttonLinks)
    menu.append(buttonBackgrounds)
}



const rendorPallet = () =>{
    buttonFullColor = document.createElement('button')
    buttonSomeColor = document.createElement('button')

    buttonFullColor.classList.add('menu__item')
    buttonSomeColor.classList.add('menu__item')

    textFullColor = document.createTextNode('Full palltre')
    textSomeColor = document.createTextNode('Some colors')

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
    console.log(template.content)
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
    
    buttonApply = document.createElement('button')
    textButtonApply = document.createTextNode('Apply color')
    buttonApply.append(textButtonApply)
    selectdButtonApply = buttonApply
    menu.append(buttonApply)
}





  


const changeState = (state,index) => ({...state, index})


const init = (it) =>{
    addLiElement(it,'inseption')
    rendorInit()
    //функция рендор меню
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
    console.log("yep it is working")
    state = changeState(state,0)
    // deleteMenu()
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
    console.debug()
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




//closes for menu event - click
const menuHandler =(stateAction = initStateAction) => ({index}) => (event) => {
    
    index = state.index
    

    const button = event.target
    // if(event.target.tagName !== 'BUTTON'){
    //     state = sesionBreadCrumbs(index)
    //     return
    // }


    dict = {
        1:changeDomen,
        2:changeArea,
        3:changePallet,
        4:changeColor,
    }
    if(index !== 4){
        deleteLiElement()
        stateAction =  dict[index](stateAction, button)
        state = sesionBreadCrumbs(index+1)
    }
    else{
        // state = sesionBreadCrumbs(index)
        stateAction =  dict[index](stateAction)
    }
}
menuEvent = menuHandler()

ul.addEventListener('click',ulHandler(state))
menu.addEventListener('click',menuEvent(state))

if(selectdButtonApply)
    selectdButtonApply.addEventListener('click',menuEvent(state))


































