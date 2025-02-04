import React, { Component } from 'react';
import Header from './Header.js';

class PostDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const url = window.location.href
        const arr = url.split('/')
        const id = arr[arr.length - 1]
        fetch('http://localhost:5000/api/page/' +  id)
            .then(response => response.json())
            .then(data => {
                this.setState({ data })
            })
    }

    render() {
        if (this.state.data !== null) {
            const data = this.state.data

            if (data.id === 'error') {
                return(
                    <h1 className="error">{this.state.data.text}</h1>
                )
            }
            const bodyarr = data.body.split('\n')
            return (
                <div className="PostDetail">
                    <Header />
                    <div className="content-box">
                        <div className="post-title-div">
                            <h1 className="post-title">{data.title}</h1>
                        </div>
                        <div className="post-body-div">
                            {bodyarr.map((el, ix) => <p key={ix}>{el}</p>)}
                        </div>
                        <br />
                        <h5>Created {data.date}</h5>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}


export default PostDetail;
