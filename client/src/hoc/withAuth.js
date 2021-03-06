import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    state = {
      loading: true,
      redirect: false,
      username: ""
    }

    componentDidMount() {
      axios.get('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, username: res.data.username });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} username={this.state.username} />;
    }
  }
}