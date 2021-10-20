import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import axios from 'axios';

export default class AddSectionModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            addSectionModal: false,
            newSectionData: {
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
        this.toogleAddSectionModal = this.toogleAddSectionModal.bind(this);
        this.addSection = this.addSection.bind(this);
        this.useTab = this.useTab.bind(this);
    }

    addSection(){
        axios.post(window.location.origin + '/api/addSection', 
        this.state.newSectionData).then((response) => {
            this.props.updateSectionList();
            this.setState({
                addSectionModal: !this.state.addSectionModal,
                newSectionData: {
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

    useTab(e){
        if(e.keyCode === 9){ // 9 means tab
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            switch (e.target.name){
                case "firstCode":
                    let {sectionCode1} = this.state.newSectionData;
                    sectionCode1 = sectionCode1.substring(0, selectionStart) + "\t" + sectionCode1.substring(selectionEnd);

                    this.setState(prevState => ({
                        newSectionData: {
                            ...prevState.newSectionData,
                            sectionCode1,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "secondCode":
                    let {sectionCode2} = this.state.newSectionData;
                    sectionCode2 = sectionCode2.substring(0, selectionStart) + "\t" + sectionCode2.substring(selectionEnd);

                    this.setState(prevState => ({
                        newSectionData: {
                            ...prevState.newSectionData,
                            sectionCode2,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "thridCode":
                    let {sectionCode3} = this.state.newSectionData;
                    sectionCode3 = sectionCode3.substring(0, selectionStart) + "\t" + sectionCode3.substring(selectionEnd);

                    this.setState(prevState => ({
                        newSectionData: {
                            ...prevState.newSectionData,
                            sectionCode3,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
                case "fourthCode":
                    let {sectionCode4} = this.state.newSectionData;
                    sectionCode4 = sectionCode4.substring(0, selectionStart) + "\t" + sectionCode4.substring(selectionEnd);

                    this.setState(prevState => ({
                        newSectionData: {
                            ...prevState.newSectionData,
                            sectionCode4,
                        }
                    }), () => {
                        this.textAreaRef.current.selectionStart = this.textAreaRef.current.selectionEnd = selectionStart + 1;
                    });
                break;
            }
        } 
    }

    toogleAddSectionModal(){
        this.setState({
            addSectionModal: !this.state.addSectionModal,
            newSectionData: {
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
    }

    render(){
        let {addSectionModal} = this.state;
        let topicOptions = this.props.topicList.map((topic) => {
            return(
                <option key={topic.topicID} value={topic.topicID}>{topic.topicID} - {topic.topicName}</option>
            );
        });
        return(
            <div>
                <button className="addSection" onClick={this.toogleAddSectionModal}>Add a new section</button>
                <Modal isOpen={addSectionModal} toogle={this.props.toogleAddSectionModal}>
                    <ModalHeader toogle={this.props.toggleAddSectionModal}>Add a new section
                    <p>Only the editor link, second section text and onwards, first section code and onwards are nullable (can leave blank).</p>
                    </ModalHeader>

                    <ModalBody>
                        <p>Section Name (Compulsory)</p>
                        <input type="text"
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionName = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionName}
                        ></input>
                        <p>Editor Link (Optional)</p>
                        <input type="text"
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.editorLink = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.editorLink}
                        ></input>
                        <p>Related Topic (Compulsory)</p>
                        <select
                        value={this.state.newSectionData.topicID}
                            onChange={(e) => {
                                let {newSectionData} = this.state;
                                newSectionData.topicID = e.target.value;
                                this.setState({
                                    newSectionData,
                                });
                            }}>
                            <option value="default">Choose a related topic</option>
                            {topicOptions}
                        </select>
                        <p>First Section Text (Compulsory)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionText1 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionText1}
                        ></textarea>
                        <p>First Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="firstCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionCode1 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionCode1}
                        ></textarea>
                        <p>Second Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionText2 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionText2}
                        ></textarea>
                        <p>Second Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="secondCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionCode2 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionCode2}
                        ></textarea>
                        <p>Thrid Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionText3 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionText3}
                        ></textarea>
                        <p>Third Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="thridCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionCode3 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionCode3}
                        ></textarea>
                        <p>Fourth Section Text (Optional)</p>
                        <textarea type="text"
                            rows="4" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionText4 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionText4}
                        ></textarea>
                        <p>Fourth Section Code (Optional)</p>
                        <textarea type="text" id="sectionCode" name="fourthCode" ref={this.textAreaRef}
                            rows="6" onKeyDown={this.useTab}
                            onChange={(e)=>{
                                let {newSectionData} = this.state;
                                newSectionData.sectionCode4 = e.target.value;
                                this.setState({
                                    newSectionData
                                });
                            }}
                            value = {this.state.newSectionData.sectionCode4}
                        ></textarea>
                    </ModalBody>

                    <ModalFooter>
                        <button id="confirmAdd" onClick={this.addSection} disabled={!(this.state.newSectionData.sectionName && this.state.newSectionData.topicID != "default" && this.state.newSectionData.sectionText1)}>
                            Add
                        </button>
                        <button id="cancel" onClick={this.toogleAddSectionModal}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}