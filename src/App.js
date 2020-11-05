import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from './Config/Firebase/db_config';


class App extends Component {
  constructor(props){
    super(props);
    if( firebase.apps.length === 0 ) {
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards : [],
      currentCard: {}
    }
  }
};
  componentWillMount(){
    // console.log(this.app.database().ref().child('cards'))
    const currentCards = this.state.cards;
    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        eng: snap.val().eng,
        fr: snap.val().fr,
      })
   

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  })
}

  getRandomCard(currentCards) {
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if(card === this.state.currentCard){
      this.getRandomCard(currentCards)
    }
    return(card);
  }

updateCard() {
  const currentCards = this.state.cards;
  this.setState({
    cards: currentCards,
    currentCard: this.getRandomCard(currentCards)
  })
}

  render() {
  return (
    <div className="App">
       <div className="cardRow">
         <Card eng={this.state.currentCard.eng} 
              fr={this.state.currentCard.fr}
             />
       </div>
      
    <div className="buttonRow">
      <DrawButton drawCard={this.updateCard}/>
    </div>
    </div>
    );
  }
} 

export default App;
