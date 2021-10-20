import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class HomePage extends Component{
    
    constructor(){
        super();
        this.state = {
            authenticatedUser: {
                studentName:"",
            },
        }
    }
    
    loadAuthenticatedUser(){
        let authUserName = $('#homepage').attr("authUserName");
        let {authenticatedUser} = this.state;
        authenticatedUser.studentName = authUserName;
        this.setState({
            authenticatedUser,
        });
    }

    componentDidMount(){
        this.loadAuthenticatedUser();
    }

    render(){
        return(

            <div>
                <div className="titleClass">
                    <h1>Welcome, {this.state.authenticatedUser.studentName}. What do you want to do today?</h1>
                </div>

                <div className="homeGrid">
                    <div className="grid-container">
                        <div className="outerGrid" id="box1">
                            <a href="/topic">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        LEARN LESSON
                                    </div>
                                </div>
                            </a>
                            
                        </div>
                        
                        <div className="outerGrid" id="box2">
                            <a href="chatbox">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        CHAT BOX
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="outerGrid" id="box3">
                            <a href="/gradedquiz">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        QUIZZES
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="outerGrid" id="box4">
                            <a href="/exercise">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        EXERCISE
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('homepage')) {
    ReactDOM.render(<HomePage />, document.getElementById('homepage'));
}