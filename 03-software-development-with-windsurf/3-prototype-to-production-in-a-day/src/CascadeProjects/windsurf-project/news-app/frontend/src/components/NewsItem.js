import React from 'react';

function NewsItem({ article }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  return (
    <article className="news-item">
      {urlToImage && (
        <a href={url} target="_blank" rel="noreferrer">
          <img className="news-thumb" src={urlToImage} alt={title} />
        </a>
      )}
      <div className="news-content">
        <h3 className="news-title">
          <a href={url} target="_blank" rel="noreferrer">{title}</a>
        </h3>
        {description && <p className="news-desc">{description}</p>}
        <div className="news-meta">
          <span>{source?.name || 'Unknown source'}</span>
          <span>•</span>
          <span>{new Date(publishedAt).toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

export default NewsItem;
