import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class QuizList extends Component{
    constructor(){
        super()
        this.state = {
            quizzes: [],
        }
    }

    loadQuizList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                quizzes:response.data
            })
        })
    }

    loadAdminStatus(){
        const adminStatus = $('#quizList').attr("isAdminStr");
        if(adminStatus == "true"){
            this.setState({
                isAdmin: true,
            })
        }
    }

    componentDidMount(){ // React lifecycle
        this.loadQuizList();
        this.loadAdminStatus();
    }
    
    render(){
        let {quizzes, isAdmin} = this.state;
        const half = Math.ceil(quizzes.length / 2);
        let firstQuizHalf = quizzes.slice(0, half);
        let secondQuizHalf = quizzes.slice(half, quizzes.length);
        let quizzesA = firstQuizHalf.map((quiz) => {
            return(
                <div className="topicButtonList" key={quiz.topicID}>
                <a id="listname" href={isAdmin == true ? '/admin/gradedquiz/' + quiz.topicID : '/gradedquiz/' + quiz.topicID}>Quiz {quiz.topicID} - {quiz.topicName}</a>
                </div>
            )
        })

        let quizzesB = secondQuizHalf.map((quiz) => {
            return(
                <div className="topicButtonList" key={quiz.topicID}>
                <a id="listname" href={isAdmin == true ? '/admin/gradedquiz/' + quiz.topicID : '/gradedquiz/' + quiz.topicID}>Quiz {quiz.topicID} - {quiz.topicName}</a>
                </div>
            )
        })

        return(
            
            <div>
                
                <div className="titleClass">
                    <h1>Quiz List</h1>
                </div>
                <div className="listClass">
                    <div className="listContent">
                        <div className="topicButton">
                            {quizzesA}
                        </div>
                    </div>
                    <div className="listContent">
                        <div className="topicButton">
                            {quizzesB}
                        </div>
                    </div>
                </div>
                
            </div>

        );
    }
}

if (document.getElementById('quizList')) {
    ReactDOM.render(<QuizList />, document.getElementById('quizList'));
}