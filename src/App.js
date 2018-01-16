import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPhwa6eZ5-KtntpjcR6r5o-W4xwW90giU",
    authDomain: "bloc-chat-6e7d4.firebaseapp.com",
    databaseURL: "https://bloc-chat-6e7d4.firebaseio.com",
    projectId: "bloc-chat-6e7d4",
    storageBucket: "bloc-chat-6e7d4.appspot.com",
    messagingSenderId: "470964481768"
  };
  firebase.initializeApp(config);

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
          activeRoom: ''
        }

        this.activeRoom = this.activeRoom.bind(this);
    }

    activeRoom(room){
      this.setState({ activeRoom: room });
    }

    render() {
      return (
        <div className="App">
          <div className="rooms">
            <RoomList firebase={firebase} activeRoom={this.activeRoom}/>
          </div>
          <div className="chatroom">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
          </div>
        </div>
      );
    }
}

export default App;
