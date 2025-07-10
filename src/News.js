import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      allArticles: [],
      loading: false,
      page: 1,
      pageSize: 20,
      category: props.category || 'technology',
      sources: [],
    };
    document.title = `${this.capitalize(this.state.category)} -NewsApp`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      document.title = `${this.capitalize(this.props.category)} -NewsApp`;
      this.setState(
        { category: this.props.category },
        () => {
          this.fetchArticles();
          this.fetchSources();
        }
      );
    }
  }

  componentDidMount() {
    this.fetchArticles();
    this.fetchSources();
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  truncate = (text, limit) => {
    return text?.length > limit ? text.slice(0, limit) + '...' : text;
  };

  fetchArticles = async () => {
    this.props.setProgress?.(20);
    this.setState({ loading: true });

    const { category } = this.state;
    const fromDate = '2025-07-07';
    const toDate = '2025-07-09';
    const url = `https://newsapi.org/v2/everything?q=${category}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=0719e24ae5ec4ec28e43d48e933c43a5`;

    try {
      const response = await fetch(url);
      this.props.setProgress?.(50);
      const data = await response.json();
      this.props.setProgress?.(80);

      if (data.status === 'ok') {
        this.setState({
          allArticles: data.articles,
          articles: data.articles.slice(0, this.state.pageSize),
          page: 1
        });
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      this.setState({ loading: false });
      this.props.setProgress?.(100);
    }
  };

  fetchSources = async () => {
    const { category } = this.state;
    const url = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=0719e24ae5ec4ec28e43d48e933c43a5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'ok') {
        this.setState({ sources: data.sources });
      }
    } catch (error) {
      console.error('Failed to fetch sources:', error);
    }
  };

  handleNext = () => {
    const { page, pageSize, allArticles } = this.state;
    const nextPageStart = page * pageSize;
    const nextPageEnd = nextPageStart + pageSize;
    if (nextPageStart < allArticles.length) {
      this.setState({
        page: page + 1,
        articles: allArticles.slice(nextPageStart, nextPageEnd)
      });
    }
  };

  handlePrev = () => {
    const { page, pageSize, allArticles } = this.state;
    const prevPageStart = (page - 2) * pageSize;
    const prevPageEnd = prevPageStart + pageSize;
    if (page > 1) {
      this.setState({
        page: page - 1,
        articles: allArticles.slice(prevPageStart, prevPageEnd)
      });
    }
  };

  render() {
    const { articles, page, pageSize, allArticles, loading, sources, category } = this.state;

    return (
      <div className="container my-4">
        <h2 className="text-center mb-4">
          TODAY NEWSAPP - {category.toUpperCase()} HEADLINES
        </h2>

        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              {articles.map((article, index) => (
                <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
                  <NewsItem
                    title={this.truncate(article.title, 45)}
                    description={this.truncate(article.description, 88)}
                    imageurl={article.urlToImage}
                    newsurl={article.url}
                    author={article.author}
                    source={article.source?.name}
                    date={article.publishedAt}
                  />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between my-3">
              <button className="btn btn-primary" disabled={page <= 1} onClick={this.handlePrev}>
                &larr; Previous
              </button>
              <button className="btn btn-primary" disabled={page * pageSize >= allArticles.length} onClick={this.handleNext}>
                Next &rarr;
              </button>
            </div>

            <h3 className="mt-5 mb-3">{category.toUpperCase()} News Sources</h3>
            <div className="row">
              {sources.map((source, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{source.name}</h5>
                      <p className="card-text">{source.description}</p>
                      <p className="card-text">
                        <small className="text-muted">Country: {source.country.toUpperCase()}</small>
                      </p>
                      <a href={source.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}
