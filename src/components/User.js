import React, { Component } from 'react';

class User extends Component {
    constructor(props){
      super(props);

      this.state = {
        username: '',
        loggedin: false
      };
      this.signInWithPrompt = this.signInWithPrompt.bind(this);
      this.logout = this.logout.bind(this);
    }

    componentDidMount() {
    	console.log("componentDidMount triggered");
    	//persisting login state across page refreshes or changes
        this.props.firebase.auth().onAuthStateChanged( user => {
           console.log("auth state changed "+ user.displayName);
           this.props.setUser(user);

        });
    }
    signInWithPrompt(event) {
      console.log('sign in');
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
  		//console.log(provider);
  		this.props.firebase.auth().signInWithPopup( provider )
  		 .then( (user) => {
  		 	this.props.setUser(user);
  		 	this.setState({loggedin : true});
  		 	console.log(JSON.stringify(user));
  		 });

  		console.log("triggered popup");
    }

    logout(event) {
      console.log("signOut triggered");
  		this.props.firebase.auth().signOut()
  		 .then( () => {
  		  	this.props.setUser(null);
  			     this.setState({loggedout : false});
  		 });
    }

    render() {

        return (
          <div>
            <span className="username">{this.props.activeUser ? this.props.activeUser : "Viewing as Guest"}</span>
            <button onClick={this.signInWithPrompt}>Sign In</button>
            <button onClick={this.logout}>Log Out</button>
          </div>
        )


    }

}

export default User;
