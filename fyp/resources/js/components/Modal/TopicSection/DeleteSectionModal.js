import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class DeleteSectionModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteSectionModal:false,
        }
        this.toogleDeleteSectionModal = this.toogleDeleteSectionModal.bind(this);
        this.deleteSection = this.deleteSection.bind(this, this.props.relatedSection.sectionID);
    }

    toogleDeleteSectionModal(){
        this.setState({
            deleteSectionModal:!this.state.deleteSectionModal,
        });
    }

    deleteSection(sectionID){
        axios.delete(window.location.origin + '/api/section/' + sectionID).then((response) => {
            this.props.updateSectionList();
        });
    }

    render(){
        let {deleteSectionModal} = this.state;
        let {relatedSection} = this.props;

        return(
            <div>
                <button className="delete" onClick={this.toogleDeleteSectionModal}>Delete</button>
                <Modal isOpen={deleteSectionModal} toogle={this.props.toogleDeleteSectionModal}>
                    <ModalHeader toogle={this.props.toogleDeleteSectionModal}>Do you want to delete this section?</ModalHeader>

                    <ModalBody>
                        <div className="deleteContent">
                            <p>{relatedSection.sectionName}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p>All descriptions, sample codes, and code editor link related to this section will be deleted too. But don't worry, this will not affect other sections related to the same topic.</p>
                        <button id="confirmDelete" onClick={this.deleteSection}>
                            Yes
                        </button>
                        <button id="cancel" onClick={this.toogleDeleteSectionModal}>
                            No
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}