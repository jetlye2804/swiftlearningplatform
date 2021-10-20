import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import picnulllogo from '../../img/picnull.png';
import DeleteStudentModal from '../Modal/DeleteStudentModal';

export default class AdminProfile extends Component{
    constructor(){
        super();
        this.state = {
            authenticatedAdmin: {
                adminID:"",
                adminName: "",
            },
            isAdmin: false,
            searchID: "",
            loadedStudent: {
                studentID:"",
                studentName:"",
                email:"",
            },
            loading: false,
            historyLoaded: false,
            topicLoaded: false,
            quizHistoryList: [],
            quizLatest:[],
            topics: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIDPress = this.handleIDPress.bind(this);
        this.closeStudentDetails = this.closeStudentDetails.bind(this);
    }

    loadAuthenticatedAdmin(){
        const authAdminID = $('#adminpage').attr("authAdminID");
        axios.get(window.location.origin + '/api/admin/' + authAdminID).then((response) => {
            this.setState({
                authenticatedAdmin: response.data,
                isAdmin: true,
            });
        });
    }

    loadTopicList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                topics:response.data,
                topicLoaded: true,
            });
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let {searchID} = this.state;
        this.setState({
            loading: true,
        });
        this.findStudent(searchID);
    }

    findStudent(studentID){
        axios.get(window.location.origin + '/api/student/' + studentID).catch((error) => {
            if(error.response.status == "404"){
                alert("The student ID you key in is not exist.");
            }
            this.setState({
                loadedStudent: {
                    studentID:"",
                    studentName:"",
                    email:"",
                },
                loading: false,
                quizHistoryList: [],
                historyLoaded: false,
            });
        }).then((response) => {
            this.setState({
                loadedStudent: response.data,
            });
        });
        axios.get(window.location.origin + '/api/quizhistory/' + studentID).then((response) => {
            this.setState({
                quizHistoryList: response.data,
                historyLoaded: true,
                loading:false,
                searchID: "",
            });
        });
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

    closeStudentDetails(){
        this.setState({
            loadedStudent: {
                studentID:"",
                studentName:"",
                email:"",
            },
            loading: false,
            quizHistoryList: [],
            historyLoaded: false,
        });
    }

    componentDidMount(){
        this.loadTopicList();
        this.loadAuthenticatedAdmin();
    }

    render(){

        let {authenticatedAdmin, loadedStudent} = this.state;

        let histories = this.state.quizHistoryList.reverse().map(
            (relatedHistory) => {

            let quizpercentage = Math.round((relatedHistory.numCorrect / relatedHistory.totalQues) * 100);
            let perfectText;
            if(quizpercentage == 100){
                perfectText =
                <p>PERFECT</p>
            }

            let countTime = () => {
                let minute = Math.trunc(relatedHistory.timeTaken / 60000);
                let second = Math.round((relatedHistory.timeTaken % 60000) / 1000);
                minute = minute.toString();
                second = second.toString();

                return minute + " minute(s) and " + second + " second(s)";
            }

            return(
                <div className="historylist" key={relatedHistory.quizHistoryID}>
                    <div className="historydet">
                        <h2>Your Quiz ID: {relatedHistory.quizHistoryID}</h2>
                        <p>From Quiz {relatedHistory.topicID}</p>
                        <p>Total questions: {relatedHistory.totalQues}</p>
                        <p>Correct answers: {relatedHistory.numCorrect}</p>
                        <p>Steps taken: {relatedHistory.steps}</p>
                        <p>Time taken: {countTime()}</p>
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
                        <h1>Admin Profile</h1>
                    </div>
                    
                    <div className="profilebanner">
                        <div className="profilepic"></div>
                        <div className="profileRight">
                            <div className="profileAdminid">
                                <h2>{authenticatedAdmin.adminName}</h2>
                                <h2>{authenticatedAdmin.adminID}</h2>
                            </div>
                            <div className="searchBar">
                                <form onSubmit={this.handleSubmit}>
                                    <p>Search a student with Student ID (Numbers only)</p>
                                    <input type="text"
                                    onChange={(e)=>{
                                        let {searchID} = this.state;
                                        searchID = e.target.value;
                                        this.setState({
                                            searchID,
                                        });
                                    }}

                                    value = {this.state.searchID}
                                    placeholder="Student ID"
                                    onKeyPress={this.handleIDPress}
                                    maxLength="7"
                                    ></input>
                                    <button type="submit" disabled={!this.state.searchID}>Search</button>
                                </form>
                                {this.state.loading ? <p>Loading...</p> : ""}
                            </div>
                            <div className="studentLink">
                                <a href="/admin/profile/studentlist">View student list</a>
                            </div>
                        </div>
                    </div>
                    {loadedStudent.studentID === "" || loadedStudent.studentID === null ? "" : 
                    <div className="profileperf">
                        <h1>{loadedStudent.studentName} ({loadedStudent.studentID})</h1>
                        <div className="studentDeleteBtn">
                            <DeleteStudentModal loadedStudent={loadedStudent} closeStudentDetails={this.closeStudentDetails}/>
                        </div>
                        
                        <div className="perfbox">
                            {this.recentMarks()}
                        </div>
                        <div className="historyTitle">
                            <h1>Quiz History</h1>
                        </div>
                        
                        {histories.length != 0 
                        ? 
                            <div className="historybox">
                            {histories}
                            </div>
                        : 
                        <div className="noHistory"><p>This student does not have any quiz history right now.</p></div>}
                    </div>}
                    
                </div>
            </div>
        );
    }
}

if (document.getElementById('adminpage')) {
    ReactDOM.render(<AdminProfile />, document.getElementById('adminpage'));
}