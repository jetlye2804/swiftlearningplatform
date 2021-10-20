import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddTopicModal from './Modal/AddTopicModal';
import EditTopicModal from './Modal/EditTopicModal';
import DeleteTopicModal from './Modal/DeleteTopicModal';

export default class TopicList extends Component{
    constructor(){
        super()
        this.state = {
            topics: [],
            isAdmin: false,
        }
        this.updateTopicList = this.updateTopicList.bind(this);
    }

    loadTopicList(){
        console.log();
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                topics:response.data
            })
        })
    }

    loadAdminStatus(){
        const adminStatus = $('#topicList').attr("isAdminStr");
        if(adminStatus == "true"){
            this.setState({
                isAdmin: true,
            })
        }
    }

    componentDidMount(){ // React lifecycle
        this.loadAdminStatus();
        this.loadTopicList();
    }

    updateTopicList(){
        this.loadTopicList();
    }
    
    render(){
        let {topics, isAdmin} = this.state;
        const half = Math.ceil(topics.length / 2);
        let firstTopicHalf = topics.slice(0, half);
        let secondTopicHalf = topics.slice(half, topics.length);
        let topicsA = firstTopicHalf.map((topic) => {
            return(
                <div className="topicButtonList" key={topic.topicID}>
                <a id="listname" href={
                    isAdmin == true ? '/admin/topic/' + topic.topicID : '/topic/' + topic.topicID}>Topic {topic.topicID} - {topic.topicName}</a>
                {
                    isAdmin == true ? <EditTopicModal topic={topic} updateTopicList={this.updateTopicList}/> : ""
                }
                {
                    isAdmin == true ? <DeleteTopicModal topic={topic} updateTopicList={this.updateTopicList}/> : ""
                }
                </div>
            )
        })

        let topicsB = secondTopicHalf.map((topic) => {
            return(
                <div className="topicButtonList" key={topic.topicID}>
                <a id="listname" href={
                    isAdmin == true ? '/admin/topic/' + topic.topicID : '/topic/' + topic.topicID}>Topic {topic.topicID} - {topic.topicName}</a>
                {
                    isAdmin == true ? <EditTopicModal topic={topic} updateTopicList={this.updateTopicList}/> : ""
                }
                {
                    isAdmin == true ?<DeleteTopicModal topic={topic} updateTopicList={this.updateTopicList}/> : ""
                }
                </div>
            )
        })

        return(
            
            <div>
                
                <div className="titleClass">
                    <h1>Topic List</h1>
                    {
                        isAdmin == true ? <AddTopicModal updateTopicList={this.updateTopicList}/> : ""
                    }
                </div>
                <div className="listClass">
                    <div className="listContent">
                        <div className="topicButton">
                            {topicsA}
                        </div>
                    </div>
                    <div className="listContent">
                        <div className="topicButton">
                            {topicsB}
                        </div>
                    </div>
                </div>
                
            </div>

        );
    }
}

if (document.getElementById('topicList')) {
    ReactDOM.render(<TopicList />, document.getElementById('topicList'));
}