export default class NewsApi {
  constructor(url, apiKey) {
    this.url = url;
    this.key = apiKey;
  }

  getNews(query, from, to, size) {
    const params = `q=${query}&from=${from}&to=${to}&pageSize=${size}&apiKey=${this.key}`;
    return fetch(`${this.url}/everything?${params}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.json());
      })
      .then((articles) => articles.articles)
      .catch((err) => console.log(err));
  }
}