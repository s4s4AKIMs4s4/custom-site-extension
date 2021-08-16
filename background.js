let flagApply = false
let stateColor = null





chrome.runtime.onInstalled.addListener(()=>{
 
})

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
     
     chrome.storage.sync.get(['full'], function(result) {
      console.log("background:")
      console.log(result.full)

      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo,
        state: result.full,
        tabId: tabId
      })
      
    });

    



    }
  );
chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(activeInfo)

  }); 
  
  
  const logging = (val,describe) => {
    console.log(describe)
    console.log(val)
  }
  
   async function getFromStorageandSendToContent (stateAction) {

    chrome.storage.sync.get(['full'], function(result) {


      let state = {}
      const domen = stateAction.domen
      const area = stateAction.area
      
      stateColor = {
        pallet:stateAction.pallet,
        color:stateAction.color,
      }
      



      logging(result.full,'from getObjectFromStorage')
      if(result.full === undefined){ 
        console.log('hi')
        state = {
          full: {
            google:{},
            youtube:{},
          } 
        } 



          
      }

      else {
        state = result
      }
      


      logging(state,'state object')
      state['full'][domen][area] = stateColor
      logging(state,'state after update')    

      
      chrome.storage.sync.set(state, function() {
        console.log('Object is set ');
      });  
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {state: state.full});
      });  
      })
    
  }









  

  chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
  {
    
    
    
   
    logging(stateColor,'stateColor inside background.js')
    getFromStorageandSendToContent(request.stateAction)

    
    
    
  })
  
  
  
  
  
  
  
  
  
  

 



















