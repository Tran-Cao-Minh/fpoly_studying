import ShowOneNews from "./ShowOneNews.js";

function MostViewedNews(props) {
  return props.newsList.map((news) => <ShowOneNews news={news} />);
}

export default MostViewedNews;
