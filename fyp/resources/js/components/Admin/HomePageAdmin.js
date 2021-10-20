import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class HomePageAdmin extends Component{
    
    constructor(){
        super();
        this.state = {
            authenticatedAdmin: {
                adminID:"",
                adminName:"",
            },
        }
    }
    
    loadAuthenticatedAdmin(){
        let authAdminID = $('#homeadmin').attr("authAdminID");
        let authAdminName = $('#homeadmin').attr("authAdminName");
        let {authenticatedAdmin} = this.state;
        authenticatedAdmin.adminID = authAdminID;
        authenticatedAdmin.adminName = authAdminName;
        this.setState({
            authenticatedAdmin,
        });
    }

    componentDidMount(){
        this.loadAuthenticatedAdmin();
    }

    render(){
        return(

            <div>
                <div className="titleClass">
                    <h1>Welcome, {this.state.authenticatedAdmin.adminName} the Admin. What do you want to do today?</h1>
                </div>

                <div className="homeGrid">
                    <div className="grid-container">
                        <div className="outerGrid" id="box5">
                            <a href="/admin/registerStudent">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        REGISTER STUDENT
                                    </div>
                                </div>
                            </a>
                            
                        </div>
                        
                        <div className="outerGrid" id="box3">
                            <a href="/admin/topic">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        MODIFY TOPIC
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="outerGrid" id="box3">
                            <a href="/admin/exercise">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        MODIFY EXERCISE
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="outerGrid" id="box3">
                            <a href="/admin/gradedquiz">
                                <div className="grid-item">
                                    <div className="bottomLeft">
                                        MODIFY QUIZ
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

if (document.getElementById('homeadmin')) {
    ReactDOM.render(<HomePageAdmin />, document.getElementById('homeadmin'));
}