import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class AddTopicModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            addTopicModal:false,
            topicName: "",
        }
        this.toggleAddTopicModal = this.toggleAddTopicModal.bind(this);
        this.addTopic = this.addTopic.bind(this);
    }

    addTopic(){
        let {topicName} = this.state;
        axios.post(window.location.origin + '/api/addTopic', {topicName}).then((response) => {
            this.props.updateTopicList();
            this.setState({
                addTopicModal: false,
                topicName: "",
            });
        });
    }

    toggleAddTopicModal(){
        this.setState({
            addTopicModal:!this.state.addTopicModal,
            topicName: "",
        });
    }


    render(){
        let {addTopicModal} = this.state;
        return(
            <div>
                <button id="add" onClick={this.toggleAddTopicModal}>Add Topic</button>
                <Modal isOpen={addTopicModal} toogle={this.props.toggleAddTopicModal}>
                    <ModalHeader toogle={this.props.toggleAddTopicModal}>Add a new topic</ModalHeader>

                    <ModalBody>
                        <p>New topic name</p>
                        <input type="text"
                            onChange={(e)=>{
                                let {topicName} = this.state;
                                topicName = e.target.value;
                                this.setState({
                                    topicName,
                                });
                            }}
                            value = {this.state.topicName}
                        ></input>
                    </ModalBody>

                    <ModalFooter>
                        <p>Once a topic is added, an exercise and a graded quizzes with the same topic name will be added too. You may add contents for new lesson, exercise and/or graded quiz later.</p>
                        <button id="confirmAdd" disabled={!this.state.topicName} onClick={this.addTopic}>
                            Add
                        </button>
                        <button id="cancel" onClick={this.toggleAddTopicModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}