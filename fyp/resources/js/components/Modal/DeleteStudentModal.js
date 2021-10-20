import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class DeleteStudentModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteStudentModal:false,
        }
        this.toggleDeleteStudentModal = this.toggleDeleteStudentModal.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this, this.props.loadedStudent.studentID);
    }


    toggleDeleteStudentModal(){
        this.setState({
            deleteStudentModal:!this.state.deleteStudentModal,
        });
    }

    deleteStudent(studentID){
        axios.delete(window.location.origin + '/api/student/' + studentID).then((response) => {
            alert("Student has been deleted successfully.")
            this.props.closeStudentDetails();
        });
    }


    render(){
        let {deleteStudentModal} = this.state;
        let {loadedStudent} = this.props;
        return(
            <div>
                <button id="delete" onClick={this.toggleDeleteStudentModal}>Delete</button> 
                <Modal isOpen={deleteStudentModal} toogle={this.props.toggleDeleteStudentModal}>
                    <ModalHeader toogle={this.props.toggleDeleteStudentModal}>Do you want to delete this student?</ModalHeader>

                    <ModalBody>
                        <div className="deleteContent">
                            <p>{loadedStudent.studentID} - {loadedStudent.studentName}</p>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <p>When this student is deleted, all records related to this student, such as chats and quiz histories will also be deleted. YOU HAVE BEEN WARNED.</p>
                        <button id="confirmDelete" onClick={this.deleteStudent}>
                            Yes
                        </button>
                        <button id="cancel" onClick={this.toggleDeleteStudentModal}>
                            No
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}