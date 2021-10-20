import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class EditExerciseModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            editExerciseModal:false,
            editExerciseData:{
                exerciseText:"",
                blank1:"",
                blank2:"",
                blank3:"",
                topicID:"default",
            }
        }
        this.textAreaRef = React.createRef();
        this.toogleEditExerciseModal = this.toogleEditExerciseModal.bind(this);
        this.editExercise = this.editExercise.bind(this, this.props.relatedExercise.exerciseID);
        this.useTab = this.useTab.bind(this);
    }

    editExercise(exerciseID){
        axios.put(window.location.origin + '/api/exercise/' + exerciseID, this.state.editExerciseData).then((response) => {
            this.props.updateExerciseList();
            this.setState({
                editExerciseModal:!this.state.editExerciseModal,
                editExerciseData:{
                    exerciseText:"",
                    blank1:"",
                    blank2:"",
                    blank3:"",
                    topicID:"default",
                }
            });
        });
    }

    toogleEditExerciseModal(){
        let {editExerciseModal, editExerciseData} = this.state;
        if(editExerciseModal == false){
            editExerciseData = this.props.relatedExercise;
            for (var key in editExerciseData){
                if(editExerciseData[key] === null){
                    editExerciseData[key] = "";
                }
            }
        }
        this.setState({
            editExerciseModal:!this.state.editExerciseModal,
            editExerciseData,
        });
    }

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "quesText":
                    let {exerciseText} = this.state.editExerciseData;
                    exerciseText = exerciseText.substring(0, selectionStart) + "\t" + exerciseText.substring(selectionEnd);

                    this.setState(prevState => ({
                    editExerciseData: {
                            ...prevState.editExerciseData,
                            exerciseText,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        } 
    }

    render(){
        let {editExerciseModal} = this.state;
        let topicOptions = this.props.topicList.map((topic) => {
            return(
                <option key={topic.topicID} value={topic.topicID}>{topic.topicID} - {topic.topicName}</option>
            );
        });
        return(
            <div>
                <button className="edit" onClick={this.toogleEditExerciseModal}>Edit</button>
                <Modal isOpen={editExerciseModal} toogle={this.props.toogleEditExerciseModal}>
                    <ModalHeader toogle={this.props.toogleEditExerciseModal}>Edit a current question
                    <p>Only the second blank and thrid blank are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.editExerciseData.topicID}
                            onChange={(e) => {
                                let {editExerciseData} = this.state;
                                editExerciseData.topicID = e.target.value;
                                this.setState({
                                    editExerciseData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>Question text (Compulsory)</p>
                        <textarea type="text" id="sectionCode" name="quesText" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editExerciseData} = this.state;
                                editExerciseData.exerciseText = e.target.value;
                                this.setState({
                                    editExerciseData
                                });
                            }}
                            value = {this.state.editExerciseData.exerciseText}
                        ></textarea>
                        <p>Answer for the first blank (Compulsory)</p>
                        <input type="text" id="firstBlank"
                            onChange={(e)=>{
                                let {editExerciseData} = this.state;
                                editExerciseData.blank1 = e.target.value;
                                this.setState({
                                    editExerciseData
                                });
                            }}
                            value = {this.state.editExerciseData.blank1}
                        ></input>
                        <p>Answer for the second blank (Optional)</p>
                        <input type="text" id="secondBlank"
                            onChange={(e)=>{
                                let {editExerciseData} = this.state;
                                editExerciseData.blank2 = e.target.value;
                                this.setState({
                                    editExerciseData
                                });
                            }}
                            value = {this.state.editExerciseData.blank2}
                        ></input>
                        <p>Answer for the third blank (Optional)</p>
                        <input type="text" id="thirdBlank" 
                            onChange={(e)=>{
                                let {editExerciseData} = this.state;
                                editExerciseData.blank3 = e.target.value;
                                this.setState({
                                    editExerciseData
                                });
                            }}
                            value = {this.state.editExerciseData.blank3}
                        ></input>
                    </ModalBody>

                    <ModalFooter>
                        <button id="confirmEdit" onClick={this.editExercise} disabled={!(this.state.editExerciseData.exerciseText && this.state.editExerciseData.topicID != "default" && this.state.editExerciseData.blank1)}>
                            Edit
                        </button>
                        <button id="cancel" onClick={this.toogleEditExerciseModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
}