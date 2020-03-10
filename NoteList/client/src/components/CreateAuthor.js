import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { checkToken, getToken } from '../actions/checkToken';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import { withAlert } from 'react-alert';

class CreateAuthor extends Component {

    state = {
        name: "",
        authors: []
    }

    getAuthors = async () => {
        const token = getToken();
        const res = await axios.get("/api/authors/" + token);
        await this.setState({ authors: res.data });
    }

    componentDidMount = async () => {
        await this.getAuthors();
        if (await checkToken() === false) {
            this.props.history.push("/signin");
        }
    }

    onChangeName = async (event) => {
        await this.setState({ name: event.target.value });
    }

    createAuthor = async (event) => {
        const token = getToken();
        event.preventDefault();
        const res = await axios.post("/api/authors", { "name": this.state.name, "token": token });
        this.props.alert.show(res.data.message);
        await this.getAuthors();
        await this.setState({ "name": "" });
    }

    deleteAuthor = async (id) => {
        const res = await axios.delete("/api/authors/" + id);
        this.props.alert.show(res.data.message);;
        await this.getAuthors();
    }

    render() {
        return (
            <div>
                <Navigation signOff={this.props.signOff} userAccess={this.props.userAccess} />
                <div className="content">
                    <div className="text-center">
                        <h1 className="display-4 text-white">Authors</h1>
                        <p className="lead">You can manage your authors here</p>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 p-3">
                            <div className="card card-body">
                                <form onSubmit={this.createAuthor}>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            value={this.state.name}
                                            placeholder="Name of the author"
                                            onChange={this.onChangeName} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                </button>
                                    <span className="badge badge-secondary ml-3">Double click to delete</span>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 p-3">
                            <ul className="list-group">
                                {
                                    this.state.authors.map(author =>
                                        <li className="list-group-item list-group-item-action" key={author._id} onDoubleClick={() => this.deleteAuthor(author._id)}>
                                            {author.name}
                                        </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }

}

export default withAlert()(CreateAuthor);