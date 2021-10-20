import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Quiz extends Component{
    constructor(){
        super()
        this.state = {
            topicTitle: {topicID:"", topicName:""},
            relatedQuizList:[],
            storedAns:[],
            correctAnsList: [],
            loaded: false,
            isReady: false, //before the question is open
            isSubmit: false,
            authenticatedStudentID:"",
            quizQuestion: 0,
            numCorrect: 0,
            steps: 0,
            timerStart: 0,
            timeTaken: 0 //in centiseconds, 1 second = 1000 centiseconds
        }
    }

    loadTopicTitle(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();
        axios.get(window.location.origin + '/api/topic/' + theID).then((response) => {
            this.setState({
                topicTitle:response.data,
            });
        });
    }

    loadAuthStudent(){
        let authUserID = $('#quiz').attr("authUserID");
        this.setState({
            authenticatedStudentID:authUserID,
        });
    }

    loadQuizList(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();

        axios.get(window.location.origin + '/api/relatedQuiz/' + theID).then((response) => {
            let {correctAnsList} = this.state;
            for (var i = 0; i < response.data.length; i++){
                correctAnsList[i] = response.data[i].correctAns;
            }
            this.setState({
                relatedQuizList:response.data,
                loaded: true,
                correctAnsList,
            })
        })
    }

    componentDidMount(){
        this.loadTopicTitle();
        this.loadQuizList();
        this.loadAuthStudent();
    }

    prevButtonClick(){
        let {quizQuestion, steps} = this.state;
        quizQuestion--;
        steps++;
        this.setState({
            quizQuestion,
            steps,
        })
    }

    nextButtonClick(){
        let {quizQuestion, steps} = this.state;
        quizQuestion++;
        steps++;
        this.setState({
            quizQuestion,
            steps,
        })
    }

    resetClick(){
        this.setState({
            storedAns: [],
            isReady:false,
            isSubmit:false,
            quizQuestion: 0,
            numCorrect: 0,
            steps: 0,
            timerStart: 0,
            timeTaken: 0,
        });
    }

    startButtonClick(){
        this.setState({
            isReady: true,
            timeTaken: this.state.timeTaken,
            timerStart: Date.now() - this.state.timeTaken,
        });
        this.timer = setInterval(() => {
            this.setState({
                timeTaken: Date.now() - this.state.timerStart
            });
        }, 10);
    }

    submitButtonClick(){
        let {storedAns, correctAnsList, numCorrect, steps} = this.state;
        let tempConvAns = [];

        if (storedAns.includes(undefined) || storedAns.length == 0 || storedAns.length != correctAnsList.length){
            alert("You have some incomplete questions.");
        } else {
            clearInterval(this.timer);
            steps++;
            for (var i = 0; i < storedAns.length; i++){
                switch (storedAns[i]){
                    case '0':
                        tempConvAns[i] = 'a';
                    break;
                    case '1':
                        tempConvAns[i] = 'b';
                    break;
                    case '2':
                        tempConvAns[i] = 'c';
                    break;
                    case '3':
                        tempConvAns[i] = 'd';
                    break;
                }
            }

            for (var i = 0; i < tempConvAns.length; i++){
                
                if(tempConvAns[i] == correctAnsList[i]){
                    numCorrect++;
                }
            }

            this.setState({
                numCorrect,
                isSubmit: true,
                steps,
            });
        }
    }
        
    storeQuizHistory(){
        let totalQues = this.state.relatedQuizList.length;
        let {numCorrect, steps, timeTaken} = this.state;
        let topicID = this.state.topicTitle.topicID;
        let studentID = this.state.authenticatedStudentID;
        axios.post(window.location.origin + '/api/quizhistory', {
            totalQues, numCorrect, steps, timeTaken, topicID, studentID,
        });
    }

    render(){
        let topicTitle = this.state.topicTitle;
        if(topicTitle === ""){
            return(
                <div className="notFound">
                    <h1>This topic is not found.</h1>
                </div>
            );
        } else {
            if (this.state.relatedQuizList.length > 0) {
                let currentQuestion = this.state.quizQuestion;
                let totalQuestion = this.state.relatedQuizList.length;
                let theQuestionText;
                let questionOptions = [];

                if(this.state.loaded){
                    let {relatedQuizList} = this.state;
                    theQuestionText = relatedQuizList[currentQuestion].quizText;
                    
                    for (var i = 0; i < 4; i++){
                        questionOptions[i] = eval("relatedQuizList[currentQuestion].option" + (i+1));
                    }
                }

                let optionsList = questionOptions.map((option, optionIndex) => {
                    if (option != null){
                        return(
                            <li key={option} className="quizOptionsList" >
                                <input type="radio" name="correctAns" value={`${optionIndex}`}
                                checked={this.state.storedAns[currentQuestion] == optionIndex ? true : false}
                                onChange={(e) => {
                                    let {storedAns} = this.state;
                                    storedAns[currentQuestion] = e.target.value;
                                    this.setState({
                                        storedAns,
                                    });
                                }}/>{option}              
                            </li>
                        ); 
                    }
                });

                var prevQues = currentQuestion - 1;
                var nextQues = currentQuestion + 1;
                let prevButton = <div className="quizButton"></div>;
                let nextButton;

                if (prevQues >= 0){
                    prevButton =
                    <div className="quizButton">
                        <button onClick={() => this.prevButtonClick()}>Prev</button>
                    </div>;
                }

                if (nextQues <= this.state.relatedQuizList.length - 1){
                    nextButton =
                    <div className="quizButton">
                        <button onClick={() => this.nextButtonClick()}>Next</button>
                    </div>;
                } else {
                    nextButton =
                    <div className="quizButton">
                        <button onClick={() => this.submitButtonClick(optionsList)}>Submit</button>
                    </div>;
                }

                let resultCalculation = (correct, total) => {
                    let percentage = Math.round((correct / total) * 100);
                    return percentage;
                }

                let resultTab = this.state.relatedQuizList.map((question, questionNum) => {
                    return(
                        <Tab key={question.questionID}>
                            Q{questionNum + 1}
                        </Tab>
                    );
                });

                let resultTabPanel = this.state.relatedQuizList.map((question, qIndex) => {

                    let tempConvAns = [];
                    let {storedAns} = this.state;
                    for (var j = 0; j < this.state.correctAnsList.length;j++){
                        switch(this.state.correctAnsList[j]){
                            case 'a':
                            tempConvAns[j] = 0;
                        break;
                        case 'b':
                            tempConvAns[j] = 1;
                        break;
                        case 'c':
                            tempConvAns[j] = 2;
                        break;
                        case 'd':
                            tempConvAns[j] = 3;
                        break;
                        }
                    }

                    let avaOptionList = [];
                    for (var i = 0; i < 4; i++){
                        avaOptionList[i] = eval("question.option" + (i+1));
                    }
                    
                    let avaOption = avaOptionList.map((option, oIndex) => {
                        if(option != null){
                            if(tempConvAns[qIndex] == oIndex){
                                return(
                                    <li key={option} className="quizOptionsList" id="correct">{option}</li>
                                );
                            }
                            if (storedAns[qIndex] != tempConvAns[qIndex] && storedAns[qIndex] == oIndex){
                                return(
                                    <li key={option} className="quizOptionsList" id="wrong">{option}</li>
                                );
                            }
                            return(
                                <li key={option} className="quizOptionsList">{option}</li>
                            );
                            
                        }
                    });

                    return(
                        <TabPanel>
                            <p id="legend">Question Text</p>
                            <p id="codesegment">
                                {question.quizText}
                            </p>
                            <p id="legend">Your Answers (Correct answer will be highlighted as green color, else it will be highlighted as red color)</p>
                            <ul className="quizOptions">
                                {avaOption}
                            </ul>
                        </TabPanel>  
                    );
                });

                let preLoadScreen = () => {
                    let {isSubmit, isReady} = this.state;
                    if(isReady == false && isSubmit == false){
                        return(
                            <div>
                                <div className="quizContent">
                                    <h2>Click the button below to start the quiz.</h2>
                                    <div className="startButton">
                                        <button onClick={()=> this.startButtonClick()}>Start</button>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if(isSubmit == false && isReady == true){
                        return(
                            <div>
                                <div className="quizContent">
                                    <h2>Question {currentQuestion + 1}</h2>
                                    <p className="lessonContentCode" id="codesegment">{theQuestionText}</p>
                                    <ul className="quizOptions">
                                        {optionsList}
                                    </ul>
                                
                                    {prevButton}
                                    {nextButton}
                                </div>
                            </div>
                        );
                    } else {
                        return(
                            <div>
                                {this.storeQuizHistory()}
                                <div className="finalResult">
                                    <h2>Quiz Result</h2>
                                    <p>You have completed this quiz!</p>
                                    <p>Your score: {resultCalculation(this.state.numCorrect, totalQuestion)}% ({this.state.numCorrect}/{totalQuestion})</p>
                                    <p>You can try this quiz again anytime by refreshing this page, or select from the navigation bar, or click the retry button.</p>
                                    <div className="retry">
                                        <button onClick={() => this.resetClick()}>Retry</button>
                                    </div>    
                                </div>
                                <div>
                                    <Tabs>
                                        <TabList>
                                            {resultTab}
                                        </TabList>
                                            {resultTabPanel}
                                    </Tabs>
                                </div>
                            </div>
                        );
                    }
                }

                return(
                    <div>
                        <Helmet>
                            <title>{`Quiz ${topicTitle.topicID}`}</title>
                        </Helmet>
                        <div className="titleClass">
                            <h1 className="titleClass">Quiz {topicTitle.topicID} - {topicTitle.topicName}</h1>
                            <p>This quiz consists of {totalQuestion} multiple choice questions. You will get one point for each correct answer, but don't worry, graded quizzes have no time limit.
                            After you had completed all the questions, you will see your total score for this result, you may also check it in the profile.</p>
                        </div>
                        {preLoadScreen()}
                        
                    </div>
                ); 
            } else {
                return(
                    <div>
                        <Helmet>
                            <title>{`Quiz ${topicTitle.topicID}`}</title>
                        </Helmet>
                        <div className="titleClass">
                            <h1 className="titleClass">Quiz {topicTitle.topicID} - {topicTitle.topicName}</h1>
                            <p>This topic is exist but yet to have any content.</p>
                        </div>
                        
                    </div>
                ); 
            }
        }
    }
}

if (document.getElementById('quiz')) {
    ReactDOM.render(<Quiz />, document.getElementById('quiz'));
}