import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import NoteList from './components/NoteList';
import CreateNote from './components/CreateNote';
import CreateAuthor from './components/CreateAuthor';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { checkToken } from './actions/checkToken';
import './App.css';

export default class App extends Component {

    state = {
        user: false
    }

    login = () => {
        this.setState({
            user: true
        })
    }

    logout = () => {
        this.setState({
            user: false
        })
    }

    componentDidMount = async () => {
        if (await checkToken() === true) {
            this.setState({
                user: true
            })
        }
        else {
            this.setState({
                user: false
            })
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/signin" render={(props) => <SignIn {...props} login={this.login} />} />
                        <Route path="/signup" render={(props) => <SignUp {...props} login={this.login} />} />
                        <Route path="/home" render={(props) => <Home {...props} userAccess={this.state.user} signOff={this.logout} />} />
                        <Route path="/edit/:id" render={(props) => <CreateNote {...props} userAccess={this.state.user} signOff={this.logout} />} />
                        <Route path="/notes/create" render={(props) => <CreateNote {...props} userAccess={this.state.user} signOff={this.logout} />} />
                        <Route path="/notes" render={(props) => <NoteList {...props} userAccess={this.state.user} signOff={this.logout} />} />
                        <Route path="/authors" render={(props) => <CreateAuthor {...props} userAccess={this.state.user} signOff={this.logout} />} />
                        <Redirect from="/" to="/signin" />
                    </Switch>
                </Router>
            </div >
        )
    }

}