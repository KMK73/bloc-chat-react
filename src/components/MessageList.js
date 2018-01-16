import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props){
      super(props);

      this.state = {
        messages: [],
        activeRoom: ''
      }

      //reference to firebase messages node
      this.messageRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
      // child added event is available on any Firebase reference,
      //and it's called once for each object that has been added to the path
      this.messageRef.orderByChild('roomId').on('child_added', (snapshot) => {
        //The snapshot includes additional metadata about the database entry as well as the actual data.
        console.log(snapshot);

        /*
        Store the snapshot's key (snapshot.key) along with the rest of the room data.
        When rendering an array in React,
        each item should have a unique "key" prop, and the snapshot's key is ideal for that purpose. */
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
      });
    }

    render() {
      return (
        <div className="messageList">
          <h2>Room: {this.props.activeRoom.name}</h2>
            {
              this.state.messages.filter( message => message.roomId === this.props.activeRoom.key ).map(
                (message, index) =>
                <div className="message">
                  <div className="user-data">
                    <h4>{message.username}</h4>
                    <p key={message.key}>{message.content}</p>
                  </div>

                  <span className="timestamp">{message.sentAt}</span>
                </div>

            )}
        </div>
      )
    }

}

export default MessageList;
