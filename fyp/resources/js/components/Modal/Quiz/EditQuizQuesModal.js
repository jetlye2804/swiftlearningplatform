import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class EditQuizQuesModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            editQuizQuesModal:false,
            editQuizQuesData:{
                quizText: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAns: "default",
                topicID: "default",
            }
        }
        this.textAreaRef = React.createRef();
        this.toogleEditQuizQuesModal = this.toogleEditQuizQuesModal.bind(this);
        this.editQuizQues = this.editQuizQues.bind(this, this.props.question.quizID);
        this.useTab = this.useTab.bind(this);
    }

    editQuizQues(quizID){
        axios.put(window.location.origin + '/api/quiz/' + quizID, this.state.editQuizQuesData).then((response) => {
            this.props.updateQuizList();
            this.setState({
                editQuizQuesModal:!this.state.editQuizQuesModal,
                editQuizQuesData:{
                    quizText: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    correctAns: "default",
                    topicID: "default",
                }
            });
        });
    }

    toogleEditQuizQuesModal(){
        let {editQuizQuesModal, editQuizQuesData} = this.state;
        if(editQuizQuesModal == false){
            editQuizQuesData = this.props.question;
            for (var key in editQuizQuesData){
                if(editQuizQuesData[key] === null){
                    editQuizQuesData[key] = "";
                }
            }
        }
        this.setState({
            editQuizQuesModal: !this.state.editQuizQuesModal,
            editQuizQuesData,
        });
    }

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "quesText":
                    let {quizText} = this.state.editQuizQuesData;
                    quizText = quizText.substring(0, selectionStart) + "\t" + quizText.substring(selectionEnd);

                    this.setState(prevState => ({
                        editQuizQuesData: {
                            ...prevState.editQuizQuesData,
                            quizText,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        } 
    }

    render(){
        let {editQuizQuesModal} = this.state;
        let correctAnsList = ['a', 'b', 'c', 'd'];
        let correctAns = correctAnsList.map((ans, ansIndex) => {
            let {editQuizQuesData} = this.state;
            if(eval("editQuizQuesData.option" + (ansIndex + 1)) == ""){
                return(
                    <option value={ans} disabled>{ans}</option>
                );
            } else {
                return(
                    <option value={ans}>{ans}</option>
                );
            }
        });
        let topicOptions = this.props.topicList.map((topic) => {
            return(
                <option key={topic.topicID} value={topic.topicID}>{topic.topicID} - {topic.topicName}</option>
            );
        });
        return(
            <div>
                <button className="edit" onClick={this.toogleEditQuizQuesModal}>Edit</button>
                <Modal isOpen={editQuizQuesModal} toogle={this.props.toogleEditQuizQuesModal}>
                    <ModalHeader toogle={this.props.toogleEditQuizQuesModal}>Edit a current question
                    <p>Only the third option and fourth option are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.editQuizQuesData.topicID}
                            onChange={(e) => {
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.topicID = e.target.value;
                                this.setState({
                                    editQuizQuesData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>Question text (Compulsory)</p>
                        <textarea type="text" id="sectionCode" name="quesText" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.quizText = e.target.value;
                                this.setState({
                                    editQuizQuesData
                                });
                            }}
                            value = {this.state.editQuizQuesData.quizText}
                        ></textarea>
                        <p>Answer for the first option (Compulsory)</p>
                        <input type="text" id="firstOption"
                            onChange={(e)=>{
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.option1 = e.target.value;
                                this.setState({
                                    editQuizQuesData
                                });
                            }}
                            value = {this.state.editQuizQuesData.option1}
                        ></input>
                        <p>Answer for the second option (Compulsory)</p>
                        <input type="text" id="secondOption"
                            onChange={(e)=>{
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.option2 = e.target.value;
                                this.setState({
                                    editQuizQuesData
                                });
                            }}
                            value = {this.state.editQuizQuesData.option2}
                        ></input>
                        <p>Answer for the third option (Optional)</p>
                        <input type="text" id="thirdOption"
                            onChange={(e)=>{
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.option3 = e.target.value;
                                this.setState({
                                    editQuizQuesData
                                });
                            }}
                            value = {this.state.editQuizQuesData.option3}
                        ></input>
                        <p>Answer for the fourth option (Optional)</p>
                        <input type="text" id="fourthOption"
                            onChange={(e)=>{
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.option4 = e.target.value;
                                this.setState({
                                    editQuizQuesData
                                });
                            }}
                            value = {this.state.editQuizQuesData.option4}
                        ></input>
                        <p>Correct Answer (Compulsory)</p>
                        <select
                        value={this.state.editQuizQuesData.correctAns}
                            onChange={(e) => {
                                let {editQuizQuesData} = this.state;
                                editQuizQuesData.correctAns = e.target.value;
                                this.setState({
                                    editQuizQuesData,
                                });
                            }}>
                            <option value="default">Set the correct answer (a/b/c/d)</option>
                            {correctAns}
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <button id="confirmEdit" onClick={this.editQuizQues} disabled={!(this.state.editQuizQuesData.quizText && this.state.editQuizQuesData.option1 && this.state.editQuizQuesData.option2 && this.state.editQuizQuesData.topicID != "default" && this.state.editQuizQuesData.correctAns !="default")}>Edit</button>
                        <button id="cancel" onClick={this.toogleEditQuizQuesModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}