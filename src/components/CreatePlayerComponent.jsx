import React, { Component } from 'react'
import PlayerService from '../services/PlayerService';
import { useHistory } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

class CreatePlayerComponent extends Component {
    constructor(props) {
        super(props)
        localStorage.clear();
        this.state = {
             playerName: ''
        }
        this.changePlayerNameHandler = this.changePlayerNameHandler.bind(this);
    }
    
   
    componentDidMount(){
       
    }
    savePlayer = (e) => {
        //let navigate = useNavigate();
        e.preventDefault();
        let player = {playerName: this.state.playerName};
        console.log('player => ' + JSON.stringify(player));
        
       PlayerService.createPlayer(player).then(res =>{
        const json = JSON.stringify(res);
        if(this.props.elementValue === 'First'){
          localStorage.setItem("firstPlayer", json);
        }
         else if(this.props.elementValue === 'Second'){
            localStorage.setItem("secondPlayer", json);
            const firstPlayer = localStorage.getItem("firstPlayer");
            const savedFirstPlayer = JSON.parse(firstPlayer);
            if(savedFirstPlayer) {//navigate("/ListGames");
            /*React.useEffect(() => {
                
                navigate("/ListGames");
                });
                setTimeout(() => {
                    const navigate = useNavigate();
                    navigate('/ListGames')
                 }, 1)*/
                 this.props.history.push('/ListGames');
            }
                
            
           }
                
            });
        
    }
    
    changePlayerNameHandler= (event) => {
        this.setState({playerName: event.target.value});
    }

    render() {
        return (               <div className = "card-body">
                                    <form>
                                        <div className = "form-group" style ={{"whiteSpace": "nowrap","display": "inline-block"}}>
                                            <input style ={{"whiteSpace": "nowrap","display": "inline-block"}} placeholder={this.props.elementValue + " Player Name" } name="playerName" className="form-control" 
                                                value={this.state.playerName} onChange={this.changePlayerNameHandler}/>
                                            <button disabled={!this.state.playerName} className="btn btn-success" onClick={this.savePlayer}>Add</button>
                                        </div>
                                        
                                    </form>
                                </div>
                            
        )
    }
}

export default CreatePlayerComponent
