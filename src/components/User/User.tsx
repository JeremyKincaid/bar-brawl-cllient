import React from 'react';
import CreateBusiness from '../Business/CreateBusiness';
import Business from '../Business/Business';
import { BrawlObj } from '../Brawl/Brawl';
import BrawlItem from '../Brawl/BrawlItem';
import apiurl from '../../environment';
import { Box } from '@material-ui/core';
import './User.css';

interface States {
    brawls: BrawlObj[]
    visibleBrawls: BrawlObj[]
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
            brawls: [],
            visibleBrawls: []
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
            this.setVisibleBrawls(this.state.brawls);
        })
    }

    setVisibleBrawls = (bras: BrawlObj[]) => {
        let newArr: BrawlObj[];
        newArr = [];
        for(var i = 0; i < 10; i++){
            newArr.push(bras[i]);
        }
        this.setState({visibleBrawls: newArr})
    }

    componentDidMount(){
        this.pullAllBrawls();
    }


    render(){

        return(
            <Box className="userClass">
                <CreateBusiness userId={this.props.userId} sessionToken={this.props.sessionToken}/>
                <Business />
                <hr />
                <h1>Nearby Brawls</h1>
                {this.state.visibleBrawls.map((braObj, i) => <BrawlItem bra={braObj} key={i} />)}

            </Box>
        )
    }
}



export default User;