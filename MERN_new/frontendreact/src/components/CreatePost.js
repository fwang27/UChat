import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author:'',
      description:'',
      published_date:'',
      publisher:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const dateObject = new Date(Date.now());
    const date = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    //const date = Date.now();

    const data = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      published_date: date,
      publisher: this.state.publisher
    };

    axios
      .post('http://localhost:8082/api/posts', data)
      .then(res => {
        this.setState({
          title: '',
          author:'',
          description:'',
          published_date:'',
          publisher:''
        })
        this.props.history.push('/show-list');
      })
      .catch(err => {
        console.log("Error in CreatePost!");
      })
  };

  render() {
    return (
      <div className="CreatePost">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-list" className="btn btn-outline-warning float-left">
                  Back
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Post</h1>
              <p className="lead text-center">
                  Create new post
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Post'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this post'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                {/*
                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='published_date'
                    name='published_date'
                    className='form-control'
                    value={this.state.published_date}
                    onChange={this.onChange}
                  />
                </div>
                */}
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Publisher of this Post'
                    name='publisher'
                    className='form-control'
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;