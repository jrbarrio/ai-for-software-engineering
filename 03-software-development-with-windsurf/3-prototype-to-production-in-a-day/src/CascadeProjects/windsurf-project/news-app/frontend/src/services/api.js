export async function fetchNews({ country = 'us', category = 'general', pageSize = 10 } = {}) {
  const params = new URLSearchParams({ country, category, pageSize });
  const res = await fetch(`/api/news?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  return res.json();
}
