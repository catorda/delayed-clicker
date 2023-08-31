import React from "react";
// import { storageLocalGet, storageLocalSet } from "./ChromeWrappers";
import { storageLocalGet, storageLocalSet } from "./MemoryStorage";

import { ClickerSettings } from "./ClickerSettings";
import { DelayType } from "./DelayType";
import { Control } from "./Control";
import { IDelayClikerSettingsSettings } from "./models/DelayClickerSettings";

interface IDelayClickerSettingsState {
    settings?: IDelayClikerSettingsSettings,
    initialized: boolean;
}

export class DelayClickerSettings extends React.Component<any, IDelayClickerSettingsState> {

    private delayedClickerPort: any;

    constructor(props: any) {
        super(props);

        this.state = {
            initialized: false
        };

        this.delayedClickerPort = chrome.runtime.connect({name: 'delayedClicker'}); 

        this.delayedClickerPort.onMessage.addListener((msg: any) => {

        })

    }

    async componentDidMount() {
        const storageResults = await storageLocalGet(['delayedclicker']) as unknown as IDelayClickerSettingsState; 
        
        if (storageResults != undefined) {
            let defaultState = {
                currentType: DelayType.Seconds,
                seconds: 10,
                bpm: 90,
                beats: 8,
            };
            this.setState({
                settings: defaultState,
                initialized: true
            });
            storageLocalSet({
                delayedclicker: defaultState
            });
        } else {
            this.setState({
                settings: storageResults,
                initialized: true
            });
        }

        chrome.tabs.query({
            active: true,
        }, (tabs) => {
            console.log('received a tab ', tabs[0] !== undefined);
            const tab = tabs[0];

            if (tab && tab.id !== undefined) {
                console.log('executing script');
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["selectelement.js", "delayedclicker.js"]
                });
            }
        })
    }

    onTypeChange(type: DelayType) {
        const newSettings = Object.assign({}, this.state.settings);
        newSettings.currentType = type;
        this.updateSettings(newSettings);
    }

    onSecondsChange(seconds: number) {
        const newSettings = Object.assign({}, this.state.settings);
        newSettings.seconds = seconds;
        this.updateSettings(newSettings);
    }

    onBpmChange(bpm: number) {
        const newSettings = Object.assign({}, this.state.settings);
        newSettings.bpm = bpm;
        this.updateSettings(newSettings);
    }

    onBeatsChange(beats: number) {
        const newSettings = Object.assign({}, this.state.settings);
        newSettings.beats = beats;
        this.updateSettings(newSettings);
    }

    render() {

        if (this.state.initialized && this.state.settings) {
            const currentSettings = this.state.settings;
            return (
                <div>
                    <ClickerSettings 
                        currentType={ currentSettings?.currentType }
                        seconds = { currentSettings.seconds }
                        bpm = { currentSettings.bpm }
                        beats = { currentSettings.beats }
                        onTypeChange = { this.onTypeChange.bind(this) }
                        onSecondsChange = { this.onSecondsChange.bind(this) }
                        onBpmChange = { this.onBpmChange.bind(this) }
                        onBeatsChange = { this.onBeatsChange.bind(this) } />
                    <Control port = {this.delayedClickerPort} />
                </div>
                
            )
        } else {
            return <div> LOADING </div>
        }
    }

    private updateSettings(settings: IDelayClikerSettingsSettings) {
        console.log('updating settings', settings);
        this.setState({settings: settings});

        storageLocalSet({
            delayedclicker: settings
        });

        this.delayedClickerPort.postMessage({
            type: 'settingsChanged',
            settings: settings
        })
    }


    
}