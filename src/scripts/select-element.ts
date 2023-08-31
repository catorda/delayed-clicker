/**
 * Content scrip that's run to select an element 
 */

const port = chrome.runtime.connect({name: 'delayedClicker'});

port.onMessage.addListener((msg) => {
    if (msg.type === 'selectElementStart') {
        // TODO : send message for starting to listen
        // to click ? 

        // Start the event listener for the mousedown event
        document.addEventListener("mousedown", (event) => {
            const element = event.target;
            if (element) {
                alert(element);
                console.log(element);
                // @ts-ignore
                element.style.border = '2px solid #880808'
                port.postMessage({
                    type: 'elementSelected',
                    element: element
                });
            }
        });
    }
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) {
        
    }
)