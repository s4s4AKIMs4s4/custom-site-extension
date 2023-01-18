const ul = document.querySelector('.breadcrumbs')
const menu = document.querySelector('.menu')

const addLiElement = (indx, text) =>{
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
    const buttonReset = document.createElement('button')

    buttonYoutube.classList.add('menu__item')
    buttonGoogle.classList.add('menu__item')
    buttonReset.classList.add('menu__item')

    const textYoutube = document.createTextNode('Youtube')
    const textGoogle = document.createTextNode('Google')
    const textReset = document.createTextNode('Reset all styles')

    buttonYoutube.append(textYoutube)
    buttonGoogle.append(textGoogle)
    buttonReset.append(textReset)

    buttonReset.onclick = (e) => {
        e.stopPropagation()
        openResetAllColorAlert()
        chrome.runtime.sendMessage({isReset:true})
    }

    buttonYoutube.setAttribute('data-domen','youtube')
    buttonGoogle.setAttribute('data-domen','google')


    menu.append(buttonGoogle)
    menu.append(buttonYoutube)
    menu.append(buttonReset)
}

const rendorArea = () =>{
    const buttonText = document.createElement('button')
    const buttonLinks = document.createElement('button')
    const buttonBackgrounds = document.createElement('button')
    const buttonInput = document.createElement('button')

    buttonText.classList.add('menu__item')
    buttonLinks.classList.add('menu__item')
    buttonBackgrounds.classList.add('menu__item')
    buttonInput.classList.add('menu__item')

    const textText = document.createTextNode('Text')
    const textLinks = document.createTextNode('Links')
    const textBackgrounds = document.createTextNode('Backgrounds')
    const textInput = document.createTextNode('Input field')

    buttonText.append(textText)
    buttonLinks.append(textLinks)
    buttonBackgrounds.append(textBackgrounds)
    buttonInput.append(textInput)

    buttonText.setAttribute("data-area","text")
    buttonLinks.setAttribute("data-area","links")
    buttonBackgrounds.setAttribute("data-area","backgrounds")
    buttonInput.setAttribute("data-area","input")

    menu.append(buttonText)
    menu.append(buttonLinks)
    // menu.append(buttonBackgrounds)
    menu.append(buttonInput)
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
    buttonSomeColor.disabled = true

    menu.append(buttonFullColor)
    // menu.append(buttonSomeColor)
}
let buttonResetRef = null

const openBuyMeCoffe = (event) => {
    event.stopPropagation()
    window.open('https://www.buymeacoffee.com/akimovivanj')
}

const rendorApply = () => {
    let template = document.getElementById('my-pallet');
    let templateContent = template.content;
    document.body.appendChild(templateContent.cloneNode(true));
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
    const buttonReset =  document.createElement('button')
    const helper = document.createElement('div')
    const divElement = document.createElement('div')


    const buyMeCofeeLink = document.createElement('a')
    const buyMeCofeeImage = document.createElement('img')
    buyMeCofeeImage.setAttribute('src', 'https://cdn.buymeacoffee.com/buttons/v2/default-red.png')
    buyMeCofeeImage.setAttribute('alt', 'Buy Me A Coffee')
    buyMeCofeeImage.setAttribute('style', 'height: 40px !important;width: 148px !important;margin-left:70px')
    buyMeCofeeLink.setAttribute('href', 'https://www.buymeacoffee.com/akimovivanj')
    buyMeCofeeLink.onclick = openBuyMeCoffe
    buyMeCofeeLink.append(buyMeCofeeImage)


    const textButtonApply = document.createTextNode('Apply color')
    const textReset =  document.createTextNode('Reset color')
    const textHelperForReset = document.createTextNode('on reset, refresh the page')

    buttonApply.append(textButtonApply)
    buttonReset.append(textReset)

    buttonApply.classList.add('menu__item')
    buttonReset.classList.add('menu__item')

    helper.append(textHelperForReset)
    helper.classList.add('menu__helper')
    
    buttonReset.setAttribute('data-pallet','reset')
    buttonApply.setAttribute('data-pallet','n')
    
    selectdButtonApply = buttonApply
    buttonResetRef = buttonReset
    menu.append(helper)
    menu.append(divElement)
    menu.append(buttonApply)
    menu.append(buttonReset)
    menu.append(buyMeCofeeLink)

}




