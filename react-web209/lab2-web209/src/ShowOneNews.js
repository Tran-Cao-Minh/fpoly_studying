function ShowOneNews(props) {
  return (
    <div className="showOneNews">
      <h3>
        <a href={`/?id=${props.news.id}`}>{props.news.title}</a>
      </h3>
      <p>{props.news.desc}</p>
    </div>
  );
}

export default ShowOneNews;
