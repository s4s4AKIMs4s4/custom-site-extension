


let changeColor = document.getElementById('changeColor');
console.log(changeColor)
chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color;
    // let elements = document.querySelectorAll( 'body *');
    
    // elements.forEach((val,idx)=>{
    //     val.style.backgroundColor = 'red'
    // })


});

// let [tab]  = chrome.tabs.query(
//     {
//         active: true,
//         currentWindow: true
//     }
// ) 
// chrome.scripting.executeScript({
// target:{tabId:tab.id},
// function: setPageBackgroundColor,
// })




let changeSizeOfText = document.getElementById('changeSizeOfText')
chrome.storage.sync.get('text',({ text }) => {
    changeSizeOfText.style.size = text
})


changeColor.addEventListener('click', async ()=>{
    let [tab]  = await chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            }
        ) 
        chrome.scripting.executeScript({
        target:{tabId:tab.id},
        function: setPageBackgroundColor,
    })    
})


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
