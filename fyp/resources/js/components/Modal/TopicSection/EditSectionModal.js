import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class EditSectionModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            editSectionModal:false,
            editSectionData: {
                sectionName: "",
                editorLink: "",
                sectionText1: "",
                sectionCode1: "",
                sectionText2: "",
                sectionCode2: "",
                sectionText3: "",
                sectionCode3: "",
                sectionText4: "",
                sectionCode4: "",
                topicID: "default",
            }
        }
        this.textAreaRef = React.createRef();
        this.toogleEditSectionModal = this.toogleEditSectionModal.bind(this);
        this.editSection = this.editSection.bind(this, this.props.relatedSection.sectionID);
        this.useTab = this.useTab.bind(this);
    }

    editSection(sectionID){
        axios.put(window.location.origin + '/api/section/' + sectionID, this.state.editSectionData).then((response) => {
            this.props.updateSectionList();
            this.setState({
                editSectionModal:!this.state.editSectionModal,
                editSectionData: {
                    sectionName: "",
                    editorLink: "",
                    sectionText1: "",
                    sectionCode1: "",
                    sectionText2: "",
                    sectionCode2: "",
                    sectionText3: "",
                    sectionCode3: "",
                    sectionText4: "",
                    sectionCode4: "",
                    topicID: "default",
                }
            });
        });
    }

    toogleEditSectionModal(){
        let {editSectionModal, editSectionData} = this.state;
        if(editSectionModal == false){
            editSectionData = this.props.relatedSection;
            for (var key in editSectionData){
                if(editSectionData[key] === null){
                    editSectionData[key] = "";
                }
            }
        }
        this.setState({
            editSectionModal:!this.state.editSectionModal,
            editSectionData,
        });
    }

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "firstCode":
                    let {sectionCode1} = this.state.editSectionData;
                    sectionCode1 = sectionCode1.substring(0, selectionStart) + "\t" + sectionCode1.substring(selectionEnd);

                    this.setState(prevState => ({
                        editSectionData: {
                            ...prevState.editSectionData,
                            sectionCode1,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "secondCode":
                    let {sectionCode2} = this.state.editSectionData;
                    sectionCode2 = sectionCode2.substring(0, selectionStart) + "\t" + sectionCode2.substring(selectionEnd);

                    this.setState(prevState => ({
                        editSectionData: {
                            ...prevState.editSectionData,
                            sectionCode2,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "thridCode":
                    let {sectionCode3} = this.state.editSectionData;
                    sectionCode3 = sectionCode3.substring(0, selectionStart) + "\t" + sectionCode3.substring(selectionEnd);

                    this.setState(prevState => ({
                        editSectionData: {
                            ...prevState.editSectionData,
                            sectionCode3,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "fourthCode":
                    let {sectionCode4} = this.state.editSectionData;
                    sectionCode4 = sectionCode4.substring(0, selectionStart) + "\t" + sectionCode4.substring(selectionEnd);

                    this.setState(prevState => ({
                        editSectionData: {
                            ...prevState.editSectionData,
                            sectionCode4,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        }
    }

    render(){
        let {editSectionModal} = this.state;
        let topicOptions = this.props.topicList.map((topic) => {
            return(
                <option key={topic.topicID} value={topic.topicID}>{topic.topicID} - {topic.topicName}</option>
            );
        });
        return(
            <div>
                <button className="edit" onClick={this.toogleEditSectionModal}>Edit</button>
                <Modal isOpen={editSectionModal} toogle={this.props.toogleEditSectionModal}>
                    <ModalHeader toogle={this.props.toogleEditSectionModal}>Edit a current section
                    <p>Only the editor link, second section text and onwards, first section code and onwards are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Section Name (Compulsory)</p>
                        <input type="text"
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionName = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionName}
                        ></input>
                        <p>Editor Link (Optional)</p>
                        <input type="text"
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.editorLink = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.editorLink}
                        ></input>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.editSectionData.topicID}
                            onChange={(e) => {
                                let {editSectionData} = this.state;
                                editSectionData.topicID = e.target.value;
                                this.setState({
                                    editSectionData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>First Section Text (Compulsory)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionText1 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionText1}
                        ></textarea>
                        <p>First Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="firstCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionCode1 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionCode1}
                        ></textarea>
                        <p>Second Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionText2 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionText2}
                        ></textarea>
                        <p>Second Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="secondCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionCode2 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionCode2}
                        ></textarea>
                        <p>Thrid Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionText3 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionText3}
                        ></textarea>
                        <p>Third Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="thridCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionCode3 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionCode3}
                        ></textarea>
                        <p>Fourth Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionText4 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionText4}
                        ></textarea>
                        <p>Fourth Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="fourthCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {editSectionData} = this.state;
                                editSectionData.sectionCode4 = e.target.value;
                                this.setState({
                                    editSectionData
                                });
                            }}
                            value = {this.state.editSectionData.sectionCode4}
                        ></textarea>
                    </ModalBody>

                    <ModalFooter>
                        <button id="confirmEdit" onClick={this.editSection} disabled={!(this.state.editSectionData.sectionName && this.state.editSectionData.topicID != "default" && this.state.editSectionData.sectionText1)}>
                            Edit
                        </button>
                        <button id="cancel" onClick={this.toogleEditSectionModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}