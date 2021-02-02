import { Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import './BusinessItem.css';

interface States {
}

interface Props {
    bus: {
        name: string,
        description: string,
        location: string,
        wins: number,
        losses: number,
        verified: boolean,
        userId: number,
    },
    key: number,
    startBrawl: (key: number) => void,
    startingBrawl: boolean
    placeNumber: number
}

class BusinessItem extends React.Component<Props, States> {

    render() {
        let business = this.props.bus;
        console.log(this.props)
            return (
            <Grid item xs={12} md={4}>
                <Paper elevation={6} className="businessItem" square={true}>
                    <h2>{business.name}</h2>
                    <p>{business.location}</p>
                    <Button className="startBrawl" variant="outlined" onClick={()=>this.props.startBrawl(this.props.placeNumber)}>Start Brawl</Button>
                </Paper>
            </Grid>
        )    
    }
}


export default BusinessItem;