import React from 'react';
import NewsItem from './NewsItem';

function NewsList({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }
  return (
    <div className="news-list">
      {articles.map((a, idx) => (
        <NewsItem key={`${a.url}-${idx}`} article={a} />
      ))}
    </div>
  );
}

export default NewsList;
