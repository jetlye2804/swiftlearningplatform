import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class AddTopicModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            editTopicModal:false,
            topicName: "",
        }
        this.toggleEditTopicModal = this.toggleEditTopicModal.bind(this);
        this.editTopic = this.editTopic.bind(this, this.props.topic.topicID);
    }

    editTopic(topicID){
        let {topicName} = this.state;
        axios.put(window.location.origin + '/api/topic/' + topicID, {topicName}).then((response) => {
            this.props.updateTopicList();
            this.setState({
                editTopicModal:false,
                topicName: "",
            });
        });
    }

    toggleEditTopicModal(){
        let {editTopicModal, topicName} = this.state;
        topicName = editTopicModal == false ? this.props.topic.topicName : "";
        this.setState({
            editTopicModal:!this.state.editTopicModal,
            topicName,
        });
    }


    render(){
        let {editTopicModal} = this.state;
        return(
            <div>
                <button id="edit" onClick={this.toggleEditTopicModal}>Edit</button>
                <Modal isOpen={editTopicModal} toogle={this.props.toggleEditTopicModal}>
                    <ModalHeader toogle={this.props.toggleEditTopicModal}>Edit topic name</ModalHeader>

                    <ModalBody>
                        <p>New topic name</p>
                        <input type="text"
                            value = {this.state.topicName}
                            onChange={(e)=>{
                                let {topicName} = this.state;
                                topicName = e.target.value;
                                this.setState({
                                    topicName,
                                });
                            }}
                        ></input>
                    </ModalBody>

                    <ModalFooter>
                        <p>When this topic name is edit, all lessons, exercises and graded quizzes with the same topic name will be updated too.</p>
                        <button id="confirmEdit" disabled={!this.state.topicName} onClick={this.editTopic}>
                            Edit
                        </button>
                        <button id="cancel" onClick={this.toggleEditTopicModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}