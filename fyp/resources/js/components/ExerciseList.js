import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ExerciseList extends Component{
    constructor(){
        super()
        this.state = {
            exercises: [],
            isAdmin: false,
        }
    }

    loadExerciseList(){
        axios.get(window.location.origin + '/api/topic').then((response) => {
            this.setState({
                exercises:response.data
            })
        })
    }

    loadAdminStatus(){
        const adminStatus = $('#exerciseList').attr("isAdminStr");
        if(adminStatus == "true"){
            this.setState({
                isAdmin: true,
            })
        }
    }

    componentDidMount(){ // React lifecycle
        this.loadAdminStatus();
        this.loadExerciseList();
    }
    
    render(){
        let {exercises, isAdmin} = this.state;
        const half = Math.ceil(exercises.length / 2);
        let firstExeHalf = exercises.slice(0, half);
        let secondExeHalf = exercises.slice(half, exercises.length);
        let exercisesA = firstExeHalf.map((exercise) => {
            return(
                <div className="topicButtonList" key={exercise.topicID}>
                <a id="listname" href={isAdmin == true ? '/admin/exercise/' + exercise.topicID : '/exercise/' + exercise.topicID}>Exercise {exercise.topicID} - {exercise.topicName}</a>
                </div>
            )
        })

        let exercisesB = secondExeHalf.map((exercise) => {
            return(
                <div className="topicButtonList" key={exercise.topicID}>
                <a id="listname" href={isAdmin == true ? '/admin/exercise/' + exercise.topicID : '/exercise/' + exercise.topicID}>Exercise {exercise.topicID} - {exercise.topicName}</a>
                </div>
            )
        })

        return(
            
            <div>
                
                <div className="titleClass">
                    <h1>Exercise List</h1>
                </div>
                <div className="listClass">
                    <div className="listContent">
                        <div className="topicButton">
                            {exercisesA}
                        </div>
                    </div>
                    <div className="listContent">
                        <div className="topicButton">
                            {exercisesB}
                        </div>
                    </div>
                </div>
                
            </div>

        );
    }
}

if (document.getElementById('exerciseList')) {
    ReactDOM.render(<ExerciseList />, document.getElementById('exerciseList'));
}