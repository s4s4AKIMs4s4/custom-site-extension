



const checkKeysForLength = (state, domain) => (Object.keys(state[domain]).length === 0)


const template = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })

}

const templateBorderColor = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })

}

const templateBackgroundColor = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
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

  performInput(color){
    templateBorderColor('.RNNXgb', color)
  }

  performBackground(color){
  
    const BackgroundSelecors = ['body','.I6TXqe ','.nm6nmc', '.Lj180d', '.y8Jpof.kpQuGf','.nm6nmc.kpQuGf',
    '.sfbg','.yg51vc','.f6F9Be','WE0UJf','#extabar','.MXl0lf.mtqGb','.aajZCb',
    '.Lj9fsd','.tAcEof','.cj2HCb','.mR2gOd','.FalWJb','.c93Gbe','.mnr-c.pla-unit',
    'html','.s8GCU','.jZWadf','g-inner-card']

    BackgroundSelecors.forEach((val)=>{ templateBackgroundColor(val, color) })
    
    //document.querySelectorAll('g-inner-card').forEach((val)=>{ val.style.backgroundColor = 'aqua'})
  }

}







class Youtube{
  _scrollUpadtaAlgoritm= null

  constructor(){
    this._scrollUpadtaAlgoritm = new ScrollUpadtaAlgoritm
  }
  
  performText(color){
    this._scrollUpadtaAlgoritm.setText(color)
    this._scrollUpadtaAlgoritm.infinityScrollColorUpdate()
    
    
  }
  
  performLinks(color){
    this._scrollUpadtaAlgoritm.setLink(color)
    this._scrollUpadtaAlgoritm.infinityScrollColorUpdate()

  }

  performInput(color){
    console.log('hello ia ma in change input function')
    console.log(color)
    templateBorderColor('#container',color)
    templateBorderColor('#search-icon-legacy',color)
  }

  performBackground(color){
    templateBackgroundColor('canvas,#endpoint,.style-scope.ytd-app, caption, center, cite, code,dd, del, dfn, div, dl, dt, em, embed, fieldset, font, form, h1, h2, h3, h4, h5, h6, hr, i, iframe, img, ins, kbd, label, legend, li, menu, object, ol, p, pre, q, s, samp, small, span, strike, strong, sub, sup, table, tbody, td, tfoot, th, thead, tr, tt, u, ul, var',color)
    document.querySelector('.ytp-gradient-bottom').style.backgroundColor = 'transparent'
  }

}




class ScrollUpadtaAlgoritm  {
  _text = false
  _link = false
  _numberOfPagePassed = 1 

  paintText(){
    template('span', this._text)
    template('h1',this._text)
    template('#text-container',this._text)
    template('#content-text',this._text)
  }

  paintLink(){
    template('a',this._link)
    template('yt-formatted-string',this._link)
    template('yt-icon',this._link)
  }

  setText(color){
    console.log("setText")
    this._text = color
    this.paintText()

  }
  setLink(color){
    this._link = color
    this.paintLink()
  }

  infinityScrollColorUpdate(){
    document.addEventListener("scroll", (event) => {

      const currentOffset = window.pageYOffset
      const heightWindows = window.innerHeight
      const del = Math.floor( currentOffset / heightWindows )
    
      if(del >= this._numberOfPagePassed)
      {
          this._numberOfPagePassed++
          if(this._text){
            this.paintText()
          }
          if(this._link){
            this.paintLink()
          }  
       }
    
    
    
    })


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
        break;
      case 'input':
        this._domen.performInput(color)
        break;
      case 'backgrounds':
        this._domen.performBackground(color)
        break;
    }
  }

  performAllArea(areaobj){
    for(const  [area, value] of Object.entries(areaobj) ){
      console.log(area)
      console.log(value)
      if(value.pallet === 'reset'){
        console.log('inside value pallet')
        continue
      }
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
        console.log(request.state[currentDomain])
        director.performAllArea(request.state[currentDomain])
      }

  });




