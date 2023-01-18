let flagApply = false
let stateColor = null

const DEFAULT_STATE = {
  google:{},
  youtube:{},
}

chrome.runtime.onInstalled.addListener(()=>{
 
})

function sendToContenJs(tabId, changeInfo, tab){
  chrome.storage.sync.get(['full'], function(result) {
    chrome.tabs.sendMessage( tabId, {
      message: 'hello!',
      url: changeInfo,
      state: result.full,
      tabId: tabId
    })      
  });
}

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    sendToContenJs(tabId, changeInfo, tab)
  }
);

chrome.tabs.onActivated.addListener(
  function(tabId, changeInfo, tab) {
    sendToContenJs(tabId, changeInfo, tab)
  }
);

function getStateFromStorage(result){
  let state = {}
  if(result.full === undefined){ 
    state = {
      full: DEFAULT_STATE
    }
    return state 
  } else {
    state = result
    return state
  }
  
}

async function getFromStorageandSendToContent (stateAction) {

  chrome.storage.sync.get(['full'], function(result) {
 
  const domen = stateAction.domen
  const area = stateAction.area

  stateColor = {
    pallet: stateAction.pallet,
    color: stateAction.color,
  }
  
  let state = getStateFromStorage(result)
  state['full'][domen][area] = stateColor

  chrome.storage.sync.set(state, function() {
    console.log('Object is set ');
  });  
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {state: state.full});
  });  
  })
}

const resetAllStyle = () => {
  console.log('resetAllStyle')
  const state = {
    full: DEFAULT_STATE
  }
  chrome.storage.sync.set(state, function() {
    console.log('Object is set ');
  });  
}

chrome.runtime.onMessage.addListener( (request,sender,sendResponse) => {
  console.log(request)
  if(request.isReset)
    resetAllStyle()
  else
    getFromStorageandSendToContent(request.stateAction) 
})