import React, { useState } from 'react'; 
import './Auth.css';
import {Button, Row, Col, Container} from 'reactstrap'; 
import apiurl from '../../environment'; 

interface States {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    role: number;
    xp: number;
    login: boolean;
}

interface Props {
    updateToken: (newToken: string, userID: number) => void;
}

class Auth extends React.Component<Props, States> {

    constructor(props: Props, states: States){

        super(props, states);
        this.loginToggle = this.loginToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            displayName: "",
            role: 0,
            xp: 0,
            login: false
            };
    }

    loginToggle = () => {
        this.setState({ login: !this.state.login})
    }

    
    handleSubmit(e: React.MouseEvent){
        e.preventDefault(); 
        const url = `${apiurl}/user/${ this.state.login ? 'signin' : 'signup' }` 

        const body = {
            email: this.state.email, 
            password: this.state.password, 
            displayName: this.state.displayName,
            role: this.state.role,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            xp: this.state.xp
        }
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(rObj => this.props.updateToken(rObj.sessionToken, rObj.user.id)); 
    }

    signupFields = () => {
        if(this.state.login) {
            return null
        } else {
            return (
            <div>
                <label htmlFor="displayname">Display Name</label>
                <br />
                <input id="displayname" value={this.state.displayName} onChange={e => this.setState({displayName: e.target.value})} />
            </div>
            )
        }
    }
    render() {
        return (
            <div className="mainDiv">
                <Container id="Container">
                    <Row className="formRow">
                        <form>
                            <h1 className="login">{this.state.login ? 'Login' : 'Signup'}</h1>
        
                            <label htmlFor="email">Email</label>
                            <br />
                            <input id="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} /> 
                            <br />
                            <label htmlFor="password">Password</label>
                            <br />
                            <input id="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
                            <br />
                            {this.signupFields()}
                            <br />
                            <Button id="btn-primary" onClick={this.handleSubmit}>Submit</Button>
                            <br />
                            <Button id="btn-secondary"onClick={this.loginToggle}>{this.state.login ? "Click here to Signup" : "Have a login already? Click here!"}</Button> 
                        </form>
                    </Row>
                </Container>
            </div> 
        )
    }
}

export default Auth; 

