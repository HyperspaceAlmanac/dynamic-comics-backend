'use strict';
import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import Canvas from '../Canvas/canvas';
import ResourceList from './resourceList';
import Reviews from '../Reviews/reviews';
import Timeline from '../Timeline/timeline';
import '../themes.css';

class Workstation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme : 'science',
            font : 'arial',
            user : "",
            sideBar : "timeline",
            preview : false,
            published : true,
            panel : 1,
            panels: [],
            current : 1,
            pageState : []
        }
    }

    componentDidMount() {
        let newState = Object.assign({}, this.state);
        newState.user = "MagicalPaintBrush";
        this.setState(newState);
    }
    setSideBarState(value) {
        let newState = Object.assign({}, this.state);
        newState.sideBar = value;
        this.setState(newState);
    }

    increment() {
        let newState = Object.assign({}, this.state);
        newState.current = this.state.current + 1;
        this.setState(newState);
    }
    goToPanel(num) {
        let newState = Object.assign({}, this.state);
        newState.current = this.state.current + 1;
        this.setState(newState);
    }

    initializePageState() {

    }

    updatePageState() {
        
    }

    addPanel(panel) {

    }

    addAction(action) {

    }
    updatePanel(panel) {

    }

    updateAction(action) {
        
    }


    togglePreview() {
        let newState = Object.assign({}, this.state);
        newState.preview = !this.state.preview;
        if (newState.preview) {
            if (newState.sideBar == "panels" || newState.sideBar == "resources") {
                newState.sideBar = "timeline";
            }
        } else {
            if (newState.sideBar == "comments" || newState.sideBar == "reviews") {
                newState.sideBar = "timeline";
            }
        }
        this.setState(newState);
    }

    togglePublish() {
        let newState = Object.assign({}, this.state);
        newState.published = !this.state.published;
        this.setState(newState);
    }

    generateManyValues() {
        let values = [];
        for (let i = 0; i < 50; i++) {
            values.push(<div key={i} className="h3">A lot of Text. Should Overflow</div>)
        }
        return values;
    }
    render() {
        return (
            <div className={`${this.state.font} ${this.state.theme}-font-color ${this.state.theme}-bg1`}>
                <div className="h2">Workstation</div>
                <div>
                    <div className={`${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"} onClick = {() => this.props.navCallback('main', "")}>Back to Main</div>
                    <div className={`${this.state.theme}-btn-two ${this.state.theme}-font-color2` + " btn"} onClick = {() => this.props.navCallback('profile', this.state.user)}>Back to Profile</div>
                </div>
                <div className="h3">{this.props.comicTitle}</div>
                <div>Add in form for updating Title and genres if other features are done</div>
                <div className="row">
                    <div className="col-9">
                        <Canvas disableInteraction = {false} pageState = {this.state.pageState} 
                            increment = {() => this.increment()}
                            goToPanel = {(panel) => this.goToPanel(panel)}/>
                    </div>
                    <div className="col-3">
                        <div className="sidebar">
                        <div className={`col-12 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.togglePublish()}>{this.state.published ? "Hide Series" : "Publish"}</div>
                            <div className={`col-12 ${this.state.theme}-btn-two ${this.state.theme}-font-color2` + " btn"}
                                onClick = {() => this.togglePreview()}>{"Preview: " + (this.state.preview ? "enabled" : "disabled")}</div>
                            <div className={`col-4 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.setSideBarState("timeline")}>Timeline</div>
                            {!this.state.preview &&
                                <div className={`col-4 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.setSideBarState("panel")}>Panel</div>
                            }
                            {!this.state.preview &&
                                <div className={`col-4 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.setSideBarState("resources")}>Resources</div>
                            }
                            {this.state.preview &&
                                <div className={`col-4 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.setSideBarState("reviews")}>Reviews</div>
                            }
                            {this.state.preview &&
                                <div className={`col-4 ${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"}
                                onClick = {() => this.setSideBarState("comments")}>Comments</div>
                            }
                            {!this.state.preview &&
                              this.state.sideBar == "resources" &&
                              <ResourceList theme = {this.state.theme} />
                            }
                            {this.state.preview &&
                              this.state.sideBar == "reviews" &&
                              <Reviews profileOwner = {this.state.user} theme = {this.state.theme} perUser = {false}
                                seriesName = {this.props.comicTitle}
                                visitComic = {(name) => this.props.navCallback("reader", name)}
                                visitAuthor = {(name) => this.props.navCallback("profile", name)}/>
                            }
                            {this.state.preview &&
                              this.state.sideBar == "timeline" &&
                              <Timeline />
                            }
                            {!this.state.preview &&
                              this.state.sideBar == "timeline" &&
                              <TimelineEditor panels={this.state.panels} panelState = {this.state.panel} goToPanel = {(num) => this.goToPanel(num) />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Workstation;