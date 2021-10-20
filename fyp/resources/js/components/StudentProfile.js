import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import picnulllogo from '../img/picnull.png';

export default class StudentProfile extends Component{
    
    constructor(){
        super();
        this.state = {
            authenticatedUser: {
                studentID:"",
                studentName:"",
                email:"",
            },
            historyLoaded: false,
            topicLoaded: false,
            quizHistoryList: [],
            quizLatest:[],
            topics: [],
            uploadedImg: "",
        }
    }

    loadTopicList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                topics:response.data,
                topicLoaded: true,
            });
        })
    }

    loadAuthenticatedUser(){
        const authUserID = $('#studentpage').attr("authUserID");
        axios.get(window.location.origin + '/api/student/' + authUserID).then((response) => {
            this.setState({
                authenticatedUser: response.data,
            });
        });
    }

    loadRelatedQuizHistory(){
        const authUserID = $('#studentpage').attr("authUserID");
        axios.get(window.location.origin + '/api/quizhistory/' + authUserID).then((response) => {
            this.setState({
                quizHistoryList: response.data,
                historyLoaded: true,
            });
        });
    }

    componentDidMount(){
        this.loadTopicList();
        this.loadAuthenticatedUser();
        this.loadRelatedQuizHistory();
    }

    recentMarks(){
        if(this.state.topicLoaded && this.state.historyLoaded){
            let {quizHistoryList, topics} = this.state;
            let quizLatest = [];
            let temp = [];
            let copyList = quizHistoryList.slice();

            for (var i = 0; i < topics.length; i++){
                temp[i] = copyList.filter(list => list.topicID == topics[i].topicID); //based on each topic, starting from topic 1 (quiz 1), filter the records into sub array
            }

            for (var j = 0; j < temp.length; j++){
                temp[j].sort((a,b) => parseFloat(a.quizHistoryID) - parseFloat(b.quizHistoryID)); // sort the filtered array for each topic based on the latest record instead of the highest mark.
                for (var k = 0; k < temp[j].length; k++){
                    quizLatest[j] = Math.round((temp[j][k].numCorrect / temp[j][k].totalQues) * 100); //calculate percentage based on the latest record
                }
            }

            let totalScore = 0;
            let totalCount = 0;
            let averageScore;
            for (var a = 0; a < quizLatest.length; a++){
                if(quizLatest[a] != null){
                    totalScore = totalScore + quizLatest[a];
                    totalCount = totalCount + 1;
                }
            }

            if (totalCount != 0){
                averageScore = Math.round(totalScore / totalCount);
            } else {
                averageScore = 0;
            }

            let eachQuizScore = this.state.topics.map((topic, index) => {
                let tempData = "N/A";
                if (quizLatest[index] != null){
                    tempData = quizLatest[index] + "%";
                }
                return(
                    <td key={topic.topicID}>{tempData}</td>
                );
            });

            let eachQuizTitle = this.state.topics.map((topic) => {
                return(
                    <th key={topic.topicID}>{topic.topicID}</th>
                );
            });

            return(
                <div className="latestResult">
                    <h2>Average performance</h2>
                    <h2>{averageScore}%</h2>
                    <h2>Latest performance for each quiz</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th id="legend">Quiz</th>
                                {eachQuizTitle}
                            </tr>
                            <tr>
                                <td id="legend">Score</td>
                                {eachQuizScore}
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            );
        }
    }

    render(){

        let histories = this.state.quizHistoryList.reverse().map(
            (relatedHistory) => {

            let quizpercentage = Math.round((relatedHistory.numCorrect / relatedHistory.totalQues) * 100);
            let perfectText;
            if(quizpercentage == 100){
                perfectText =
                <p>PERFECT</p>
            }
            return(
                <div className="historylist" key={relatedHistory.quizHistoryID}>
                    <div className="historydet">
                        <h2>Your Quiz ID: {relatedHistory.quizHistoryID}</h2>
                        <p>From Quiz {relatedHistory.topicID}</p>
                        <p>Total questions: {relatedHistory.totalQues}</p>
                        <p>Correct answers: {relatedHistory.numCorrect}</p>
                    </div>
                    <div className="historyperc">
                        <h2>{quizpercentage}%</h2>
                        {perfectText}
                    </div>
                </div>
            );
        });

        return(
            <div>
                <div className="profilewrapper">
                    <div className="profiletitle">
                        <h1>Student Profile</h1>
                    </div>
                    
                    <div className="profilebanner">
                        <div className="profilepic"></div>
                        <div className="profilenameid">
                            <h2>{this.state.authenticatedUser.studentName}</h2>
                            <h2>{this.state.authenticatedUser.studentID}</h2>
                            <h2>{this.state.authenticatedUser.email}</h2>
                        </div>
                    </div>

                    <div className="profileperf">
                        <h1>Performance</h1>
                        <div className="perfbox">
                            {this.recentMarks()}
                        </div>
                    </div>

                    <div className="profilehistory">
                        <h1>Quiz History</h1>
                        {histories.length != 0 
                        ? 
                            <div className="historybox">
                            {histories}
                            </div>
                        : 
                        <div className="noHistory"><p>You do not have any quiz history right now.</p></div>}
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('studentpage')) {
    ReactDOM.render(<StudentProfile />, document.getElementById('studentpage'));
}