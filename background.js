let state = false


chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({color});
    chrome.storage.sync.set({text});
    console.log('Default background color set to %cgreen',`color:${color}`)
    
})

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // read changeInfo data
        state = !state

        // chrome.scripting.executeScript({
        //     target:{tabId:tabId},
        //     function: setPageBackgroundColor,
        // })  

      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo,
        state: state,
        tabId: tabId
      })
      
      
    }
  );
chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(activeInfo)
    // how to fetch tab url using activeInfo.tabid
    // chrome.tabs.get(activeInfo.tabId, function(tab){
    //    console.log(tab.url);
    // });
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