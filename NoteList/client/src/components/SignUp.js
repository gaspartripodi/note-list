import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import Cookies from 'js-cookie';
import { withAlert } from 'react-alert';
import { checkToken } from '../actions/checkToken';
import Particles from 'react-particles-js';
import './SignUpSignIn.css';

class SignUp extends Component {

    state = {
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": ""
    }

    componentDidMount = async () => {
        if (await checkToken() === true) {
            this.props.history.push("/home");
        }
    }

    //Same function for all inputs
    onChangeInput = async (e) => {
        await this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }
        const res = await axios.post("/api/users/signup", newUser);
        if (res.data.token) {
            const token = res.data.token;
            Cookies.set("access_token", token);
            this.props.alert.show(res.data.message);
            this.props.history.push("/home");
            this.props.login();
        }
        else {
            this.props.alert.show(res.data.message);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Particles
                    className="particle-canvas"
                    params={{
                        "particles": {
                            "number": {
                                "value": 30
                            },
                            "size": {
                                "value": 2
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }}
                />
                <div className="container" style={{ position: "relative" }}>
                    <div className="text-center mt-5">
                        <h2 className="text-white mb-5">Welcome to NoteList</h2>
                    </div>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form onSubmit={this.onSubmit}>

                                <h3>Sign Up</h3>

                                <div className="form-group">
                                    <label>First name</label>
                                    <input name="firstName" type="text" className="form-control" value={this.state.firstName} placeholder="Enter first name" maxLength="20" onChange={this.onChangeInput} required />
                                </div>

                                <div className="form-group">
                                    <label>Last name</label>
                                    <input name="lastName" type="text" className="form-control" value={this.state.lastName} placeholder="Enter last name" maxLength="20" onChange={this.onChangeInput} />
                                </div>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input name="email" type="email" className="form-control" value={this.state.email} placeholder="Enter email" maxLength="50" onChange={this.onChangeInput} required />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="password" type="password" className="form-control" value={this.state.password} placeholder="Enter password" maxLength="50" onChange={this.onChangeInput} required />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>

                                <p className="forgot-password text-right">
                                    Already registered? <NavLink to="/signin">Sign In</NavLink>
                                </p>

                            </form>
                        </div>
                    </div>
                    <div className="text-center" style={{ marginTop: "60px" }}>
                        <p className="text-white">By signing up to NoteList, you agree to our terms of service.</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default withAlert()(SignUp);