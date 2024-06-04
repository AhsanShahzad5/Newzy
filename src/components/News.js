import React, { Component } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    //get the articles
    static defaultProps = {
        country: 'us',
        pageSize: 12,
        category: 'general',
        title: 'NewZy-Top Headlines'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstWord = (str) => {

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            totalResults: 0,
            page: 1
        }
        document.title = `Newzy-${this.capitalizeFirstWord(this.props.category)}`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=65735e94c85a4971b5f34c9d0fc19577&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`

        this.setState({ loading: true })

        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            }
        )
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    HandlePrevClick = async () => {
        this.setState(
            {
                page: this.state.page - 1
            }
        )
        this.updateNews();
    }

    HandleNextClick = async () => {
        this.setState(
            {
                page: this.state.page + 1
            }
        )
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=65735e94c85a4971b5f34c9d0fc19577&category=${this.props.category}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            }
        )
    };
    render() {
        return (
            <>
                <h1 className='text-center' style={{
                    marginTop : '90px'
                }}>{this.props.title}</h1>
                {/* {this.state.articles.map((element)=>{console.log(element)})} */}
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">


                        <div className="row my-2 ">
                            {/*!this.state.loading &&*/  this.state.articles.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <NewsComponent
                                        title={element.title}
                                        description={element.description ? element.description : "click here to read further"}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>

                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between ">
                    <button type="button" className='btn btn-dark' onClick={this.HandlePrevClick} disabled={this.state.page <= 1}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type="button" className='btn btn-dark' onClick={this.HandleNextClick}>Next</button>
                </div> */}
            </>
        )
    }
}

export default News