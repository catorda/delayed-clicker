import { Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react';
import { DelayType } from './DelayType';

export interface IClickerSettingsProps {
    currentType: DelayType;
    seconds: number;
    bpm: number;
    beats: number;
    onTypeChange: (type: DelayType) => void;
    onSecondsChange: (seconds: number) => void;
    onBpmChange: (bpm: number) => void;
    onBeatsChange: (beats: number) => void;
    
}
export class ClickerSettings extends React.Component<IClickerSettingsProps, any> {

    constructor(props: IClickerSettingsProps) {
        super(props);
    }

    onTypeChange(event: { target: { value: DelayType; }; }) {
        this.props.onTypeChange(event.target.value);
    }

    render() {

        let settingsToDisplay;
        if (this.props.currentType === DelayType.Seconds) {
            console.log('rendering seconds settings', this.props);
            settingsToDisplay = 
                <Container>
                     <TextField
                        required
                        id="outlined-required"
                        label="Seconds"
                        defaultValue="0"
                        onChange = { (e) => { this.props.onSecondsChange(parseInt(e.target.value))}}
                        value= { this.props.seconds }
                    />
                </Container>
        } else {
            console.log('rendering bpm settings');

            settingsToDisplay = 
            <Container>
                <TextField
                    required
                    id="outlined-required"
                    label="BPM"
                    defaultValue="60"
                    onChange = { (e) => { this.props.onBpmChange(parseInt(e.target.value))}}
                    value={this.props.bpm}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Beats"
                    defaultValue="4"
                    onChange = { (e) => { this.props.onBeatsChange(parseInt(e.target.value))}}
                    value={this.props.beats}
                />
            </Container>
        }
        return (
            <Container>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Seconds"
                        onChange={(e) => this.props.onTypeChange(e.target.value as unknown as DelayType)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="bpm" control={<Radio />} label="BPM" />
                        <FormControlLabel value="seconds" control={<Radio />} label="Seconds" />
                    </RadioGroup>
                </FormControl>
                {settingsToDisplay}
            </Container>
        )
    }

}