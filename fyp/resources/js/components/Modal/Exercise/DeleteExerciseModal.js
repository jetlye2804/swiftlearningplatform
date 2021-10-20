import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class DeleteExerciseModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteExerciseModal: false,
        }
        this.toogleDeleteExerciseModal = this.toogleDeleteExerciseModal.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this, this.props.relatedExercise.exerciseID);
    }

    toogleDeleteExerciseModal(){
        this.setState({
            deleteExerciseModal:!this.state.deleteExerciseModal,
        });
    }

    deleteExercise(exerciseID){
        axios.delete(window.location.origin + '/api/exercise/' + exerciseID).then((response) => {
            this.props.updateExerciseList();
        });
    }

    render(){
        let {deleteExerciseModal} = this.state;
        let {questionNum} = this.props;

        return(
            <div>
                <button className="delete" onClick={this.toogleDeleteExerciseModal}>Delete</button>
                <Modal isOpen={deleteExerciseModal} toogle={this.props.toogleDeleteExerciseModal}>
                    <ModalHeader toogle={this.props.toogleDeleteExerciseModal}>Do you want to delete this exercise?</ModalHeader>
                    <ModalBody>
                        <div className="deleteContent">
                            <p>Question {questionNum}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p>Don't worry, this will not affect other exercises related to the same topic.</p>
                        <button id="confirmDelete" onClick={this.deleteExercise}>Yes</button>
                        <button id="cancel" onClick={this.toogleDeleteExerciseModal}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}