import React from 'react';
import {Button, InputLabel, Input} from '@material-ui/core';
import apiurl from '../../environment';

interface States {
    name: string,
    description: string,
    location: string,
    wins: number,
    losses: number,
    verified: boolean
    creating: boolean
}

interface Props {
    userId: number,
    sessionToken: string
}

class CreateBusiness extends React.Component<Props, States> {
    constructor(props: Props, states: States){
        super(props, states);
        this.createBusiness = this.createBusiness.bind(this);
        this.toggleCreating = this.toggleCreating.bind(this);
        this.state = {
            name: '',
            description: '',
            location: '',
            wins: 0,
            losses: 0,
            verified: false,
            creating: false
        }
    }

    toggleCreating = (e: React.MouseEvent) => {
        e.preventDefault();

        this.setState({creating: !this.state.creating});
    }

    createBusiness = (e: React.MouseEvent) => {
        e.preventDefault();

        const url = `${apiurl}/business/new`;

        let body = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            wins: this.state.wins,
            losses: this.state.losses,
            verified: false,
            userId: parseInt(localStorage.userId)
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

    render(){
        if(this.state.creating === false) {
            return(
                <Button className="btn-primary" onClick={this.toggleCreating}>Add Business</Button>
            )
        }
        return(
            <div>
                <InputLabel htmlFor="name">Name</InputLabel>
                <br/>
                <Input id="name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
                <br />

                <InputLabel htmlFor="description">Description</InputLabel>
                <br/>
                <Input id="description" value={this.state.description} onChange={e => this.setState({description: e.target.value})} />
                <br />

                <InputLabel htmlFor="location">Location</InputLabel>
                <br/>
                <Input id="location" value={this.state.location} onChange={e => this.setState({location: e.target.value})} />
                <br/>

                <Button className="btn-primary" onClick={this.createBusiness}>Submit</Button>
                <Button className="btn-secondary" onClick={this.toggleCreating}>Cancel</Button>
            </div>
        )
    }
}



export default CreateBusiness;