import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class DeleteQuizQuesModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteQuizQuesModal:false,
        }
        this.toogleDeleteQuizQuesModal = this.toogleDeleteQuizQuesModal.bind(this);
        this.deleteQuizQues = this.deleteQuizQues.bind(this, this.props.question.quizID);
    }

    toogleDeleteQuizQuesModal(){
        this.setState({
            deleteQuizQuesModal:!this.state.deleteQuizQuesModal,
        });
    }

    deleteQuizQues(quizID){
        axios.delete(window.location.origin + '/api/quiz/' + quizID).then((response) => {
            this.props.updateQuizList();
        });
    }

    render(){
        let {deleteQuizQuesModal} = this.state;
        let {questionNum} = this.props;

        return(
            <div>
                <button className="delete" onClick={this.toogleDeleteQuizQuesModal}>Delete</button>
                <Modal isOpen={deleteQuizQuesModal} toogle={this.props.toogleDeleteQuizQuesModal}>
                    <ModalHeader toogle={this.props.toogleDeleteQuizQuesModal}>Do you want to delete this quiz question?</ModalHeader>
                    <ModalBody>
                        <div className="deleteContent">
                            <p>Question {questionNum}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p>Don't worry, this will not affect other questions related to the same quiz topic.</p>
                        <button id="confirmDelete" onClick={this.deleteQuizQues}>Yes</button>
                        <button id="cancel" onClick={this.toogleDeleteQuizQuesModal}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}