import React, { Component } from 'react';

export default class Project extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>{this.props.label}</span><span className="badge pull-right">3</span>
            </div>
        );
    }
}


