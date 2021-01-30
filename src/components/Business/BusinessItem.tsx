import React from 'react';
import {Button} from 'reactstrap';

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
    // constructor(props: Props, states: States) {
    //     super(props, states);
    // }

    render() {
        let business = this.props.bus;
        console.log(this.props)
            return (
            <div>
                {business.name}
                
                <Button onClick={()=>this.props.startBrawl(this.props.placeNumber)}>Start Brawl</Button>
                <hr />
            </div>
        )    
    }
}


export default BusinessItem;