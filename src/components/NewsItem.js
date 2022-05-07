import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://images.livemint.com/img/2022/05/07/600x338/20211102-MAM-SSS-MN-Dhanteras-01-01-0_1643605131049_1651883906541.jpg":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem