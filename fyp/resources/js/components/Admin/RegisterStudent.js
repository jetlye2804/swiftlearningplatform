import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class RegisterStudent extends Component{
    
    constructor(){
        super();
        this.state = {
            studentID: "",
            studentName: "",
            email: "",
            emailErrorMsg: "",
            existingErrorMsg:"",
            existingStudentList: [],
            processingMsg: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIDPress = this.handleIDPress.bind(this);
    }

    loadExistingStudent(){
        axios.get(window.location.origin + '/api/students').then((response) => {
            this.setState({
                existingStudentList: response.data,
            })
        });
    }

    componentDidMount(){
        this.loadExistingStudent();
    }

    handleSubmit(e){
        e.preventDefault();

        let {studentID, studentName, email, processingMsg} = this.state;
        let isUTAREmail = this.checkEmailFormat(email);
        let allNotExist = this.checkExistingAccount(studentID, studentName, email);

        if (isUTAREmail == true && allNotExist.every(Boolean)){
            processingMsg = "Registering...Please wait...",
            this.setState({
                processingMsg,
            });
            axios.post(window.location.origin + '/api/addStudent', {
                studentID, studentName, email,
            }).then((response) => {
                alert("You have successfully register a student.");
                this.loadExistingStudent();
                this.setState({
                    processingMsg: "",
                    emailErrorMsg: "",
                    existingErrorMsg:"",
                    studentID: "",
                    studentName: "",
                    email: "",
                });
            });
        }
        
    }

    checkEmailFormat(email){
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let emailCorrect = true;
        if(emailRegex.test(email)){
            if(email.indexOf("@1utar.my", email.length - "@1utar.my".length) !== -1){
                this.setState({
                    emailErrorMsg: "",
                });
            } else {
                emailCorrect = false;
                this.setState({
                    emailErrorMsg: "This email is not a UTAR student email!",
                });
            }
        } else {
            emailCorrect = false;
            this.setState({
                emailErrorMsg: "This email format is invalid!",
            });
        }

        return emailCorrect;
    }

    checkExistingAccount(studentID, studentName, email){
        let {existingStudentList} = this.state;
        let notExist = [true, true, true]; //first is for ID, second is for Name, third is for utar email
        for(var i = 0; i < existingStudentList.length; i++){
            if(studentID == existingStudentList[i].studentID){
                notExist[0] = false;
            }
            if(studentName == existingStudentList[i].studentName){
                notExist[1] = false;
            }
            if(email == existingStudentList[i].email){
                notExist[2] = false;
            }
        }

        if(notExist.includes(false)){
            this.setState({
                existingErrorMsg: "The student ID/name/UTAR email is already exist!",
            });
        } else {
            this.setState({
                existingErrorMsg: "",
            });
        }

        return notExist;
    }

    handleIDPress(e){
        var theEvent = e || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = e.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    render(){
        return(

            <div>
                <div className="titleClass">
                    <h1>Register Student</h1>
                </div>
                <div className="regForm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputBox">
                            <p>Student ID (Without "UEB")</p>
                            <input type="text"
                                onChange={(e)=>{
                                    let {studentID} = this.state;
                                    studentID = e.target.value;
                                    this.setState({
                                        studentID,
                                    });
                                }}
                                value = {this.state.studentID}
                                placeholder="Student ID"
                                onKeyPress={this.handleIDPress}
                                maxLength="7"
                            ></input>
                        </div>
                        <div className="inputBox">
                            <p>Student Name</p>
                            <input type="text"
                                onChange={(e)=>{
                                    let {studentName} = this.state;
                                    studentName = e.target.value;
                                    this.setState({
                                        studentName,
                                    });
                                }}
                                value = {this.state.studentName}
                                placeholder="Student Name"
                            ></input>
                        </div>
                        <div className="inputBox">
                            <p>Student UTAR Email</p>
                            <input type="text"
                                onChange={(e)=>{
                                    let {email} = this.state;
                                    email = e.target.value;
                                    this.setState({
                                        email,
                                    });
                                }}
                                value = {this.state.email}
                                placeholder="Student UTAR Email"
                            ></input>
                            <p id="errormessage">{this.state.existingErrorMsg}</p>
                            <p id="errormessage">{this.state.emailErrorMsg}</p>
                        </div>
                        <div className="process">
                            <p>{this.state.processingMsg}</p>
                        </div>
                        <p id="notice">A random password will be generated automatically and send to their respective UTAR email. Students will be required to update their password when they login to the system for the first time.</p>
                        <div className="submitButton">
                            <button type="submit" disabled={!(this.state.studentID && this.state.studentName && this.state.email)}>Register</button>
                        </div>
                        
                    </form>
                </div>
            </div>

        );
    }
}

if (document.getElementById('registerStud')) {
    ReactDOM.render(<RegisterStudent />, document.getElementById('registerStud'));
}