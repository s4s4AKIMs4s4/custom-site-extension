



const checkKeysForLength = (state, domain) => (Object.keys(state[domain]).length === 0)


const template = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })

}

class Google{
 
  performText(color){
    //document.querySelectorAll('em').forEach((val,indx)=>{val.style.color = 'red'})
    //document.querySelectorAll('span').forEach((val,indx)=>{val.style.color = 'red'})

    template('span',color)
    template('em',color)

  }
  performLinks(color){
    template('a',color)
  }

}
class Youtube{
  performText(color){
    // document.querySelectorAll('span:not(#video-title)') .forEach((val,indx)=>{val.style.color = 'red'})
    template('span:not(#video-title)', color)

  }
  performLinks(color){
    template('a',color)
  }
}


class Director{
  _domen
  constructor(domen){
    this._domen = domen
  }

  performArea(area,color){
    switch(area){
      case 'links':
        this._domen.performLinks(color)
        break;
      case  'text':
        this._domen.performText(color)
    }
  }

  performAllArea(areaobj){
    for(const  [area, value] of Object.entries(areaobj) ){
      this.performArea(area, value.color )
    }

  }
}

const selectObjectForDomen = (currentDomain, state) =>{
  
  if(!checkKeysForLength(state, currentDomain)){
    switch (currentDomain){
    case 'google': return new Google
    case 'youtube': return new Youtube
    }
  }
  else return null

}

chrome.runtime.onMessage.addListener(
  
    async function(request, sender, sendResponse) {
      console.log('state inside content.js ')
      console.log(request.state)
      
      const currentDomain = (document.domain).split('.')[1]
      domain  = selectObjectForDomen(currentDomain,request.state)
      console.log('domain obj')
      console.log(domain)

      if(domain){
        director = new Director(domain)
        console.log(request.state[currentDomain])
        director.performAllArea(request.state[currentDomain])
      }

  });







































// class Area {
//   _nameArea
//   _color
//   constructor(name, valueObject){
//     this._nameArea = name
//     this._color = valueObject.color
//   }

//   get name(){
//     return this._nameArea
//   }

//   get color(){
//     return this._color
//   }
// }


// template

// class GoogleArea extends Area{




//   links()
//   text()


// }

// class YoutubeArea extends Area{
//   links()
//   text()
// }

// // class Link extends Area{
// //   constructor(state){
// //     super(state)
// //   }
// //   performPaint() {
// //     let tags = document.querySelectorAll('a')  
// //     tags.forEach((val,idx)=>{
// //         val.style.color = `rgb(${_color.r}, ${_color.g}, ${_color.b})`
// //     })
// //   }
// // }






// class Text extends Area {
//   performPaint() {
//   }

// }

// class Backgrounds extends Area {
//   performPaint(){
//   }


// }





// director{
// []
// asdf





// }










// class Generator {

//   selectObject(){}

//   paintArea(domainName) {
//     area = this.selectObject(domainName)
//     area.performPaint()
//   }  
// }




// class TextGenerator extends Generator{

//   selectObject (domain) {
    
//     return new Text()
//   }
// }

// class LinkGenerator extends Generator{
//   selectObject(){
//     return new Link()
//   }
// }








// const setLinks = (area) =>{
//   switch(area){
//     case 'links':
//       return new LinkGenerator() // передаем сюда директра
//     case 'text':
//       return new TextGenerator()
//     case 'backgrounds':
//       break;
//     default:
//       break;
//   }
// }





// class Domen {
// _area = []
// _nameDomen

//   constructor(state, nameDomen){
//     this._nameDomen = nameDomen
//     for ( [key, value] of state){ 
//       area  = setLinks(key, value)
//       this._area.push(area)
//     }
//   }

//   get listOfArea(){
//     return this._area
//   }  

//   performAllPaint(){

//     domen.listOfArea.forEach((area,indx) => {
//       area.paintArea(this._nameDomen)
//     })
  
//   }



// }





// // class Google extends Domen {

// //   constructor(state){
// //     super(state)
// //   }

  
// // }


// // class Youtube  extends Domen {
// //   constructor(name){
// //     super(name)
// //   }
 
// // }








// const checkKeysForLength = (state, domain) => (Object.keys(state[domain]).length === 0)

// //Google factory
// const googleWrapper = (state,domain) =>{

//   if(checkKeysForLength) return
//   return new Google(state,domain)

// }
// //Youtube factory
// const youtubeWrapper = (state,domain) =>{

//   if(checkKeysForLength) return
//   return new Youtube(state,domain)

// }




// const selectObjectForDomen = (currentDomain,state) =>{
  
//   if(!checkKeysForLength(currentDomain,state)){
//     return new Domen(state,currentDomain)
//   }
  
//   // switch(domain){
//   //   case "google":
//   //     return googleWrapper(state.google,domain)
//   //   case "youtube":
//   //     return youtubeWrapper(state.youtube)
//   //   default:
//   //     break;
//   // }
// }


// chrome.runtime.onMessage.addListener(
  
//     async function(request, sender, sendResponse) {
//       const domain = (document.domain).split('.')[1]
//       domain = selectObjectForDomen(domain, request.state)
//       domenManager(domain)
//       // console.log('state inside contenscript')
//       // console.log(request.state)
     

     

//   });




//   function setPageBackgroundColor(color){

//     let tags = document.querySelectorAll('a')  
//     tags.forEach((val,idx)=>{
//         val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`
//     })

//     domenManager(domen)

// } 







