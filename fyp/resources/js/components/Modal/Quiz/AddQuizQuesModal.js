import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class AddQuizQuesModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            addQuizQuesModal: false,
            newQuizQuesData: {
                quizText: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAns: "default",
                topicID: "default",
            },
        }

        this.textAreaRef = React.createRef();
        this.toogleAddQuizQuesModal = this.toogleAddQuizQuesModal.bind(this);
        this.addQuizQues = this.addQuizQues.bind(this);
        this.useTab = this.useTab.bind(this);
    }

    addQuizQues(){
        axios.post(window.location.origin + '/api/addQuiz', this.state.newQuizQuesData).then((response) => {
            this.props.updateQuizList();
            this.setState({
                addQuizQuesModal: !this.state.addQuizQuesModal,
                newQuizQuesData: {
                    quizText: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    correctAns: "default",
                    topicID: "default",
                },
            });
        });
    }

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "quesText":
                    let {quizText} = this.state.newQuizQuesData;
                    quizText = quizText.substring(0, selectionStart) + "\t" + quizText.substring(selectionEnd);

                    this.setState(prevState => ({
                        newQuizQuesData: {
                            ...prevState.newQuizQuesData,
                            quizText,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        } 
    }

    toogleAddQuizQuesModal(){
        this.setState({
            addQuizQuesModal: !this.state.addQuizQuesModal,
            newQuizQuesData: {
                quizText: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correctAns: "default",
                topicID: "default",
            },
        });
    }

    render(){
        let {addQuizQuesModal} = this.state;
        let correctAnsList = ['a', 'b', 'c', 'd'];
        let correctAns = correctAnsList.map((ans, ansIndex) => {
            let {newQuizQuesData} = this.state;
            if(eval("newQuizQuesData.option" + (ansIndex + 1)) == ""){
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
                <button className="addQuiz" onClick={this.toogleAddQuizQuesModal}>Add a new question</button>
                <Modal isOpen={addQuizQuesModal} toogle={this.props.toogleAddQuizQuesModal}>
                    <ModalHeader toogle={this.props.toogleAddQuizQuesModal}>Add a new question
                    <p>Only the third option and fourth option are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.newQuizQuesData.topicID}
                            onChange={(e) => {
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.topicID = e.target.value;
                                this.setState({
                                    newQuizQuesData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>Question text (Compulsory)</p>
                        <textarea type="text" id="sectionCode" name="quesText" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.quizText = e.target.value;
                                this.setState({
                                    newQuizQuesData
                                });
                            }}
                            value = {this.state.newQuizQuesData.quizText}
                        ></textarea>
                        <p>Answer for the first option (Compulsory)</p>
                        <input type="text" id="firstOption"
                            onChange={(e)=>{
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.option1 = e.target.value;
                                this.setState({
                                    newQuizQuesData
                                });
                            }}
                            value = {this.state.newQuizQuesData.option1}
                        ></input>
                        <p>Answer for the second option (Compulsory)</p>
                        <input type="text" id="secondOption"
                            onChange={(e)=>{
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.option2 = e.target.value;
                                this.setState({
                                    newQuizQuesData
                                });
                            }}
                            value = {this.state.newQuizQuesData.option2}
                        ></input>
                        <p>Answer for the third option (Optional)</p>
                        <input type="text" id="thirdOption"
                            onChange={(e)=>{
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.option3 = e.target.value;
                                this.setState({
                                    newQuizQuesData
                                });
                            }}
                            value = {this.state.newQuizQuesData.option3}
                        ></input>
                        <p>Answer for the fourth option (Optional)</p>
                        <input type="text" id="fourthOption"
                            onChange={(e)=>{
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.option4 = e.target.value;
                                this.setState({
                                    newQuizQuesData
                                });
                            }}
                            value = {this.state.newQuizQuesData.option4}
                        ></input>
                        <p>Correct Answer (Compulsory)</p>
                        <select
                        value={this.state.newQuizQuesData.correctAns}
                            onChange={(e) => {
                                let {newQuizQuesData} = this.state;
                                newQuizQuesData.correctAns = e.target.value;
                                this.setState({
                                    newQuizQuesData,
                                });
                            }}>
                            <option value="default">Set the correct answer (a/b/c/d)</option>
                            {correctAns}
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <button id="confirmAdd" onClick={this.addQuizQues} disabled={!(this.state.newQuizQuesData.quizText && this.state.newQuizQuesData.option1 && this.state.newQuizQuesData.option2 && this.state.newQuizQuesData.topicID != "default" && this.state.newQuizQuesData.correctAns !="default")}>Add</button>
                        <button id="cancel" onClick={this.toogleAddQuizQuesModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}