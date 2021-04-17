import React, { Component } from "react";
import { loadUserWithToken, updateUser } from "./../services/user";
import { signOut } from "./../services/authentication";
import queryString from "query-string";

class Welcome extends Component {
  state = {
    query: this.handleQueryString(),
    user: null,
    password1: "",
    password2: "",
  };

  async componentDidMount() {
    await signOut();
    this.handleQueryString();
    this.loadUser();
  }
  // Parsing the query string
  handleQueryString() {
    let query = queryString.parse(this.props.location.search);
    // console.log(query.token);

    return query.token;
  }

  async loadUser() {
    const token = this.state.query;
    const user = await loadUserWithToken(token);
    this.setState({
      user,
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmission = async (event) => {
    event.preventDefault();
    if (this.state.password1 === this.state.password2) {
      const id = this.state.user._id;
      const data = {
        password: this.state.password1,
      };
      //   console.log(id, data);
      const user = await updateUser(id, data);
      this.props.onUserChange(user);
      this.props.history.push("/dashboard");
    } else {
    }
  };

  render() {
    const user = this.state.user;
    return (
      this.state.user && (
        <div>
          <h1>Welcome {user.firstName}</h1>
          <p>Create a password</p>
          <form onSubmit={this.handleSubmission}>
            <label htmlFor="input-password-1">New password</label>
            <input
              type="password"
              id="input-password-1"
              name="password1"
              value={this.state.password1}
              onChange={this.handleInputChange}
            />
            <label htmlFor="input-password-2">Re-enter the password</label>
            <input
              type="password"
              id="input-password-2"
              name="password2"
              value={this.state.password2}
              onChange={this.handleInputChange}
            />
            <button>SAVE</button>
          </form>
        </div>
      )
    );
  }
}

export default Welcome;
