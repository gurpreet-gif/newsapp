import React from 'react';

const NewsItem = ({ title, description, imageurl, newsurl, author, source, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/ /g, '')
    : ' 27Dec2025';

  return (
    <div className="card h-100 position-relative">
      {/* Source Badge */}
      <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger m-0">
        {source || 'Unknown'}
      </span>

      <img
        src={imageurl || 'https://via.placeholder.com/300x200'}
        className="card-img-top"
        alt="news"
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text text-muted mb-1">
          <small>
            By {author || 'Unknown'} | Date: {formattedDate}
          </small>
        </p>
        <a
          href={newsurl}
          className="btn btn-sm btn-primary mt-auto"
          target="_blank"
          rel="noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
