import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
              {source}
            </span>
            <img src={!imageUrl?"https://images.livemint.com/img/2022/05/07/600x338/20211102-MAM-SSS-MN-Dhanteras-01-01-0_1643605131049_1651883906541.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">
                  {title}
                </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} on {(new Date(date)).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem