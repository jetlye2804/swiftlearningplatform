import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import AddExerciseModal from './Modal/Exercise/AddExerciseModal';
import EditExerciseModal from './Modal/Exercise/EditExerciseModal';
import DeleteExerciseModal from './Modal/Exercise/DeleteExerciseModal';

export default class Exercise extends Component{
    constructor(){
        super()
        this.state = {
            topicTitle: {topicID:"", topicName:""},
            relatedExerciseList: [],
            topicList: [],
            disableList:[],
            isDisableList:[],
            checkAnsValue:[],
            checkButtonHide:[],
            submitButtonHide:[],
            inputAns:[],
            outputMsg:[],
            isLoaded: false,
            isAdmin: false,
        }
        this.updateExerciseList = this.updateExerciseList.bind(this);
    }

    loadTopicTitle(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();
        axios.get(window.location.origin + '/api/topic/' + theID).then((response) => {
            this.setState({
                topicTitle:response.data,
            })
        })
    }

    loadTopicList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                topicList:response.data,
                isLoaded: true,
            });
        })
    }

    loadExerciseList(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();
        axios.get(window.location.origin + '/api/relatedExercise/' + theID).then((response) => {
            let {disableList, isDisableList, checkAnsValue, checkButtonHide, submitButtonHide, outputMsg} = this.state;
            for (var i = 0; i < response.data.length; i++){
                disableList[i] = [false, false, false];
                isDisableList[i] = false;
                checkAnsValue[i] = ["", "", ""];
                checkButtonHide[i] = false;
                submitButtonHide[i] = false;
                outputMsg[i] = "";
            }
            this.setState({
                relatedExerciseList:response.data,
                disableList,
                isDisableList,
                checkAnsValue,
                checkButtonHide,
                submitButtonHide,
                isLoaded: true,
            })
        })
    }

    loadAdminStatus(){
        const adminStatus = $('#exercise').attr("isAdminStr");
        if(adminStatus == "true"){
            this.setState({
                isAdmin: true,
            })
        }
    }

    updateExerciseList(){
        this.loadExerciseList();
    }

    componentDidMount(){
        this.loadAdminStatus();
        this.loadTopicTitle();
        this.loadExerciseList();
        this.loadTopicList();
    }

    checkAns(questionIndex, ans1, ans2, ans3){
        let tempIsDisArr = this.state.isDisableList.slice();
        let tempDisArr = this.state.disableList.slice();
        let tempCheArr = this.state.checkAnsValue.slice();
        let tempSubBtnArr = this.state.submitButtonHide.slice();
        let tempOutMsgArr = this.state.outputMsg.slice();

        if(tempIsDisArr[questionIndex] != true){
            tempCheArr[questionIndex] = [ans1, ans2, ans3];
            tempDisArr[questionIndex] = [true, true, true];
            tempIsDisArr[questionIndex] = true;
            tempSubBtnArr[questionIndex] = true;
            tempOutMsgArr[questionIndex] = "You are checking the correct answer, submit button will be disabled. Click again the check answer button to answer the question.";
            this.setState({
                disableList:tempDisArr, 
                isDisableList:tempIsDisArr, 
                checkAnsValue:tempCheArr,
                submitButtonHide:tempSubBtnArr,
                outputMsg:tempOutMsgArr,
            }) 
        } else {
            tempCheArr[questionIndex] = ["", "", ""];
            tempDisArr[questionIndex] = [false, false, false];
            tempIsDisArr[questionIndex] = false;
            tempSubBtnArr[questionIndex] = false;
            tempOutMsgArr[questionIndex] = "";
            this.setState({
                disableList:tempDisArr, 
                isDisableList:tempIsDisArr, 
                checkAnsValue:tempCheArr,
                submitButtonHide:tempSubBtnArr,
                outputMsg:tempOutMsgArr,
            }) 
        }
        
    }

    submitAns(questionIndex, ans1, ans2, ans3){
        let inputAns = this.state.checkAnsValue[questionIndex];
        let {submitButtonHide, checkButtonHide, disableList, outputMsg} = this.state;
        
        let isCorrect = [];

        if(ans1 != null){
            if(inputAns[0] == ans1){
                isCorrect[0] = true;
            } else {
                isCorrect[0] = false;
            }
        }
        if(ans2 != null){
            if(inputAns[1] == ans2){
                isCorrect[1] = true;
            } else {
                isCorrect[1] = false;
            }
        }
        if(ans3 != null){
            if(inputAns[2] == ans3){
                isCorrect[2] = true;
            } else {
                isCorrect[2] = false;
            }
        }

        if(isCorrect[0] != false && isCorrect[1] != false && isCorrect[2] != false){
            disableList[questionIndex] = [true, true, true];
            submitButtonHide[questionIndex] = true;
            checkButtonHide[questionIndex] = true;
            outputMsg[questionIndex] = "All of your answers are correct!"
            this.setState({submitButtonHide, checkButtonHide, disableList, outputMsg});
        } else {
            outputMsg[questionIndex] = "Wrong answer for some blank(s), please try again!"

            this.setState({outputMsg});
        }
        
    }

    render(){
        var questionNum = 0;
        let topics;
        let topicTitle = this.state.topicTitle;
        let totalNumExercise = 0;
        let relatedExercises;

        if(this.state.isLoaded){
            topics = this.state.topicList.map(aTopic => aTopic.topicID);
            totalNumExercise = this.state.relatedExerciseList.length;
            relatedExercises = this.state.relatedExerciseList.map((relatedExercise, questionIndex) => {

                questionNum++;
    
                let firstBlank;
                let secondBlank;
                let thirdBlank;
                
                let disable = this.state.disableList[questionIndex];
                let blankValue = this.state.checkAnsValue[questionIndex];
    
                let outputMessage = this.state.outputMsg[questionIndex];
    
                if(relatedExercise.blank1 != null){
                    firstBlank = <input type="text" className="fillInTheBlanks" maxLength = "40" size = "40" disabled = {disable[0]} value = {blankValue[0]} 
                    
                    onChange={(e) => {
                        let {checkAnsValue} = this.state;
                        checkAnsValue[questionIndex].splice(0, 1, e.target.value);
                        this.setState({
                            checkAnsValue,
                            
                        });
                    }}
                    
                    placeholder = "Answer for the first blank"></input>
                }
                if(relatedExercise.blank2 != null){
                    secondBlank = <input type="text" className="fillInTheBlanks" maxLength = "40" size = "40" disabled = {disable[1]} value = {blankValue[1]} 
    
                    onChange={(e) => {
                        let {checkAnsValue} = this.state;
                        checkAnsValue[questionIndex].splice(1, 1, e.target.value);
                        this.setState({
                            checkAnsValue,
                        });
                    }}
                    
                    placeholder = "Answer for the second blank"></input>
                }
                if(relatedExercise.blank3 != null){
                    thirdBlank = <input type="text" className="fillInTheBlanks" maxLength = "40" size = "40" disabled = {disable[2]} value = {blankValue[2]} 
                    
                    onChange={(e) => {
                        let {checkAnsValue} = this.state;
                        checkAnsValue[questionIndex].splice(2, 1, e.target.value);
                        this.setState({
                            checkAnsValue,
                        });
                    }}
                    
                    placeholder = "Answer for the third blank"></input>
                }
    
                return(
                    <div className ="exerciseContent" key={relatedExercise.exerciseID}>
                        <div id="exerciseContentDesc">
                            <h1>Question {questionNum}</h1>
                            {this.state.isAdmin == true ?
                            <div className="adminButtons">
                                <EditExerciseModal relatedExercise={relatedExercise} updateExerciseList={this.updateExerciseList} topicList={this.state.topicList}/>
                                <DeleteExerciseModal relatedExercise={relatedExercise} updateExerciseList={this.updateExerciseList} questionNum={questionNum}/>
                            </div> : ""}

                            <div className = "questionContent" id="questionContent">
                                <p>{relatedExercise.exerciseText}</p><br />
                                {firstBlank}<br />
                                {secondBlank}<br />
                                {thirdBlank}<br />
                                <p>{outputMessage}</p><br />
                            </div>
                        </div>
                        <div className="exerciseButton" id="exerciseButton">
                            {this.state.checkButtonHide[questionIndex] != true ? <button name="check" onClick={()=> this.checkAns(questionIndex, relatedExercise.blank1, relatedExercise.blank2, relatedExercise.blank3)}>Check Answer</button> : null}
    
                            {this.state.submitButtonHide[questionIndex] != true ? <button name="submit" onClick={()=> this.submitAns(questionIndex, relatedExercise.blank1, relatedExercise.blank2, relatedExercise.blank3)}>Submit</button> : null}
                        </div>
                    </div>
                    
                );
                
            });
        }
        

        if(topicTitle === ""){
            return(
                <div className="notFound">
                    <h1>This topic is not found.</h1>
                </div>
            );
        } else {
            let titleHeader = () => {
                return(
                    <div>
                        <Helmet>
                            <title>{`Exercise ${topicTitle.topicID}`}</title>
                        </Helmet>
                        <div className="titleClass">
                            <h1 className="titleClass">Exercise {topicTitle.topicID} - {topicTitle.topicName}</h1>
                            {totalNumExercise > 0 ? 
                            <p>This exercise consists of {totalNumExercise} questions. Please read the instructions carefully and fill in the blanks with the required words.</p>
                            : <p>This exercise is exist but yet to have any content.</p>}
                        </div>
                    </div>
                );
            }
            
            if(totalNumExercise > 0){
                return(
                <div>
                    {titleHeader()}
                    {this.state.isAdmin == true ? <AddExerciseModal updateExerciseList={this.updateExerciseList} topicList={this.state.topicList}/> : ""}
                    <div>
                        {relatedExercises}
                    </div>
                </div>);
            } else {
                return(
                <div>
                    {titleHeader()}
                    {this.state.isAdmin == true ? <AddExerciseModal updateExerciseList={this.updateExerciseList} topicList={this.state.topicList}/> : ""}
                </div>);
            }
        }
    }
}

if (document.getElementById('exercise')) {
    ReactDOM.render(<Exercise />, document.getElementById('exercise'));
}