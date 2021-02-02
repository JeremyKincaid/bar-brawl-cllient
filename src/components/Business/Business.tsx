import React from 'react';
import apiurl from '../../environment';
import CreateBrawl from '../Brawl/CreateBrawl';
import BusinessItem from '../Business/BusinessItem';
import {Grid} from '@material-ui/core';

export interface BusinessObj {
    name: string,
    description: string,
    location: string,
    wins: number,
    losses: number,
    verified: boolean,
    userId: number,
    id: number
}

interface States {
    businesses: BusinessObj[],
    startingBrawl: boolean,
    businessKey: number
}

interface Props {

}

class Business extends React.Component<Props, States> {
    constructor(props: Props, states: States) {
        super(props, states);
        this.getBusinesses = this.getBusinesses.bind(this);
        this.startBrawl = this.startBrawl.bind(this);
        this.state = {
            businesses: [],
            startingBrawl: false,
            businessKey: 0
        }
    }

    getBusinesses: () => void = () => {
        // let businessArr: Business[];
        fetch(`${apiurl}/business/my/${parseInt(localStorage.userId)}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({businesses: rArr});
        })
        // return(businessArr);
    }

    componentDidMount(){
        this.getBusinesses();
    }

    startBrawl: (key: number) => void = (key) => {
        this.setState({startingBrawl: !this.state.startingBrawl})
        this.setState({businessKey: key})
    }

    render(){
        if(this.state.startingBrawl === false) {
            return(
                <div>
                    <h1>Your Businesses</h1>
                    <Grid container justify="space-evenly" spacing={2} direction="row">
                        {this.state.businesses.map((busObj, i) => <BusinessItem bus={busObj} key={i} placeNumber={i} startBrawl={this.startBrawl} startingBrawl={this.state.startingBrawl} />)}
                    </Grid>
                </div>
            )
        } else {
            return(
                <div>
                    <CreateBrawl bus={this.state.businesses[this.state.businessKey]} startBrawl={this.startBrawl} />
                </div>
            )
        }
    }
}





export default Business;