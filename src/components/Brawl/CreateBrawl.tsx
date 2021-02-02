import { TextField, Button, Select,FormControl, InputLabel, Paper } from '@material-ui/core';
import React from 'react';
import apiurl from '../../environment';
import SportsMmaTwoToneIcon from '@material-ui/icons/SportsMmaTwoTone';
import {BusinessObj} from '../Business/Business';
import './CreateBrawl.css';

interface States {
    name: string,
    drink: string,
    startDate: Date,
    endDate: Date,
    winnerId: number
    business1: number,
    business2: number,
    businesses: BusinessObj[]
}

interface Props {
    bus: BusinessObj,
    startBrawl: (key: number) => void
}

class CreateBrawl extends React.Component<Props, States> {
    constructor(props: Props, states: States){
        super(props, states);
        this.formatDate = this.formatDate.bind(this);
        this.removeThisBus = this.removeThisBus.bind(this);
        this.createBrawl = this.createBrawl.bind(this);
        // this.pullAllBusinesses = this.pullAllBusinesses.bind(this);
        // this.fillBusinesses = this.fillBusinesses.bind(this);
        this.state = {
            name: '',
            drink: '',
            startDate: new Date(),
            endDate: new Date(),
            winnerId: 0,
            business1: this.props.bus.id,
            business2: 0,
            businesses: []
        }
    }

    formatDate: (yr: number, mo: number, d: number) => string = (yr, mo, d) => {
        let strMo: string;
        let dateStr: string;
        if(mo < 10) {
            strMo = `0${mo.toString()}`;
        } else {
            strMo = mo.toString();
        }
        dateStr = `${yr.toString()}-${strMo}-${d.toString()}`;
        return dateStr;
    }

    pullAllBusinesses: () => void = () => {
        fetch(`${apiurl}/business/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({businesses: this.removeThisBus(rArr)})
        })
    }

    /**Removes the business that is initiating the brawl, so a business can't challenge itself
    */
    removeThisBus: (busArr: BusinessObj[]) => BusinessObj[] = (busArr) => {
        for( var i = 0; i < busArr.length; i++){ 
            if ( busArr[i].id === this.state.business1) { 
                busArr.splice(i, 1); 
                i--; 
            }
        }
        return busArr;
    }

    createBrawl = (e: React.MouseEvent) => {
        e.preventDefault();

        const url = `${apiurl}/brawl/new`;

        let body = {
            name: this.state.name,
            drink: this.state.drink,
            business1Pic: 'j',
            business2Pic: 'j',
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            winnerId: this.state.winnerId,
            business1Id: this.state.business1,
            business2Id: this.state.business2
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => console.log(rObj));

    }


    setBus2 = (e: React.ChangeEvent<{value: unknown }>) => {
        this.setState({business2: parseInt((e.currentTarget.value as number).toString())});
        console.log(e.target.value);
    }

    componentDidMount() {
        this.pullAllBusinesses();
    }

    render(){
        return(
            <Paper>
                <h1>Start Brawl</h1>
                <SportsMmaTwoToneIcon style={{ color: '#ed1818', fontSize: '80'}} fontSize="large"/>
                <h2>
                    {this.props.bus.name} VS <FormControl className="brawlControl">
                        <InputLabel id="opponent-label">Your opponent</InputLabel>
                        <Select className="brawlSelect" native id="businessSelect"  labelId="opponent-label" onChange={this.setBus2}>
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            <option></option>
                            {this.state.businesses.map((bus, i) => <option key={i} value={bus.id}>{bus.name}</option>)}
                        </Select>
                    </FormControl>
                </h2>
                <form>
                    {/* <label htmlFor="name">Brawl Name</label> */}
                    <br />
                    <TextField className="brawlInput" label="Brawl Name" id="name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
                    <br />

                    {/* <label htmlFor="drink">Drink</label> */}
                    <br />
                    <TextField className="brawlInput" label="Choose a drink for the brawl(ex: Margarita, Brown Ale, Appletini)" id="drink" value={this.state.drink} onChange={e => this.setState({drink: e.target.value})} />
                    <br />
                    <br />

                    {/* <label htmlFor="startDate">Start Date</label>
                    <br />
                    <Input id="startDate" type="date" value={ this.state.startDate.toLocaleDateString() } onChange={
                        e => this.setState({
                            startDate: new Date(e.target.value)
                        })
                    } /> */}
                    <TextField
                        className="brawlInput"
                        id="startDate"
                        label="Start Date"
                        type="date"
                        defaultValue={new Date()}
                        InputLabelProps={{shrink: true}}
                        value={this.formatDate(this.state.startDate.getFullYear(), this.state.startDate.getMonth() + 1, this.state.startDate.getDate() + 1)} variant="outlined"
                        // value= {`${this.state.startDate.getFullYear().toString()}-${this.formatDate(this.state.startDate.getMonth() + 1)}-${(this.state.startDate.getDate() + 1).toString()}`}
                        onChange={e => this.setState({
                            startDate: new Date(e.target.value)
                        })}
                    />

                    <br />
                    <br />

                    <TextField
                        className="brawlInput"
                        id="endDate"
                        label="End Date"
                        type="date"
                        defaultValue={new Date()}
                        InputLabelProps={{shrink: true}}
                        value={this.formatDate(this.state.endDate.getFullYear(), this.state.endDate.getMonth() + 1, this.state.endDate.getDate() + 1)}
                        onChange={e => this.setState({
                            endDate: new Date(e.target.value)
                        })} variant="outlined"
                    />


                </form>

                <br />
                <Button className="brawlButton" variant="outlined" color="secondary" onClick={() => this.props.startBrawl(0)}>Cancel</Button>
                <Button className="brawlButton" variant="outlined" color="primary" onClick={this.createBrawl} >Submit</Button>
            </Paper>
        )
    }
}


export default CreateBrawl;