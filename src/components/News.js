import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    console.log("constructor called")
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMoney`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=989b25346b214037b4e40cb0e424b403&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json(); 
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
    });
    console.log(this.state.page);
    this.props.setProgress(100);
  }

  //runs post render method
  async componentDidMount() {
    console.log("componentDidMount called")
    this.updateNews();
  }

  // handlePrevClick  = async () => {
  //   this.setState({page: this.state.page - 1});
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({page: this.state.page + 1});
  //   this.updateNews();
  // };
 
   fetchMoreData = async () => {
    this.setState({ page: this.state.page+1 });
    console.log(this.state.page);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=989b25346b214037b4e40cb0e424b403&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json(); 
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* { this.state.loading && <Spinner/> } */}
        <InfiniteScroll 
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index)=>{
                return <div key={index} className="col md-4">
                <NewsItem 
                  title={element.title?element.title: ""} 
                  description={element.description?element.description: ""} 
                  imageUrl={element.urlToImage} newsUrl={element.url}
                  author={element.author?element.author:"Unknown"} date={element.publishedAt}
                  source={element.source.name}/>  
              </div>
              })}       
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News;