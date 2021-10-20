import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class AddExerciseModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            addExerciseModal:false,
            newExerciseData:{
                exerciseText:"",
                blank1:"",
                blank2:"",
                blank3:"",
                topicID:"default",
            },
        }

        this.textAreaRef = React.createRef();
        this.toogleAddExerciseModal = this.toogleAddExerciseModal.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.useTab = this.useTab.bind(this);
    }

    addExercise(){
        axios.post(window.location.origin + '/api/addExercise', this.state.newExerciseData).then((response) => {
            this.props.updateExerciseList();
            this.setState({
                addExerciseModal: !this.state.addExerciseModal,
                newExerciseData:{
                    exerciseText:"",
                    blank1:"",
                    blank2:"",
                    blank3:"",
                    topicID:"default",
                }
            });
        });
    }

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "quesText":
                    let {exerciseText} = this.state.newExerciseData;
                    exerciseText = exerciseText.substring(0, selectionStart) + "\t" + exerciseText.substring(selectionEnd);

                    this.setState(prevState => ({
                        newExerciseData: {
                            ...prevState.newExerciseData,
                            exerciseText,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        } 
    }

    toogleAddExerciseModal(){
        this.setState({
            addExerciseModal: !this.state.addExerciseModal,
            newExerciseData:{
                exerciseText: "",
                blank1: "",
                blank2: "",
                blank3: "",
                topicID:"default",
            }
        });
    }

    render(){
        let {addExerciseModal} = this.state;
        let topicOptions = this.props.topicList.map((topic) => {
            return(
                <option key={topic.topicID} value={topic.topicID}>{topic.topicID} - {topic.topicName}</option>
            );
        });
        return(
            <div>
                <button className="addExercise" onClick={this.toogleAddExerciseModal}>Add a new question</button>
                <Modal isOpen={addExerciseModal} toogle={this.props.toogleAddExerciseModal}>
                    <ModalHeader toogle={this.props.toogleAddExerciseModal}>Add a new question
                    <p>Only the second blank and thrid blank are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.newExerciseData.topicID}
                            onChange={(e) => {
                                let {newExerciseData} = this.state;
                                newExerciseData.topicID = e.target.value;
                                this.setState({
                                    newExerciseData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>Question text (Compulsory)</p>
                        <textarea type="text" id="sectionCode" name="quesText" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newExerciseData} = this.state;
                                newExerciseData.exerciseText = e.target.value;
                                this.setState({
                                    newExerciseData
                                });
                            }}
                            value = {this.state.newExerciseData.exerciseText}
                        ></textarea>
                        <p>Answer for the first blank (Compulsory)</p>
                        <input type="text" id="firstBlank"
                            onChange={(e)=>{
                                let {newExerciseData} = this.state;
                                newExerciseData.blank1 = e.target.value;
                                this.setState({
                                    newExerciseData
                                });
                            }}
                            value = {this.state.newExerciseData.blank1}
                        ></input>
                        <p>Answer for the second blank (Optional)</p>
                        <input type="text" id="secondBlank"
                            onChange={(e)=>{
                                let {newExerciseData} = this.state;
                                newExerciseData.blank2 = e.target.value;
                                this.setState({
                                    newExerciseData
                                });
                            }}
                            value = {this.state.newExerciseData.blank2}
                        ></input>
                        <p>Answer for the third blank (Optional)</p>
                        <input type="text" id="thirdBlank" 
                            onChange={(e)=>{
                                let {newExerciseData} = this.state;
                                newExerciseData.blank3 = e.target.value;
                                this.setState({
                                    newExerciseData
                                });
                            }}
                            value = {this.state.newExerciseData.blank3}
                        ></input>
                    </ModalBody>

                    <ModalFooter>
                        <button id="confirmAdd" onClick={this.addExercise} disabled={!(this.state.newExerciseData.exerciseText && this.state.newExerciseData.topicID != "default" && this.state.newExerciseData.blank1)}>
                            Add
                        </button>
                        <button id="cancel" onClick={this.toogleAddExerciseModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}