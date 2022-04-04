import React, { Component } from 'react'
import PlayerService from '../services/PlayerService';
import CreatePlayerComponent from './CreatePlayerComponent';

class CreatePlayersComponent extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
       
    }
   
    getTitle(){
       return <h3 className="text-center">Add Players</h3>
        
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <CreatePlayerComponent elementValue="First"/>
                                <CreatePlayerComponent elementValue="Second"/>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreatePlayersComponent
