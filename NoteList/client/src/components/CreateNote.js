import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { checkToken, getToken } from '../actions/checkToken';
//axios: JavaScript HTTP client library for API calls
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withAlert } from 'react-alert';

class CreateNote extends Component {

    state = {
        authors: [],
        author: "",
        title: "",
        content: "",
        date: new Date(),
        editing: false,
        _idToEdit: ""
    }

    componentDidMount = async () => {
        const token = getToken();
        const res = await axios.get("/api/authors/" + token);
        var authors = res.data.map(author => author.name);

        //To update note (his.props.match.params.id is given by Router):
        const id = this.props.match.params.id;
        if (id) {
            const res2 = await axios.get("/api/notes/" + id);
            if (res2.data) {
                //First we delete the author to edit from the author list
                const author = res2.data.author;
                authors = authors.filter(function (a) {
                    return a !== author
                })
                //Then we add the author to the first place of the author list (to be shown first)
                authors = [author, ...authors];
                await this.setState({
                    authors: authors,
                    author: author,
                    title: res2.data.title,
                    content: res2.data.content,
                    date: new Date(res2.data.date),
                    editing: true,
                    _idToEdit: id
                });
            }
            else {
                await this.setState({
                    authors: authors,
                    author: authors[0] ? authors[0] : ""
                });
            }
        }
        else {
            await this.setState({
                authors: authors,
                author: authors[0] ? authors[0] : ""
            });
        }

        if (await checkToken() === false) {
            this.props.history.push("/signin");
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

    onChangeDate = async (date) => {
        await this.setState(
            {
                date: date
            }
        )
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const token = getToken();
        const newNote = {
            "author": this.state.author,
            "title": this.state.title,
            "content": this.state.content,
            "date": this.state.date,
            "token": token
        }

        var res = "";

        if (this.state.editing) {
            res = await axios.put("/api/notes/" + this.state._idToEdit, newNote);
        }
        else {
            res = await axios.post("/api/notes", newNote);
        }

        this.props.alert.show(res.data.message);
        this.props.history.push("/notes");
    }

    render() {
        return (
            <div>
                <Navigation signOff={this.props.signOff} userAccess={this.props.userAccess} />
                <div className="content">
                    <div className="text-center">
                        <h1 className="display-4 text-white">Create note</h1>
                        <p className="lead">You can create your notes here</p>
                    </div>
                    <div className="col-md-6 p-3 offset-md-3 mt-4">
                        <div className="card card-body">
                            <form onSubmit={this.onSubmit}>

                                {
                                    //Author
                                }
                                <div className="form-group">
                                    <label>Author</label>
                                    <select name="author" className="form-control" onChange={this.onChangeInput} required>
                                        {
                                            this.state.authors.map((author) =>
                                                <option value={author} key={author}>
                                                    {author}
                                                </option>)
                                        }
                                    </select>
                                    <small className="text-muted">You must have an author in order to make a note</small>
                                </div>

                                {
                                    //Title
                                }
                                <div className="form-group">
                                    <label>Title</label>
                                    <input name="title" type="text" className="form-control" value={this.state.title} onChange={this.onChangeInput} required />
                                </div>

                                {
                                    //Content
                                }
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea name="content" className="form-control" value={this.state.content} onChange={this.onChangeInput} required></textarea>
                                </div>

                                {
                                    //Date
                                }
                                <div className="form-group">
                                    <label>Date</label>
                                    <DatePicker name="date" className="form-control" value={this.state.date} selected={this.state.date} onChange={this.onChangeDate} required />
                                </div>

                                {
                                    //Button
                                }
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default withAlert()(CreateNote);