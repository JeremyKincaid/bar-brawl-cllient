import React from 'react';
import apiurl from '../../environment';
import Brawl from '../Brawl/Brawl';
import Business from '../Business/Business';


interface States {
    bus1: Business,
    bus2: Business
}

interface Props {
    bra: Brawl
        
        // name: string,
        // drink: string,
        // business1Pic: string,
        // business2Pic: string,
        // startDate: Date,
        // endDate: Date,
        // winnerId: number,
        // business1Id: number,
        // business2Id: number
    ,
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
                }
        }
    }

    getBus: (id1: number, id2: number) => void = (id1, id2) => {
        fetch(`${apiurl}/business/${id1}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({bus1: rArr})
        })
        fetch(`${apiurl}/business/${id2}/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({bus2: rArr})
        })
    }

    componentDidMount() {
        this.getBus(this.props.bra.business1Id, this.props.bra.business2Id);
    }

    render(){
        return(
            <div>
                <h2>{this.state.bus1.name} VS {this.state.bus2.name}</h2>
                {this.props.bra.name}
            </div>
        )
    }
}

export default BrawlItem;