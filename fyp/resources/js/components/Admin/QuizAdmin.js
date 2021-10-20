import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddQuizQuesModal from '../Modal/Quiz/AddQuizQuesModal';
import EditQuizQuesModal from '../Modal/Quiz/EditQuizQuesModal';
import DeleteQuizQuesModal from '../Modal/Quiz/DeleteQuizQuesModal';

export default class QuizAdmin extends Component{
    constructor(){
        super();
        this.state = {
            topicTitle: {topicID:"", topicName:""},
            relatedQuizList:[],
            correctAnsList: [],
            topicList: [],
            loaded: false,
        }
        this.updateQuizList = this.updateQuizList.bind(this);
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

    loadTopicList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                topicList:response.data,
                isLoaded: true,
            });
        })
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

    updateQuizList(){
        this.loadQuizList();
    }

    componentDidMount(){
        this.loadTopicTitle();
        this.loadQuizList();
        this.loadTopicList();
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
            if (this.state.relatedQuizList.length > 0){
                let questionTab = this.state.relatedQuizList.map((question, questionNum) => {
                    return(
                        <Tab key={question.questionID}>
                            Q{questionNum + 1}
                        </Tab>
                    );
                });
                let tempConvAns = [];
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
                
                let questionTabPanel = this.state.relatedQuizList.map((question, qIndex) => {

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
                            } else {
                                return(
                                    <li key={option} className="quizOptionsList">{option}</li>
                                );
                            }
                            
                        }
                    });

                    return(
                        <TabPanel>
                            <div className="adminButtons">
                                <p id="legend">Question Text</p>
                                <EditQuizQuesModal question={question} updateQuizList={this.updateQuizList} topicList={this.state.topicList}/>
                                <DeleteQuizQuesModal questionNum={qIndex + 1} question={question} updateQuizList={this.updateQuizList}/>
                            </div>
                            <p id="codesegment">
                                {question.quizText}
                            </p>
                            <p id="legend">Available Options (Correct answer will be highlighted as green color)</p>
                            <ul className="quizOptions">
                                {avaOption}
                            </ul>
                        </TabPanel>  
                    );
                });

                return(
                    <div>
                        <Helmet>
                            <title>{`Edit Quiz ${topicTitle.topicID}`}</title>
                        </Helmet>
                        <div className="titleClass">
                            <h1 className="titleClass">Quiz {topicTitle.topicID} - {topicTitle.topicName}</h1>
                            <p>When editing the quizzes, please make sure each question consists of at least 2 options, especially the first two options should not be blank.</p>
                        </div>
                        <AddQuizQuesModal topicList={this.state.topicList} updateQuizList={this.updateQuizList}/>
                        <div>
                        <Tabs>
                            <TabList>
                                {questionTab}
                            </TabList>
                            {questionTabPanel}
                        </Tabs>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div>
                    <Helmet>
                        <title>{`Edit Quiz ${topicTitle.topicID}`}</title>
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

if (document.getElementById('quizAdmin')) {
    ReactDOM.render(<QuizAdmin />, document.getElementById('quizAdmin'));
}