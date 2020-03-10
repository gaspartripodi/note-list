import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { checkToken, getToken } from '../actions/checkToken';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';

class NoteList extends Component {

    state = {
        notes: [],
        filteredNotes: [],
        filter: "createdAt", //createdAt or date
        order: 1 //1 (ascending) or -1 (descending)
    }

    getNotes = async () => {
        const token = getToken();
        const res = await axios.get("/api/notes/token/" + token + "/" + this.state.filter + "/" + this.state.order);
        await this.setState({ notes: res.data, filteredNotes: res.data });
    }

    componentDidMount = async () => {
        await this.getNotes();
        if (await checkToken() === false) {
            this.props.history.push("/signin");
        }
    }

    deleteNote = async (id) => {
        const res = await axios.delete("/api/notes/" + id);
        this.props.alert.show(res.data.message);
        await this.getNotes();
    }

    setFilter = async (filter, order) => {
        await this.setState({ "filter": filter, "order": order });
        await this.getNotes();
    }

    onChangeSearch = async (e) => {
        let newList = [];
        if (e.target.value !== "") {
            //If the search bar isn't empty
            newList = this.state.notes.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
            await this.setState({
                filteredNotes: newList
            });
        } else {
            //If the search bar is empty, set newList to original task list
            await this.setState({
                filteredNotes: this.state.notes
            });
        }
    }

    render() {
        return (
            <div>
                <Navigation signOff={this.props.signOff} userAccess={this.props.userAccess} />
                <div className="content">
                    <div className="text-center">
                        <h1 className="display-4 text-white">Note list</h1>
                        <p className="lead">You can manage your notes here</p>
                    </div>
                    <div className="text-center">
                        <div className="text-center mb-3 d-inline">
                            <input type="text" className="form-control d-inline search p-2" placeholder=" Search..." onChange={this.onChangeSearch} />
                        </div>
                        <div className="btn-group mt-3 d-inline" role="group">
                            <button id="btnGroupDrop1" type="button" className="btn btn-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Order by
                                {
                                this.state.filter === "createdAt" ? " created " : " date "
                                }
                                {
                                this.state.order === 1 ? <FontAwesomeIcon icon={faSortUp} className="icon-up" /> : <FontAwesomeIcon icon={faSortDown} className="icon-down" />
                                }
                        </button>
                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <button className="dropdown-item" onClick={() => this.setFilter("date", 1)}>Date <FontAwesomeIcon icon={faSortUp} className="icon-up" /> </button>
                                <button className="dropdown-item" onClick={() => this.setFilter("date", -1)}>Date <FontAwesomeIcon icon={faSortDown} className="icon-down" /> </button>
                                <button className="dropdown-item" onClick={() => this.setFilter("createdAt", 1)}>Created <FontAwesomeIcon icon={faSortUp} className="icon-up" /> </button>
                                <button className="dropdown-item" onClick={() => this.setFilter("createdAt", -1)}>Created <FontAwesomeIcon icon={faSortDown} className="icon-down" /> </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.state.filteredNotes.map((note) =>
                                <div className="col-md-4 p-3" key={note._id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>{note.title}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p>{note.content}</p>
                                            <p>{note.author}</p>
                                            <p>{format(note.date)}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                                Delete
                                        </button>
                                            <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                                Update
                                        </Link>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default withAlert()(NoteList);