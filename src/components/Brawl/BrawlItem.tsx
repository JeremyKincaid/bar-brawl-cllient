import React from 'react';
import apiurl from '../../environment';
import { BrawlObj } from '../Brawl/Brawl';
import Business from '../Business/Business';
import { BusinessObj } from '../Business/Business';
import { Card, CardContent } from '@material-ui/core';


interface States {
    bus1: BusinessObj,
    bus2: BusinessObj
}

interface Props {
    bra: BrawlObj,
    key: number
}

class BrawlItem extends React.Component<Props, States> {
    constructor(props: Props, states: States) {
        super(props, states);
        this.getBus = this.getBus.bind(this);
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
            }
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


    componentDidMount() {
        this.getBus(this.props.bra.business1Id ,this.props.bra.business2Id);
    }
     
    render() {
        return (
            <Card>
                <CardContent>
                    <h1>{this.props.bra.name}</h1>
                    <h2>{this.state.bus1.name} VS {this.state.bus2.name}</h2>
                </CardContent>
            </Card>
        )
    }
}

export default BrawlItem;