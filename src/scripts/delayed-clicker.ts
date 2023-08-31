

import { DelayClickerSettings } from "../DelayClickerSettings";
const delayedClickerPort = chrome.runtime.connect({name: 'delayedClicker'});

delayedClickerPort.postMessage({name: 'delayedClickerReady'});

let settings: DelayClickerSettings;
delayedClickerPort.onMessage.addListener((msg) => {
    if (msg.type === 'updateSettings') {
        settings = msg.settings;
        console.log('dcs: settings updated');
    } else if (msg.type === 'startDelayedClick') {
        console.log("starting delayed click");
    }
});
