import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
