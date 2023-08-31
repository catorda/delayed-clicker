import Button from "@mui/material/Button";
import React from "react";


export class Control extends React.Component<any, {
    listeningForClick: boolean;
    delayedClickStarted: boolean;
}> {
    
    private element: any;
    private port: chrome.runtime.Port;

    private get controlProcessingInProgress() {
        return !this.state.listeningForClick &&
            !this.state.delayedClickStarted;
    }
    constructor(props: any) {
        super(props);

        this.state = {
            listeningForClick: false,
            delayedClickStarted: false,
        }

        debugger;
        console.log('assigning port ', props.port)
        this.port = props.port;
    }

    async componentDidMount() {
        debugger;
        console.log('mount port', this.port);
        this.port.onMessage.addListener((msg) => {
            switch (msg.type) {
                case 'selectedElement':
                    this.port.postMessage({
                        type: 'elementSelected',
                        element: msg.element
                    });
                    break;
                default:
                    break;
            }
        })
    }

    onSetElementToClick() {
        this.setState({
            listeningForClick: true
        });
        this.port.postMessage({
            type: 'selectElementStart'
        });
    }

    startDelayedClick() {
        this.port.postMessage({
            type:'startDelayedClick'
        })
    }

    render() {
        return (<div>
                <Button disabled={!this.controlProcessingInProgress} onClick={this.onSetElementToClick.bind(this)} >Set Click Element</Button>
                <Button disabled={!this.controlProcessingInProgress} onClick={this.startDelayedClick.bind(this)} >Start Delayed Click</Button>
                </div>
        )

    }
}