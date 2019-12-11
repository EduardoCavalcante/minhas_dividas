import  React, { Component } from 'react';
import './login.css';
import { login } from '../../services/auth';

import api from '../../services/api';

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleLoginChange = event => {
        this.setState({ username : event.target.value});
        console.log(this.state.username);
    }

    hanglePasswordCHange = event => {
        this.setState({ password : event.target.value});
    }

    handleSubmit = async event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password

        try {
            const { data } = await api.post('/sessions', { username, password});
            login(data.token);
            localStorage.setItem('user', data.user);
            this.props.history.push("/debts");
        } catch(error) {
            const { response } = error;
            console.log(response.status);
        }


    }


    render() {
        const {username, password} = this.state;

        return (
            <>
                <div className="container">
                <div className="login-item">
                    <form onSubmit={this.handleSubmit} className="form form-login">
                        <div className="form-field">
                            <input
                                id="login-username"
                                type="text"
                                className="form-input"
                                placeholder="Username"
                                value={username}
                                onChange={this.handleLoginChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <input
                                id="login-password"
                                type="password"
                                className="form-input"
                                placeholder="Password"
                                value={password}
                                onChange={this.hanglePasswordCHange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <input type="submit" value="Log in"></input>
                        </div>
                    </form>
                </div>
            </div>
            </>
          );
    }

}
