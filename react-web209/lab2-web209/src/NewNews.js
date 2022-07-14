import ShowOneNews from "./ShowOneNews.js";

function NewNews(props) {
  const result = [];
  props.newsList.forEach((news) => {
    result.push(<ShowOneNews news={news}></ShowOneNews>);
  });
  return result;
}

export default NewNews;
