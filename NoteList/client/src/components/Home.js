import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import Cookies from 'js-cookie';
import { checkToken } from '../actions/checkToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: ""
    }

    setUser = async (firstName, lastName, email) => {
        await this.setState({
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        })
    }

    getInfo = async () => {
        const token = Cookies.get("access_token") ? Cookies.get("access_token") : null;
        if (token != null) {
            const obj = {
                "token": token
            }
            const res = await axios.post("/api/users/getinfo", obj);
            const userInfo = res.data.info;
            this.setUser(userInfo.firstName, userInfo.lastName, userInfo.email);
        }
    }

    componentDidMount = async () => {
        if (await checkToken() === false) {
            this.props.history.push("/signin");
        }
        this.getInfo();
    }

    render() {
        return (
            <div>
                <Navigation signOff={this.props.signOff} userAccess={this.props.userAccess} />
                <div className="content">
                    {
                        this.props.userAccess &&
                        <div>
                            <p className="user-info">
                                <FontAwesomeIcon icon={faUser} className="ml-2 mr-1" />
                                {" " + this.state.firstName + " " + this.state.lastName + " "}
                                <br/>
                                <FontAwesomeIcon icon={faAt} className="ml-2 mr-1" />
                                {" " + this.state.email + " "}
                            </p>
                        </div>
                    }
                    <div className="position-relative text-center col-md-7 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 font-weight-normal text-white">NoteList</h1>
                        <p className="lead font-weight-normal">A MERN stack application.</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Home;