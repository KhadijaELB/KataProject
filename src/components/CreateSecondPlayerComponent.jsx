import React, { Component } from 'react'
import PlayerService from '../services/PlayerService';
//import { useNavigate } from "react-router-dom";

class CreateSecondPlayerComponent extends Component {
    constructor(props) {
        super(props)
       // localStorage.clear();
        this.state = {
            playerName: ''
        }
        this.changePlayerNameHandler = this.changePlayerNameHandler.bind(this);
    }


    componentDidMount() {

    }
    savePlayer = (e) => {
        e.preventDefault();
        let player = { playerName: this.state.playerName };
        console.log('player => ' + JSON.stringify(player));

        PlayerService.createPlayer(player).then(res => {
            const json = JSON.stringify(res);
            localStorage.setItem("secondPlayer", json);
            this.props.history.push('/ListGames');
        });

    }

    changePlayerNameHandler = (event) => {
        this.setState({ playerName: event.target.value });
    }
    getTitle() {
        return <h3 className="text-center">Add Second Player</h3>

    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group" style={{ "whiteSpace": "nowrap", "display": "inline-block" }}>
                                        <input style={{ "whiteSpace": "nowrap", "display": "inline-block" }} placeholder= "Second Player Name" name="playerName" className="form-control"
                                            value={this.state.playerName} onChange={this.changePlayerNameHandler} />
                                        <button disabled={!this.state.playerName} className="btn btn-success" onClick={this.savePlayer}>Add</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateSecondPlayerComponent
