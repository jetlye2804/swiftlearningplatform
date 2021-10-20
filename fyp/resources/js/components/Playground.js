import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Playground extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="titleClass">
                    <h1>Code Playground</h1>
                </div>
                <div className="editorWrap">
                <div className="blockExternal"></div>
                    <iframe src="https://paiza.io/projects/e/KzfajUOa3Sif_JsWBaYaxw" scrolling="no"  seamless="seamless" frameBorder="0"></iframe>
                </div>
            </div>
        );
    }
}

if (document.getElementById('playgroundpage')) {
    ReactDOM.render(<Playground />, document.getElementById('playgroundpage'));
}