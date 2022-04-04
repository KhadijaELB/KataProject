
import React, { Component } from 'react'
import GameService from '../services/GameService'
import PlayerService from '../services/PlayerService';
import { useHistory } from "react-router-dom";
function Redirect() {
    let history = useHistory();
    history.push('/BoardGame')
}
class ListGameComponent extends Component {
    constructor(props) {
        super(props)
        localStorage.removeItem("game");
        this.state = {
            games: [],
            firstPlayerName: '',
            secondPlayerName: '',
            gameName: ''

        }
        this.changeGameNameHandler = this.changeGameNameHandler.bind(this);
        //this.getNamePlayerById(id) = this.getNamePlayerById.bind(this);
    }
    changeGameNameHandler = (event) => {
        this.setState({ gameName: event.target.value });
    }


    componentDidMount() {

        GameService.getListGames().then((res) => {

            res.data.forEach(element => {
                this.getNamePlayerById(element.firstPlayer, "first");
                this.getNamePlayerById(element.secondPlayer, "second");
                //element.firstPlayer=this.state.firstPlayerName.playerName;
                //console.log("TEst is "+element.firstPlayer);
            })

            this.setState({ games: res.data });
        });
        //this.getNamePlayerById(this.props.id);
    }
    getNamePlayerById(id, name) {
        PlayerService.getPlayerById(id).then((result) => {
            console.log("Test " + result.data.playerName);
            if (name === "first") this.setState({ firstPlayerName: result.data });
            else this.setState({ secondPlayerName: result.data });
            //return result.data.playerName;
        })
            .catch((e) => {
                console.log(e);
            });

    }
    saveGame = (e) => {
        //const navigate = useNavigate();
        e.preventDefault();
        const firstPlayer = localStorage.getItem("firstPlayer");
        const secondPlayer = localStorage.getItem("secondPlayer");
        let game = {
            gameName: this.state.gameName,
            secondPlayer: JSON.parse(secondPlayer).data.id,
            firstPlayer: JSON.parse(firstPlayer).data.id,
            gameStatus: 'IN_PROGRESS',
            created: new Date()
        };
        console.log('game => ' + JSON.stringify(game));

        GameService.createGame(game).then(res => {
            const json = JSON.stringify(res);
            localStorage.setItem("Game", json);
            this.props.history.push('/BoardGame');
            //Redirect();

        });

    }


    render() {
        return (
            <div>
                <h2 className="text-center">Games List</h2>
                <div className="row">
                    <div className="card-body">
                        <form>
                            <div className="form-group" style={{ "whiteSpace": "nowrap", "display": "inline-block" }}>
                                <input style={{ "whiteSpace": "nowrap", "display": "inline-block" }} placeholder=" Game Name" name="gameName" className="form-control"
                                    value={this.state.gameName} onChange={this.changeGameNameHandler} />
                                <button disabled={!this.state.gameName} className="btn btn-success" onClick={this.saveGame}>New Game</button>
                            </div>

                        </form>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    {this.state.games.length && <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Game Name</th>
                                <th> First Player Name</th>
                                <th> Second Player Name</th>
                                <th> Game Status</th>
                                <th> Created</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.games.map(
                                    game =>
                                        <tr key={game.id}>
                                            <td> {game.gameName} </td>
                                            <td> {this.state.firstPlayerName.playerName} </td>
                                            <td> {this.state.secondPlayerName.playerName}</td>
                                            <td> {game.gameStatus}</td>
                                            <td> {game.created.toLocaleString()}</td>

                                        </tr>
                                )
                            }
                        </tbody>
                    </table>}
                    {!this.state.games.length && <div>
                        No games yet.
                    </div>}
                </div>

            </div>
        )
    }
}

export default ListGameComponent