


function rendoringTemplate(selectors, color, callbackForRedor) {
  selectors.forEach((val)=>{
    callbackForRedor(val, color)
  })
}


class commonTemplate{

template = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.color = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })

}

templateBorderColor = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })

}

 templateBackgroundColor = (selector, color) => {
  const allEments = document.querySelectorAll(selector)
  allEments.forEach((val,idx)=>{
                      val.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
                    })
  }

  templateOneBackgroundColor = (selector, color) => {
      document.querySelector(selector).style.backgroundColor = color
    }


   

}

class Google extends commonTemplate{
 
  performText(color){

    const selectors = ['span', 'em']
    rendoringTemplate(selectors, color, this.template)


  }
  performLinks(color){
    this.template('a',color)
  }

  performInput(color){
    this.templateBorderColor('.RNNXgb', color)
  }

  performBackground(color){
  
    const BackgroundSelecors = ['body','.I6TXqe ','.nm6nmc', '.Lj180d', '.y8Jpof.kpQuGf','.nm6nmc.kpQuGf',
    '.sfbg','.yg51vc','.f6F9Be','WE0UJf','#extabar','.MXl0lf.mtqGb','.aajZCb',
    '.Lj9fsd','.tAcEof','.cj2HCb','.mR2gOd','.FalWJb','.c93Gbe','.mnr-c.pla-unit',
    'html','.s8GCU','.jZWadf','g-inner-card','ytd-author-comment-badge-renderer','.ytp-paid-content-overlay','.ytp-spinner']
    
    rendoringTemplate(BackgroundSelecors, color, this.templateBackgroundColor)

  }

}







class Youtube extends commonTemplate{
  _scrollUpadtaAlgoritm= null

  constructor(){
    super()
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
    const selectors = ['#container','#search-icon-legacy']
    rendoringTemplate(selectors, color, this.templateBorderColor )

  }

  performBackground(color){
    
    //this.templateBackgroundColor('canvas,#endpoint,.style-scope.ytd-app, caption, center, cite, code,dd, del, dfn, div, dl, dt, em, embed, fieldset, font, form, h1, h2, h3, h4, h5, h6, hr, i, iframe, img, ins, kbd, label, legend, li, menu, object, ol, p, pre, q, s, samp, small, span, strike, strong, sub, sup, table, tbody, td, tfoot, th, thead, tr, tt, u, ul, var, #items',color)

    
    this.templateBackgroundColor('canvas,#endpoint,.style-scope.ytd-app, caption, center, cite, code,dd, del, dfn, dl, dt, em, embed, fieldset, font, form, h1, h2, h3, h4, h5, h6, hr, i, iframe, img, ins, kbd, label, legend, li, menu, object, ol, p, pre, q, s, samp, small, span, strike, strong, sub, sup, table, tbody, td, tfoot, th, thead, tr, tt, u, ul, var, #items',color)

    // #chips.ytd-feed-filter-chip-bar-renderer
    // ytd-mini-guide-entry-renderer
    // #container.ytd-masthead
    
    document.querySelector('#container.ytd-masthead').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('#chips.ytd-feed-filter-chip-bar-renderer'))
      document.querySelector('#chips.ytd-feed-filter-chip-bar-renderer').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-mini-guide-entry-renderer'))
      document.querySelector('ytd-mini-guide-entry-renderer').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('.ytp-exp-bottom-control-flexbox .ytp-volume-area'))
      document.querySelector('.ytp-exp-bottom-control-flexbox .ytp-volume-area').style.backgroundColor = 'transparent'
    if(document.querySelector('.ytp-chapter-title-prefix'))
      document.querySelector('.ytp-chapter-title-prefix').style.backgroundColor = 'transparent'
    if(document.querySelector('#right-arrow-button.ytd-feed-filter-chip-bar-renderer'))
      document.querySelector('#right-arrow-button.ytd-feed-filter-chip-bar-renderer').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('#right-arrow.ytd-feed-filter-chip-bar-renderer:before'))
      document.querySelector('#right-arrow.ytd-feed-filter-chip-bar-renderer:before').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-browse[mini-guide-visible] ytd-playlist-sidebar-renderer.ytd-browse'))
      document.querySelector('ytd-browse[mini-guide-visible] ytd-playlist-sidebar-renderer.ytd-browse').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-item-section-renderer'))
      document.querySelector('ytd-item-section-renderer').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-playlist-sidebar-renderer.ytd-browse, ytd-settings-sidebar-renderer.ytd-browse'))
      document.querySelector('ytd-playlist-sidebar-renderer.ytd-browse, ytd-settings-sidebar-renderer.ytd-browse').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-browse[page-subtype=playlist][has-sidebar_], ytd-browse[page-subtype=show][has-sidebar_]'))
      document.querySelector('ytd-browse[page-subtype=playlist][has-sidebar_], ytd-browse[page-subtype=show][has-sidebar_]').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-page-manager > *.ytd-page-manager'))
      document.querySelector('ytd-page-manager > *.ytd-page-manager').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('ytd-c4-tabbed-header-renderer.grid-4-columns #channel-header.ytd-c4-tabbed-header-renderer'))
      document.querySelector('ytd-c4-tabbed-header-renderer.grid-4-columns #channel-header.ytd-c4-tabbed-header-renderer').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`
    if(document.querySelector('.sbsb_c'))
      document.querySelector('.sbsb_c').style.background = 'transparent'
    
      

      
      // ytd-c4-tabbed-header-renderer.grid-4-columns #channel-header.ytd-c4-tabbed-header-renderer  
      // ytd-page-manager > *.ytd-page-manager 
     // ytd-c4-tabbed-header-renderer.grid-4-columns #channel-header.ytd-c4-tabbed-header-renderer
     
     
     
     
      //.ytp-exp-bottom-control-flexbox .ytp-volume-area 
      //.ytp-time-current, .ytp-time-separator, .ytp-time-duration
    //.ytp-time-current, .ytp-time-separator, .ytp-time-duration

    //document.querySelector('#search-container').style.backgroundColor = 'transparent'
    //document.querySelector('#search-input').style.backgroundColor = 'white'

    // if(document.querySelector('.ytp-gradient-bottom'))
    //   document.querySelector('.ytp-gradient-bottom').style.backgroundColor = 'transparent'
    // if(document.querySelector('#container.ytd-searchbox input.ytd-searchbox'))
    //   document.querySelector('#container.ytd-searchbox input.ytd-searchbox').style.backgroundColor = 'white'
    
    

  }

}




class ScrollUpadtaAlgoritm extends commonTemplate  {
  _text = false
  _link = false
  _numberOfPagePassed = 1 
  flag = false

  paintText(){
    const selectors = ['span','h1','#text-container','#content-text','yt-formatted-string','b']
    rendoringTemplate(selectors, this._text, this.template )
  }

  paintLink(){
    const selectors = ['a','yt-icon']
    rendoringTemplate(selectors, this._link, this.template )

  }

  setText(color){
    this._text = color
    this.paintText()

  }
  setLink(color){
    this._link = color
    this.paintLink()
  }
  
  paint() {
    if(this._text){
      this.paintText()
    }
    if(this._link){
      this.paintLink()
    }  
  }

  infinityScrollColorUpdate(){
    document.addEventListener("scroll", (event) => {

      const currentOffset = window.pageYOffset
      const heightWindows = window.innerHeight
      const del = Math.floor( currentOffset / heightWindows )
    
      if (!this.flag){
        this.paint()
        this.flag = true
      }

      if(del >= this._numberOfPagePassed)
      {
          this._numberOfPagePassed++
          this.paint()
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
      if(value.pallet === 'reset'){
        continue
      }
      this.performArea(area, value.color )
    }

  }
}

const checkKeysForLength = (state, domain) => (Object.keys(state[domain]).length === 0)

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
      const currentDomain = (document.domain).split('.')[1]     
      domain  = selectObjectForDomen(currentDomain,request.state)
      if(domain){
        director = new Director(domain)
        director.performAllArea(request.state[currentDomain])
      }
    
  });




