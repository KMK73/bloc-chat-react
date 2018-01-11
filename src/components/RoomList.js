import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props){
      super(props);

      this.state = {
        rooms: []
      };

      // reference to the rooms path in database
      this.roomsRef = this.props.firebase.database().ref('rooms');

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


          // let key = snapshot.key.toString();
          // const room = {
          //   id: snapshot.key,
          //   key : snapshot.val()
          // }
          // add the snapshots data with .val to the state rooms
          // .concat either adds items to an arrary or merges and returns a new array
          // this.setState({
          //     rooms: this.state.rooms.concat( room )
          // })
        });
    }

    render() {
        return (
          <div className="">
            {
              this.state.rooms.map(
                (room, index) =>
                <p key={room.key}>{room.name}</p>

            )}
          </div>
        )
    }
}

export default RoomList
