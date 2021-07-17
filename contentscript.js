chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
      // listen for messages sent from background.js
      if (request.message === 'hello!') {
          setPageBackgroundColor()
        console.log(request.tabId) // new url is now in content scripts!
    //     chrome.scripting.executeScript({
    //     target:{tabId:tabId.id},
    //     function: setPageBackgroundColor,
    // })    

      }
  });




  function setPageBackgroundColor(){
    chrome.storage.sync.get('color',({color})=>{
        // document.body.style.backgroundColor = color
        //:not(.fWhgmd),
        //RNNXgb - border of input
        const styleSheets = Array.from(document.styleSheets).filter(
            (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
          );
        
        console.log(styleSheets)
        let elements = document.querySelectorAll( ':not(.c7cjWc)');
        let borderColor = document.querySelectorAll('.RNNXgb')
        let tags = document.querySelectorAll('a')  
        
        tags.forEach((val,idx)=>{
            val.style.color = 'red'
        })
        //color of background
        // elements.forEach((val,idx)=>{
        //     // tag.style.color = 'red'
        //     borderColor.style.borderColor = 'red'

        //     // val.style.backgroundColor = color
        // })
    })
} 







