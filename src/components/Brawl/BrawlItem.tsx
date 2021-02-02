import React from 'react';
import apiurl from '../../environment';
import { BrawlObj } from '../Brawl/Brawl';
import { BusinessObj } from '../Business/Business';
import { Button, Grid, Paper } from '@material-ui/core';
import './BrawlItem.css';


interface States {
    bus1: BusinessObj,
    bus2: BusinessObj,
    vote1: number,
    vote2: number
}

interface Props {
    bra: BrawlObj,
    key: number
}

class BrawlItem extends React.Component<Props, States> {
    constructor(props: Props, states: States) {
        super(props, states);
        this.getBus = this.getBus.bind(this);
        this.vote1 = this.vote1.bind(this);
        this.vote2 = this.vote2.bind(this);
        this.state = {
            bus1: {
                name: '',
                description: '',
                location: '',
                wins: 0,
                losses: 0,
                verified: false,
                userId: 0,
                id: 0
            },
            bus2: {
                name: '',
                description: '',
                location: '',
                wins: 0,
                losses: 0,
                verified: false,
                userId: 0,
                id: 0
            },
            vote1: 0,
            vote2: 0
        }
    }

    getBus2 = async (id2: number) => {
        console.log(`id2: ${id2}`);
        let response2 = await fetch(`${apiurl}/business/${id2}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        // .then(r => r.json())
        // .then(rObj => {
        //     console.log(rObj);
        //     this.setState({bus2: rObj})

        // })
        let rObj = await response2.json();
        console.log(rObj);
        this.setState({ bus2: rObj })

    }

    getBus = async (id1: number, id2: number) => {
        console.log(this.props.bra.business1Id);
        console.log(this.props.bra.business2Id);
        // console.log(this.props.bra);
        console.log(`id1: ${id1}`);
        console.log(`id2: ${id2}`);
        let response1 = await fetch(`${apiurl}/business/${id1}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        //     // .then(r => r.json())
        //     // .then(rObj => {
        //     //     console.log(rObj);
        //     //     this.setState({bus1: rObj});
        //     //     this.getBus2(this.props.bra.business2Id);
        //     // })

        let rObj = await response1.json();
        console.log(rObj);
        this.setState({ bus1: rObj });
        this.getBus2(this.props.bra.business2Id);
        // // let response2 = await fetch(`${apiurl}/business/${id2}`, {
        //     //     method: 'GET',
        //     //     headers: {
        //     //         'Content-type': 'application/json'
        //     //     }
        //     // })
        //     // .then(r => r.json())
        //     // .then(rObj => {
        //     //     console.log(rObj);
        //     //     this.setState({bus2: rObj})
    }

    vote1 = (e: React.MouseEvent) => {
        e.preventDefault();

        let body = {
            businessId: this.props.bra.business1Id,
            brawlId: this.props.bra.id,
            userId: parseInt(localStorage.userId)
        }

        fetch(`${apiurl}/vote/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => {
            console.log(rObj);
        })
        this.getVotes();
    } 

    vote2 = (e: React.MouseEvent) => {
        e.preventDefault();

        let body = {
            businessId: this.props.bra.business2Id,
            brawlId: this.props.bra.id,
            userId: parseInt(localStorage.userId)
        }

        fetch(`${apiurl}/vote/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => {
            console.log(rObj);
        })
        this.getVotes();
    }

    getVotes = () => {
        fetch(`${apiurl}/vote/count/${this.props.bra.id}/${this.props.bra.business1Id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({vote1: rArr.length});
        });
        fetch(`${apiurl}/vote/count/${this.props.bra.id}/${this.props.bra.business2Id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            console.log(rArr.length)
            this.setState({vote2: rArr.length});
        });
    }

    componentDidMount() {
        this.getBus(this.props.bra.business1Id ,this.props.bra.business2Id);
        this.getVotes();
    }
     
    render() {

        let brawl = this.props.bra;
        let bus1 = this.state.bus1;
        let bus2 = this.state.bus2;
        let vote1 = this.state.vote1.toString();
        let vote2 = this.state.vote2.toString();

        return (
            <Paper elevation={6} square={true} className="brawlCard">
                <Grid container spacing={2} direction="row" justify="space-evenly" alignItems="center" alignContent="center">
                    <Grid item>
                        <Button className="voteBtnRed" variant='outlined' color='secondary' onClick={this.vote1}>Vote for {bus1.name}</Button>
                        <br />
                        {vote1} votes
                    </Grid>

                    <Grid item>
                        <h2>{bus1.name} vs {bus2.name}</h2>
                        <h3>{brawl.name}</h3>
                    </Grid>

                    <Grid item>
                        <Button className="voteBtnBlue" variant='outlined' color='primary' onClick={this.vote2}>Vote for {bus2.name}</Button>
                        <br />
                        {vote2} votes
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default BrawlItem;