import  React, { Component } from 'react';
import './login.css';

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

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
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
