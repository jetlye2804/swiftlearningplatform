import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { indexOf } from 'lodash';
import AddSectionModal from './Modal/TopicSection/AddSectionModal';
import EditSectionModal from './Modal/TopicSection/EditSectionModal';
import DeleteSectionModal from './Modal/TopicSection/DeleteSectionModal';

export default class Topic extends Component{

    constructor(){
        super()
        this.state = {
            topicList: [],
            // The purpose of topicList is to check the number of valid topic exists, for next button and back button.
            relatedSectionList: [],
            topic: {topicID:"", topicName:""},
            isEditorOpen:[],
            editorList: [],
            isLoaded: false,
            isAdmin: false,
        }
        this.updateSectionList = this.updateSectionList.bind(this);
    }
    loadTopic(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();
        axios.get(window.location.origin + '/api/topic/' + theID).then((response) => {
            this.setState({
                topic:response.data,
            });
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

    loadAdminStatus(){
        const adminStatus = $('#topic').attr("isAdminStr");
        if(adminStatus == "true"){
            this.setState({
                isAdmin: true,
            })
        }
    }

    loadSectionList(){
        var thePath = window.location.pathname;
        var theID = thePath.split('/').pop();
        axios.get(window.location.origin + '/api/relatedTopic/' + theID).then((response) => {
            let {isEditorOpen, editorList} = this.state;

            for (var i = 0; i < response.data.length; i++){
                isEditorOpen[i] = false;
                editorList[i] = "";
            }
            this.setState({
                relatedSectionList:response.data,
                isEditorOpen,
                editorList,
            });
        })
    }

    updateSectionList(){
        this.loadSectionList();
    }

    componentDidMount(){
        this.loadAdminStatus();
        this.loadTopic();
        this.loadTopicList();
        this.loadSectionList();
    }

    codeEditor(sectionIndex, editorLink){
        let {isEditorOpen, editorList} = this.state;
        
        if(isEditorOpen[sectionIndex] == false){
            isEditorOpen[sectionIndex] = true;
            editorList[sectionIndex] = 
            <div className="editorWrap">
                <div className="blockExternal"></div>
                <iframe src={`${editorLink}`} scrolling="no"  seamless="seamless" frameBorder="0"></iframe>
            </div>;

            this.setState({
                isEditorOpen,
                editorList,
            });
        } else {
            isEditorOpen[sectionIndex] = false;
            editorList[sectionIndex] = "";

            this.setState({
                isEditorOpen,
                editorList,
            });
        }
    }

    render(){
        
        let topic = this.state.topic;
        let topics;
        let contentList;
        let contentPara;
        let backButton = <a id="backNot">&nbsp;</a>;
        let nextButton = <a id="nextNot">&nbsp;</a>;

        if(this.state.isLoaded){
            topics = this.state.topicList.map(aTopic => aTopic.topicID);

            contentList = this.state.relatedSectionList.map((relatedSection) => {
                let sectionPath = "#" + relatedSection.sectionName;
                return(
                    <li key={relatedSection.sectionID}><a href={sectionPath}>{relatedSection.sectionName}</a></li>
                )
            });
    
            contentPara = this.state.relatedSectionList.map((relatedSection, sectionIndex) => {
                
                let editorButton;
                let editorContent = this.state.editorList[sectionIndex];
            
                let firstCodeEx;
                let secondCodeEx;
                let thridCodeEx;
                let fourthCodeEx;
    
                if(relatedSection.sectionCode1 != null){
                    firstCodeEx = <div className="lessonContentCode" id="codeSample">
                        <p>{relatedSection.sectionCode1}</p>
                    </div>
                }
                if(relatedSection.sectionCode2 != null){
                    secondCodeEx = <div className="lessonContentCode" id="codeSample">
                        <p>{relatedSection.sectionCode2}</p>
                    </div>
                }
                if(relatedSection.sectionCode3 != null){
                    thridCodeEx = <div className="lessonContentCode" id="codeSample">
                        <p>{relatedSection.sectionCode3}</p>
                    </div>
                }
                if(relatedSection.sectionCode4 != null){
                    fourthCodeEx = <div className="lessonContentCode" id="codeSample">
                        <p>{relatedSection.sectionCode4}</p>
                    </div>
                }
    
                if(relatedSection.editorLink != null){
    
                    if(this.state.isEditorOpen[sectionIndex] != true){
                        editorButton = <button className="tryEditor" onClick={()=> this.codeEditor(sectionIndex, relatedSection.editorLink)}>Click to open the code editor for this section!</button>
                    } else {
                        editorButton = <button className="tryEditor" onClick={()=> this.codeEditor(sectionIndex, relatedSection.editorLink)}>Click to close the code editor for this section!</button>
                    }
                    
                }
    
                return(
                    <div key={relatedSection.sectionID} className="lessonContentPara" id={relatedSection.sectionName}>
                        <h3>{relatedSection.sectionName}</h3>
                        {this.state.isAdmin == true ?
                        <div className="adminButtons">
                            <EditSectionModal relatedSection={relatedSection} updateSectionList={this.updateSectionList} topicList={this.state.topicList}/>
                            <DeleteSectionModal relatedSection={relatedSection} updateSectionList={this.updateSectionList}/>
                        </div> : ""}    
                        
                        <p>{relatedSection.sectionText1}</p>
                        {firstCodeEx}
                        <p>{relatedSection.sectionText2}</p>
                        {secondCodeEx}
                        <p>{relatedSection.sectionText3}</p>
                        {thridCodeEx}
                        <p>{relatedSection.sectionText4}</p>
                        {fourthCodeEx}
                        {editorButton}
                        {editorContent}
                        
                    </div>
                )
            });

            var prevTopic;
            var nextTopic;
            for (var i = 0; i < topics.length; i++){
                if(topics[i] == topic.topicID){
                    prevTopic = topics[i-1];
                    nextTopic = topics[i+1];
                }
            }
            if(typeof prevTopic != "undefined"){
                backButton = this.state.isAdmin == true ? <a id="back" href={'/admin/topic/' + prevTopic}>Back</a> : <a id="back" href={'/topic/' + prevTopic}>Back</a>;
            }

            if(typeof nextTopic != "undefined"){
                nextButton = this.state.isAdmin == true ? <a id="next" href={'/admin/topic/' + nextTopic}>Next</a> : <a id="next" href={'/topic/' + nextTopic}>Next</a>;
            }
        }

        if(topic === ""){
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
                            <title>{`Topic ${topic.topicID}`}</title>
                        </Helmet>
                        <div className="titleClass">
                            <h1 className="titleClass">Topic {topic.topicID} - {topic.topicName}</h1>
        
                            {nextButton}
                            {backButton}
                        </div>
                    </div>
                );
            }

            if (this.state.relatedSectionList.length > 0){
                return(
                <div>
                    {titleHeader()}
                    <div className="lessonContent">
                        {this.state.isAdmin == true ? <AddSectionModal updateSectionList={this.updateSectionList} topicList={this.state.topicList}/> : ""}
                        <div className="lessonContentIntro">
                            <p className="lessonContentIntroText">
                                In this topic, you will learn about:
                            </p>
                            <ul className="lessonContentIntroList">
                                {contentList}
                            </ul>
                        </div>
                        {contentPara}
                    </div>
                        
                </div>
                );
            } else {
                return(
                    <div>
                        {titleHeader()}
                        <div className="lessonContent">
                            {this.state.isAdmin == true ? <AddSectionModal updateSectionList={this.updateSectionList} topicList={this.state.topicList}/> : ""}
                            <div className="lessonContentIntro">
                                <p className="lessonContentIntroText">
                                    This topic is exist but yet to have any content.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                );
            }
        } 
        
    }
}

if (document.getElementById('topic')) {
    ReactDOM.render(<Topic />, document.getElementById('topic'));
}