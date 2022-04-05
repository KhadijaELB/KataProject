import React, { Component } from 'react'
import MoveService from '../services/MoveService';
import GameService from '../services/GameService';
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class GameComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moves: [],
            move: 0,
            squares: Array(9).fill(null),
            squaresHistory: Array(9).fill(null),
            xIsNext: true,
            isLastClick: false,
            gameOver: false
        };

    }
    handleClickAfterRefresh(i) {
        const squares = this.state.squares.slice();
        const squaresHistory = this.state.squaresHistory.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        let x = 'X';
        let o = 'O';

        let move = this.state.move;
        squaresHistory[move] = this.state.squares;
        move++;
        squares[i] = this.state.xIsNext ? x : o;

        this.setState({
            move: move,
            squares: squares,
            squaresHistory: squaresHistory,
            xIsNext: !this.state.xIsNext,
        });
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        const squaresHistory = this.state.squaresHistory.slice();
        let boardRow = null;
        let boardColumn = null;
        if (i === 0) { boardRow = 1; boardColumn = 1; }
        else if (i === 1) { boardRow = 1; boardColumn = 2; }
        else if (i === 2) { boardRow = 1; boardColumn = 3; }
        else if (i === 3) { boardRow = 2; boardColumn = 1; }
        else if (i === 4) { boardRow = 2; boardColumn = 2; }
        else if (i === 5) { boardRow = 2; boardColumn = 3; }
        else if (i === 6) { boardRow = 3; boardColumn = 1; }
        else if (i === 7) { boardRow = 3; boardColumn = 2; }
        else { boardRow = 3; boardColumn = 3; }

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        let x = 'X';
        let o = 'O';

        let move = this.state.move;
        squaresHistory[move] = this.state.squares;
        move++;
        squares[i] = this.state.xIsNext ? x : o;

        this.setState({
            move: move,
            squares: squares,
            squaresHistory: squaresHistory,
            xIsNext: !this.state.xIsNext,
        });
        let currentPlayer = null;
        if (squares[i] === 'X') {
            currentPlayer = localStorage.getItem("firstPlayer");
        }
        else {
            currentPlayer = localStorage.getItem("secondPlayer");
        }
        let gameStorage = localStorage.getItem("Game");
        let moveToSave = {
            gameName: this.state.gameName,
            boardColumn: boardColumn,
            boardRow: boardRow,
            created: new Date(),
            player: JSON.parse(currentPlayer).data.id,
            game: JSON.parse(gameStorage).data.id,
        };
        MoveService.createMove(moveToSave).then(res => {
            window.location.reload(false);
        });
        //this.props.onToggleX(this.state.xIsNext);
    }
    getGameUpdated(status){
        let gameUpdated ={
            id:JSON.parse(localStorage.getItem("Game")).data.id,
            created: JSON.parse(localStorage.getItem("Game")).data.created,
            firstPlayer: JSON.parse(localStorage.getItem("Game")).data.firstPlayer,
            gameName: JSON.parse(localStorage.getItem("Game")).data.gameName,
            gameStatus: status,
            secondPlayer: JSON.parse(localStorage.getItem("Game")).data.secondPlayer
        }
        return gameUpdated;

    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                if (squares[a] === "X") {
                   let gameUpdated= this.getGameUpdated("FIRST_PLAYER_WON");
                    GameService.updateStateGame(gameUpdated, JSON.parse(localStorage.getItem("Game")).data.id).then(res => {
                    });
                    return JSON.parse(localStorage.getItem("firstPlayer")).data.playerName;
                }
                else {
                    let gameUpdated= this.getGameUpdated("SECOND_PLAYER_WON");
                    GameService.updateStateGame(gameUpdated, JSON.parse(localStorage.getItem("Game")).data.id).then(res => {
                    });
                    return JSON.parse(localStorage.getItem("secondPlayer")).data.playerName;
                }
            }
        }
        if(this.state.isLastClick){
            let gameUpdated= this.getGameUpdated("FINISHED");
                    GameService.updateStateGame(gameUpdated, JSON.parse(localStorage.getItem("Game")).data.id).then(res => {
                    });
                    this.state.gameOver= true;
            return null;
        }
        else return null;
    }
    renderSquare(i) {
        return (
            <Square
                extraClass={this.state.xIsNext ? 'revert' : ''}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    /*ReturnPreviousPage(){
        this.props.history.push('/ListGames');
    }*/
    componentDidMount() {
        let gameLs = localStorage.getItem("Game");
        MoveService.getListMove(JSON.parse(gameLs).data.id).then((res) => {
            this.setState({ moves: res.data });
            if (res.data.length === 9) this.state.isLastClick =true;
            res.data.forEach(element => {
                if (element.boardRow === 1 && element.boardColumn === 1) { this.handleClickAfterRefresh(0); }
                else if (element.boardRow === 1 && element.boardColumn === 2) { this.handleClickAfterRefresh(1); }
                else if (element.boardRow === 1 && element.boardColumn === 3) { this.handleClickAfterRefresh(2); }
                else if (element.boardRow === 2 && element.boardColumn === 1) { this.handleClickAfterRefresh(3); }
                else if (element.boardRow === 2 && element.boardColumn === 2) { this.handleClickAfterRefresh(4); }
                else if (element.boardRow === 2 && element.boardColumn === 3) { this.handleClickAfterRefresh(5); }
                else if (element.boardRow === 3 && element.boardColumn === 1) { this.handleClickAfterRefresh(6); }
                else if (element.boardRow === 3 && element.boardColumn === 2) { this.handleClickAfterRefresh(7); }
                else this.handleClickAfterRefresh(8);

            });

        });
        /*const winner = calculateWinner(this.state.squares);
        if (winner) {
            if(winner === JSON.parse(localStorage.getItem("firstPlayer")).data.playerName ){
                JSON.parse(localStorage.getItem("Game")).data.gameStatus="FIRST_PLAYER_WON";
             
            }
            else if(winner === JSON.parse(localStorage.getItem("firstPlayer")).data.playerName){
                
            }
            else{

            }
        }*/

    }


    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = (this.state.gameOver? 'Game over no one win' : 'Next player: ' + (this.state.xIsNext ? JSON.parse(localStorage.getItem("firstPlayer")).data.playerName : JSON.parse(localStorage.getItem("secondPlayer")).data.playerName));
        }
        return (

            <div class="row">
                <div class="col-md-6">
                    <div>
                        <div className="status">{status}</div>
                        <div className="board-row">
                            {this.renderSquare(0)}
                            {this.renderSquare(1)}
                            {this.renderSquare(2)}
                        </div>
                        <div className="board-row">
                            {this.renderSquare(3)}
                            {this.renderSquare(4)}
                            {this.renderSquare(5)}
                        </div>
                        <div className="board-row">
                            {this.renderSquare(6)}
                            {this.renderSquare(7)}
                            {this.renderSquare(8)}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div>
                        <h6>History of moves in the game</h6>
                        {this.state.moves.length && <table className="table table-striped table-bordered">
                            <thead>
                                <td>Player</td>
                                <td>Position</td>
                                <td>Move created</td>
                            </thead>
                            <tbody>
                                {this.state.moves.map(
                                    move =>
                                        <tr >
                                            <td>{move.player === JSON.parse(localStorage.getItem("firstPlayer")).data.id ? JSON.parse(localStorage.getItem("firstPlayer")).data.playerName : JSON.parse(localStorage.getItem("secondPlayer")).data.playerName}</td>
                                            <td>Board row:{move.boardRow} , Board column:{move.boardColumn}</td>
                                            <td>{move.created.toLocaleString()} </td>
                                        </tr>)}
                            </tbody>
                        </table>}
                        {!this.state.moves.length && <div>
                            No moves yet.
                        </div>}

                    </div>
                </div>
            </div>


        )
    }
}

export default GameComponent
