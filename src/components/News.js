import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
  
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  //runs post render method
  async componentDidMount() {
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=989b25346b214037b4e40cb0e424b403&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json(); 
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePrevClick  = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=989b25346b214037b4e40cb0e424b403&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json(); 
    console.log(parsedData);
    this.setState({ 
      page: this.state.page-1,
      articles: parsedData.articles,
    })
  };

  handleNextClick = async () => {
    if(Math.ceil(this.state.totalResults/20) > this.state.page+1) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=989b25346b214037b4e40cb0e424b403&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json(); 
      console.log(parsedData);
      this.setState({ 
        page: this.state.page+1,
        articles: parsedData.articles,
      })
    }
  };
 
  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div key={element.url} className="col md-4">
            <NewsItem 
              title={element.title?element.title: ""} 
              description={element.description?element.description: ""} 
              imageUrl={element.urlToImage} newsUrl={element.url}/>  
          </div>
          })}       
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1==Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News;