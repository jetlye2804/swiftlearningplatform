import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class Onboard extends Component{
    constructor(){
        super();
        this.state = {
            id:"",
            password:"",
            confirmPassword:"",
            message:"",
            isSuccessful: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    loadAuthenticatedUser(){
        let authUserID = $('#onboard').attr("authUserID");
        let {id} = this.state;
        id = authUserID;
        this.setState({
            id,
        })
    }

    componentDidMount(){
        this.loadAuthenticatedUser();
    }

    handleKeyPress(e){
        var theEvent = e || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = e.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9a-zA-Z]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
        
    }

    handleSubmit(e){
        e.preventDefault();
        let {password, confirmPassword} = this.state;
        if (password.length > 0){
            const regex1 = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i
            if(password.match(regex1)){
                if (password == confirmPassword){
                    if (password.length >= 8){
                        this.updatePassword();
                    } else {
                        this.setState({
                            message:"Your password should at least 8 alphanumeric characters!",
                            confirmPassword: "",
                        });
                    }
                    
                } else if (password != confirmPassword) {
                    this.setState({
                        message:"Your password and confirm password are not match!",
                        confirmPassword: "",
                    });
                } 
            } else {
                this.setState({
                    message:"Your password should contains at least one letter and one numeric characters!",
                });
            }
            
        } else {
            this.setState({
                message:"Your password and confirm password should not be empty!",
            });
        }
    }

    updatePassword(){
        let {password} = this.state;
        axios.put(window.location.origin + '/api/student/updatepassword/' + this.state.id,{
            password,
        }).then((response) => {
            this.setState({
                message:"",
                isSuccessful: true,
            });
        });
    }

    render(){

        let passwordLoadScreen = () => {
            let {isSuccessful} = this.state;
            if(isSuccessful == true){
                return(
                    <div className="passArea">
                        <p>Successfully change password. You are redirecting to home page.</p>
                        {window.location = '/home'}
                    </div>
                );
            } else {
                return(
                    <form onSubmit={this.handleSubmit}>
                    <div className="passArea">
                        <div className="pass">
                            <p>Password</p>
                            <input type="password"
                                onChange={(e) => {
                                    let {password} = this.state;
                                    password = e.target.value;
                                    this.setState({
                                        password,
                                    });
                                }}
                                onKeyPress={this.handleKeyPress}
                            ></input>
                        </div>
                        
                        <div className="conPass">
                            <p>Confirm Password</p>
                            <input type="password"
                                onChange={(e) => {
                                    let {confirmPassword} = this.state;
                                    confirmPassword = e.target.value;
                                    this.setState({
                                        confirmPassword,
                                    });
                                }}
                                onKeyPress={this.handleKeyPress}
                            ></input>
                        </div>

                        <div className="submitButton">
                            <button type="submit">
                                Submit
                            </button>
                        </div>

                        <p id="errormessage">{this.state.message}</p>
                    </div>
                    </form>
                );
            }
        }

        return(
            <div>
                <div className="onboardHeader">
                    <h1>
                        This is your first time login.
                    </h1>
                    <p>
                        The system detects that you are new to the platform and using a random generated password to login.<br />
                        Before you use the platform, please set your own password.<br />
                        The password should be have a minimum of 8 characters with combinations of letters and numeric characters.<br />
                        Capital letters are optional.
                    </p>
                </div>
                {passwordLoadScreen()}
                
                
            </div>
        );
        
    }
}


if (document.getElementById('onboard')) {
    ReactDOM.render(<Onboard />, document.getElementById('onboard'));
}