import React, { Component } from 'react';
import {Table, FormGroup, FormControl, Button, InputGroup} from 'react-bootstrap';
import Moment from 'react-moment';

class MessageList extends Component {
    constructor(props){
      super(props);

      this.state = {
        messages: [],
        messageContent: null,
        activeRoom: ''
      }

      //reference to firebase messages node
      this.messageRef = this.props.firebase.database().ref('messages');

      //bind
      this.submitMessage = this.submitMessage.bind(this);
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


    submitMessage(event) {
      console.log('message submit clicked', event);

      let user = null;
      if (this.props.activeUser) {
        user = this.props.activeUser.displayName;
      } else {
        user = "Guest";
      }

      this.messageRef.push({
        content: this.state.messageContent,
        roomId: this.props.activeRoom.key,
        sentAt: new Date().toLocaleString(),
        username: user
      });
      event.target.reset();
      event.preventDefault();
    }

    handleChange = (e) => {
      this.setState({messageContent: e.target.value});
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

                  <Moment fromNow className="timestamp">{message.sentAt}</Moment>
                </div>

            )}
            <form className="newMsgForm" onSubmit={this.submitMessage}>
               <FormGroup bsSize="large">
                 <InputGroup>
                   <FormControl className="msgEntry" type="textarea" id="message" placeholder="Write your message here..." onChange={this.handleChange} />
                   <InputGroup.Button>
                     <Button className="msgSubmit" type="submit" bsSize="large">Send</Button>
                   </InputGroup.Button>
                 </InputGroup>
               </FormGroup>
             </form>
        </div>
      )
    }

}

export default MessageList;
