import React from 'react'

const NewsItem = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <div style={{diaplsy: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
              <span className="badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
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

export default NewsItem