
let initialPage = {
    store:[],
    index:0
}
const methods= {
    0:init,
    1:functionality,
    2:pallet,
    3:apply,
}

let breadCrumbs = (initialPage,methods) => { 
    let page = initialPage
    return (pageNumber) => {
        page = insert(page, methods, pageNumber)
        return page
    };
}

let  sesionBreadCrumbs = breadCrumbs(initialPage,methods)
let page  = sesionBreadCrumbs(1)