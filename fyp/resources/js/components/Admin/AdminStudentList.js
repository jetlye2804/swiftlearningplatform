import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class AdminStudentList extends Component{
    constructor(){
        super();
        this.state = {
            studentList: [],
        }
    }

    loadStudentList(){
        axios.get(window.location.origin + '/api/students').then((response) => {
            this.setState({
                studentList: response.data,
            })
        });
    }

    componentDidMount(){
        this.loadStudentList();
    }

    render(){

        let studentList = this.state.studentList.map((student) => {
            return(
                <tr className="studtablecontent" key={student.studentID}>
                <td id="studID">{student.studentID}</td>
                <td id="studName">{student.studentName}</td>
                <td id="studEmail">{student.email}</td>
                <td id="temppass">{student.tempPassword == null || student.tempPassword == "" ? "N/A" : student.tempPassword}</td>
                </tr>
            );
        });

        return(
            <div>
                <div className="profilewrapper">
                    <div className="profiletitle">
                        <h1>Student List</h1>
                    </div>

                    <div className="studentwrapper">
                        <p>If temporary password is N/A means that the student has completed the onboarding change password.</p>
                        <div className="studentwrappercontent">
                            <table>
                                <tbody>
                                    <tr className="studtabletitle">
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Student Email</th>
                                        <th>Temporary Password</th>
                                    </tr>
                                    {studentList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('adminstudentlist')) {
    ReactDOM.render(<AdminStudentList />, document.getElementById('adminstudentlist'));
}