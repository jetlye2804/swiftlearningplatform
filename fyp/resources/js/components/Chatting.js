import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Chatting extends Component{
    constructor(){
        super();
        this.state = {
            defaultRows: 1,
            minRows: 1,
            maxRows: 10,
            chatList: [],
            isLoaded: false,
            authenticatedStudentID:"",
            authenticatedStudentName:"",
            holdingChatText: "",
            onlineList: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadChats = this.loadChats.bind(this);
        this.loadOnlineList = this.loadOnlineList.bind(this);
        this.interval = null;
    }

    loadAuthStudent(){
        const authUserID = $('#chatpage').attr("authUserID");
        const authUserName = $('#chatpage').attr("authUserName");
        this.setState({
            authenticatedStudentID: authUserID,
            authenticatedStudentName: authUserName,
        });
    }

    scrollToBottom(){
        const objDiv = document.getElementById('boxbody');
        window.scrollTo(0, objDiv.scrollHeight);
        //objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
    }

    loadChats(){
        axios.get(window.location.origin + '/api/chats').then((response) => {
            this.setState({
                chatList: response.data,
                isLoaded: true,
            });
        });
    }

    loadOnlineList(){
        axios.get(window.location.origin + '/api/online').then((response) => {
            this.setState({
                onlineList: response.data,
            });
        });
    }

    convertDate(){
        var date;
        date = new Date();
        date = date.getFullYear() + '-' +
        ('00' + (date.getMonth()+1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2) + ' ' + 
        ('00' + date.getHours()).slice(-2) + ':' + 
        ('00' + date.getMinutes()).slice(-2) + ':' + 
        ('00' + date.getSeconds()).slice(-2);
        return date;
    }

    handleChange(e){
        const textareaLineHeight = 18;
		const { minRows, maxRows } = this.state;
        const previousRows = e.target.rows;
        e.target.rows = minRows;
        const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
            
            if (currentRows >= maxRows) {
                e.target.rows = maxRows;
                e.target.scrollTop = e.target.scrollHeight;
            }


        let {holdingChatText} = this.state;
        holdingChatText = e.target.value;
        
        this.setState({
            holdingChatText,
            defaultRows: currentRows < maxRows ? currentRows : maxRows,
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let chatText = this.state.holdingChatText;
        let chatDateTime = this.convertDate();
        let studentID = this.state.authenticatedStudentID;
        axios.post(window.location.origin + '/api/chat', {
            chatText, chatDateTime, studentID,
        }).then((response) => {
            this.setState({
                holdingChatText: "",
            })
        });
    }

    componentDidMount(){
        this.loadAuthStudent();
        this.interval = setInterval(this.loadChats, 4000);//refresh every 4 seconds
        this.interval = setInterval(this.loadOnlineList, 10000);//refresh every 10 seconds
        this.loadChats();
        this.scrollToBottom();
        this.loadOnlineList();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    sliceDate(dateTime){
        let year = dateTime.slice(0,4);
        let month = dateTime.slice(5,7);
        let day = dateTime.slice(8,10);
        let hour = parseInt(dateTime.slice(11,13));
        let minute = dateTime.slice(14,16);
        let second = dateTime.slice(17,19);
        let meridiem = "";

        if (hour >= 12 && hour <=23){
        if(hour > 12){
            hour = hour - 12;
        }
        meridiem = "PM"
        } else {
        if (hour == 0){
            hour = hour + 12;
        }
        meridiem = "AM"
        }

        hour = hour.toString();
        var newDateFormat = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second + " " + meridiem;
        return newDateFormat;
    }

    render(){

        let users = this.state.onlineList.map((user) => {
            return(
                <div>
                    <p id="onlineusers">{user}</p>
                </div>
                
            );
        })

        let chats = this.state.chatList.map((chat) => {

            let newDateFormat = this.sliceDate(chat.chatDateTime);
            //Rearrange date time format for display purpose

            if(chat.studentID != null){
                return(
                    <div key={chat.chatID} className="chatBubble" id={chat.studentID == this.state.authenticatedStudentID ? "ownChat": "otherChat"}>
                        <div className="chatUser">
                            {chat.studentID == this.state.authenticatedStudentID ? <p>You ({newDateFormat})</p> : 
                            <p>{chat.student.studentName} ({newDateFormat})</p>}
                        </div>
                        <div className="chatContent">
                            <p>{chat.chatText}</p>
                        </div>
                    </div>
                );
            } 

            if (chat.adminID != null){
                return(
                    <div key={chat.chatID} className="chatBubble" id="adminChat">
                        <div className="chatUser"> 
                            <p>{chat.admin.adminName} ({newDateFormat})</p>
                        </div>
                        <div className="chatContent">
                            <p>{chat.chatText}</p>
                        </div>
                    </div>
                );
            }
        });

        return(
            <div>
                <div className="titleClass">
                    <h1>Chatbox</h1>
                </div>
                <div className="box">
                    <div className="chatbox">
                        <div className="boxheader">
                            <h1>{this.state.authenticatedStudentID} - {this.state.authenticatedStudentName}</h1>
                        </div> 
                        <div className="boxbody" id="boxbody">
                            {chats}
                        </div>
                        <div className="boxInput">
                            <form onSubmit={this.handleSubmit}>
                                <textarea type="text" name="chattext"
                                rows={this.state.defaultRows}
                                onChange={this.handleChange}
                                value={this.state.holdingChatText}></textarea>
                                <button type="submit" disabled={!this.state.holdingChatText}>
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="onlinebox">
                        <div className="boxheader">
                            <h1>Online users</h1>
                        </div> 
                        <div className="boxbody" id="boxbody">
                            {users}
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

if (document.getElementById('chatpage')) {
    ReactDOM.render(<Chatting />, document.getElementById('chatpage'));
}