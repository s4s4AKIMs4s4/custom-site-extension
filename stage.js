const ul = document.querySelector('.breadcrumbs')
const menu = document.querySelector('.menu')


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