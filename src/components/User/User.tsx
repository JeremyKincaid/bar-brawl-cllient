import React from 'react';
import CreateBusiness from '../Business/CreateBusiness';
import Business from '../Business/Business';
import Brawl from '../Brawl/Brawl';
import BrawlItem from '../Brawl/BrawlItem';
import apiurl from '../../environment';

interface States {
    brawls: Brawl[]
}

interface Props {
    userId: number,
    sessionToken: string
}

class User extends React.Component<Props, States> {
    constructor(props: Props, states: States){
        super(props, states);
        this.pullAllBrawls = this.pullAllBrawls.bind(this);
        this.state = {
            brawls: []
        }
    }

    pullAllBrawls: () => void = () => {
        fetch(`${apiurl}/brawl/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(rArr => {
            this.setState({brawls: rArr})
        })
    }

    componentDidMount(){
        this.pullAllBrawls();
    }


    render(){

        return(
            <div>
                <CreateBusiness userId={this.props.userId} sessionToken={this.props.sessionToken}/>
                <Business />
                {this.state.brawls.map((braObj, i) => <BrawlItem bra={braObj} key={i} />)}

            </div>
        )
    }
}



export default User;