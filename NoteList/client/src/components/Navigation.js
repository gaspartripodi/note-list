import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {

    logout = async () => {
        const token = Cookies.get("access_token") ? Cookies.get("access_token") : null;
        const obj = {
            "token": token
        }
        await axios.post("/api/users/logout", obj);
        this.props.signOff();
        window.location.replace("/signin");
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-nav">
                    <div className="container">
                        <div className="navbar-brand">
                            <img src={window.location.origin + "/images/logo.png"} className="d-inline-block align-top" alt="logo" />
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">

                                {
                                    this.props.userAccess ? (
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" activeStyle={{ color: "cyan", fontWeight: "bolder" }} exact to="/home">Home</NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <NavLink className="nav-link dropdown-toggle" activeStyle={{ color: "cyan", fontWeight: "bolder" }} to="/notes" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    Notes
                                            </NavLink>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <NavLink className="dropdown-item" to="/notes/create">Create note</NavLink>
                                                    <NavLink className="dropdown-item" exact to="/notes">Note list</NavLink>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" activeStyle={{ color: "cyan", fontWeight: "bolder" }} to="/authors">Authors</NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <NavLink className="nav-link" activeStyle={{ color: "cyan", fontWeight: "bolder" }} to="/logout" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                    <FontAwesomeIcon icon={faUserCog} className="icon" />
                                                </NavLink>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <button className="dropdown-item" onClick={this.logout}>Log Out</button>
                                                </div>
                                            </li>
                                        </React.Fragment>) : (
                                            <React.Fragment>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" activeStyle={{ color: "cyan", fontWeight: "bolder" }} to="/signin">Sign In</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" activeStyle={{ color: "cyan", fontWeight: "bolder" }} to="/signup">Sign Up</NavLink>
                                                </li>
                                            </React.Fragment>)
                                }

                            </ul>
                        </div>
                    </div>
                </nav >
            </React.Fragment>
        )
    }

}

export default Navigation;