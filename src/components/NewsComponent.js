import React, { Component } from 'react'
import altnews from './news.png'
export class NewsComponent extends Component {
    // constructor(){
    //     super();
    //     console.log("abc");
    // }

    render() {
        let {title , description , imageUrl , newsUrl , imgHeight , author , date} = this.props;
        return (

            <div>
                <div className="card my-4" >
                    <img src={imageUrl?imageUrl:altnews} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}..</h5>
                        <p className="card-text">{description}.....</p>
                        <p className='card-text'><small className='text-muted'>by {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} className="btn btn-dark" target='_blank'>Read More</a>
                    </div>
                </div>

            </div>
                
        )
    }
}

export default NewsComponent