import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import Cookies from 'js-cookie';
import { withAlert } from 'react-alert';
import { checkToken } from '../actions/checkToken';
import Particles from 'react-particles-js';
import './SignUpSignIn.css';

class SignIn extends Component {

    state = {
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
        const user = {
            "email": this.state.email,
            "password": this.state.password
        }
        const res = await axios.post("/api/users/signin", user);
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
                            <form onSubmit={this.onSubmit} >

                                <h3>Sign In</h3>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input name="email" type="email" className="form-control" value={this.state.email} placeholder="Enter email" onChange={this.onChangeInput} required />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="password" type="password" className="form-control" value={this.state.password} placeholder="Enter password" onChange={this.onChangeInput} required />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>

                                <p className="forgot-password text-right">
                                    Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
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

export default withAlert()(SignIn);