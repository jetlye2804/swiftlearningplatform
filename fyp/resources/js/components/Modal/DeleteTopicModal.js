import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class DeleteTopicModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteTopicModal:false,
        }
        this.toggleDeleteTopicModal = this.toggleDeleteTopicModal.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this, this.props.topic.topicID);
    }

    toggleDeleteTopicModal(){
        this.setState({
            deleteTopicModal:!this.state.deleteTopicModal,
        });
    }

    deleteTopic(topicID){
        axios.delete(window.location.origin + '/api/topic/' + topicID).then((response) => {
            this.props.updateTopicList();
        });
    }

    render(){
        let {deleteTopicModal} = this.state;
        let {topic} = this.props;
        return(
            <div>
                <button id="delete" onClick={this.toggleDeleteTopicModal}>Delete</button> 
                <Modal isOpen={deleteTopicModal} toogle={this.props.toggleDeleteTopicModal}>
                    <ModalHeader toogle={this.props.toggleDeleteTopicModal}>Do you want to delete this topic?</ModalHeader>

                    <ModalBody>
                        <div className="deleteContent">
                            <p>Topic {topic.topicID} - {topic.topicName}</p>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <p>When this topic is deleted, all lessons, exercises and graded quizzes related to this topic will be deleted too.</p>
                        <button id="confirmDelete" onClick={this.deleteTopic}>
                            Yes
                        </button>
                        <button id="cancel" onClick={this.toggleDeleteTopicModal}>
                            No
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}