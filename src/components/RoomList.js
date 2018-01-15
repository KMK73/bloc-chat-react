import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props){
      super(props);

      this.state = {
        rooms: [],
        newRoomName: ""
      };

      // reference to the rooms path in database
      this.roomsRef = this.props.firebase.database().ref('rooms');

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      // child added event is available on any Firebase reference,
      //and it's called once for each object that has been added to the path
      this.roomsRef.on('child_added', (snapshot) => {
          //The snapshot includes additional metadata about the database entry as well as the actual data.
          console.log(snapshot);

          /*
          Store the snapshot's key (snapshot.key) along with the rest of the room data.
          When rendering an array in React,
          each item should have a unique "key" prop, and the snapshot's key is ideal for that purpose. */
          const room = snapshot.val();
          room.key = snapshot.key;
          this.setState({ rooms: this.state.rooms.concat( room ) })

        });
    }

    handleChange(event) {
      this.setState({newRoomName: event.target.value});
    }

    handleSubmit(event) {
      this.roomsRef.push({
        name: newRoomName
      });
      event.preventDefault();
    }

    render() {
        return (
          <div className="">
            {
              this.state.rooms.map(
                (room, index) =>
                <p key={room.key}>{room.name}</p>

            )}

            <form onSubmit={this.handleSubmit}>
              <label>
                Name
                <input type="text" value={this.state.newRoomName} onChange={this.handleChange} />
               </label>
               <input type="submit" value="Submit" />
            </form>
          </div>
        )
    }
}

export default RoomList
