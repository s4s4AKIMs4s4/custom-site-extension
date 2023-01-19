
let picker = null
let selectedColor = null
let selectdButtonApply = null
let interval = null

const changeState = (page,index) => ({...page, index})

const init = (it) =>{
    addLiElement(it,'domen')
    renderInit()
}

const functionality = (it) =>{
    addLiElement(it,'place')
    renderArea()
}
const pallet = (it) =>{
    addLiElement(it,'pallet')
    renderPallet()
}
const apply = (it) =>{
    addLiElement(it, 'color')
    renderApply()
}

//methods for rendering stage

const deleteMenu = () =>{
    let all = document.querySelectorAll('.menu2')
    clearInterval(interval)
    picker = null
    all.forEach((val) => {
        val.remove()
    })
}

const insert = (page, methods, idx) =>{
    page = changeState(page,0)
    for(let it = 0; it < idx; it++){
        page = changeState(page, page.index + 1)
        deleteButtons()
        methods[it](it)
    }
    
    return page
}

const ulHandler = ({index}) => (event) =>{
    if(event.target.closest('li') ){
        deleteLiElement()
        if(page.index === 4){
            deleteMenu()
        }
        const li = event.target.closest('li')
        const idx = li.getAttribute('data-breadCrumbs')
        page = sesionBreadCrumbs(Number(idx)+1)
    }
}
