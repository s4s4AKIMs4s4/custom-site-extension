let flagApply = false
let stateColor = null

const DEFAULT_STATE = {
  google:{},
  youtube:{},
}

chrome.runtime.onInstalled.addListener(()=>{})

function sendToContenJs(tabId, changeInfo, tab){
  chrome.storage.sync.get(['data'], function(result) {
    chrome.tabs.sendMessage( tabId, {
      message: 'hello!',
      url: changeInfo,
      state: result.data,
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
  if(result.data === undefined){ 
    state = {
      data: DEFAULT_STATE
    }
    return state 
  } else {
    state = result
    return state
  }
  
}

async function getFromStorageandSendToContent (stateAction) {
  console.log('opa')
  chrome.storage.sync.get(['data'], function(result) {
 
  const domen = stateAction.domen
  const area = stateAction.area

  stateColor = {
    pallet: stateAction.pallet,
    color: stateAction.color,
  }
  
  let state = getStateFromStorage(result)
  state['data'][domen][area] = stateColor

  chrome.storage.sync.set(state, function() {
    console.log('Object is set ');
  });  
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {state: state.data});
  });  
  })
}

const resetAllStyle = () => {
  const state = {
    data: {
      google:{},
      youtube:{},
    }
  }
  chrome.storage.sync.set(state, function() {
    console.log('Object is set ');
  });  
}

chrome.runtime.onMessage.addListener( (request,sender,sendResponse) => {
  if(request.isReset)
    resetAllStyle()
  else
    getFromStorageandSendToContent(request.stateAction)
})