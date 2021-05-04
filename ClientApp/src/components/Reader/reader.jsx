'use strict';
import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import Canvas from '../Canvas/canvas';
import SubmitReview from './submitReview';
import Reviews from '../Reviews/reviews';
import '../themes.css';

class Reader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme : 'science',
            font : 'arial',
            user : "",
            author : "",
            sideBar : "review"
        }
    }
    componentDidMount() {
        let newState = Object.assign({}, this.state);
        this.fetchComic();
        this.setState(newState);
    }

    generateManyValues() {
        let values = [];
        for (let i = 0; i < 50; i++) {
            values.push(<div key={i} className="h3">A lot of Text. Should Overflow</div>)
        }
        return values;
    }

    handleServerResponse(data) {
        let newState = Object.assign({}, this.state);
        newState.user = data.user;
        newState.author = data.author;
        newState.theme = data.theme;
        newState.font = data.font;
        this.setState(newState);
    }

    render() {
        console.log(this.state);
        return (
            <div className={`${this.state.font} ${this.state.theme}-font-color ${this.state.theme}-bg1`}>
                <div className="h2">Comic Reader</div>
                <div>
                    <div className={`${this.state.theme}-btn-one ${this.state.theme}-font-color` + " btn"} onClick = {() => this.props.navCallback('main', "")}>Back to Main</div>
                    <div className={`${this.state.theme}-btn-two ${this.state.theme}-font-color2` + " btn"} onClick = {() => this.props.navCallback('profile', this.state.user)}>Back to Profile</div>
                </div>
                <div className="h3">{this.props.comicTitle}</div>
                <div>
                    Page for creating a Comic
                </div>
                <div className="row">
                    <div className="col-9">
                        <Canvas />
                    </div>
                    <div className="col-3">
                        <div className={"sidebar " + `${this.state.theme}-bg2`}>
                        {this.state.sideBar === "review" &&
                            <div>
                                {this.state.author !== this.state.user &&
                                    <SubmitReview theme = {this.state.theme} comicSeries = {this.props.comicTitle}/>
                                }
                                <Reviews profileOwner = {this.state.author} theme = {this.state.theme} perUser = {false}
                                    seriesName = {this.props.comicTitle}
                                    visitComic = {(name) => this.props.navCallback("reader", name)}
                                    visitAuthor = {(name) => this.props.navCallback("profile", name)}/>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async fetchComic() {
        const token = await authService.getAccessToken();
        const requestOptions = {
          method: 'Put',
          headers: {'Authorization': `Bearer ${token}`, 'Content-Type' : 'application/json' },
          body: JSON.stringify({ comicName : this.props.comicTitle})
        }
        const response = await fetch('api/Account/GetComicSeries', requestOptions);
        const data = await response.json();
        if (data.result == "Success") {
            this.handleServerResponse(data);
        } else {
            alert("Something Went Wrong");
        }
      }
}

export default Reader;