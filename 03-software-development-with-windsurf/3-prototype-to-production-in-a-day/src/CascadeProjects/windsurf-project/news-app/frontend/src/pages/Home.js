import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList';
import { fetchNews } from '../services/api';

const countries = [
  { code: 'us', label: 'United States' },
  { code: 'gb', label: 'United Kingdom' },
  { code: 'de', label: 'Germany' },
  { code: 'fr', label: 'France' },
  { code: 'in', label: 'India' },
];

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

function Home() {
  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('general');
  const [pageSize, setPageSize] = useState(10);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchNews({ country, category, pageSize });
      setArticles(data.articles || []);
    } catch (e) {
      setError(e.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="container">
      <h1>Top Headlines</h1>
      <form className="controls" onSubmit={onSubmit}>
        <label>
          Country
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Page size
          <input type="number" min="1" max="100" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value || 10))} />
        </label>
        <button type="submit" disabled={loading}>Refresh</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && <NewsList articles={articles} />}
    </div>
  );
}

export default Home;
