import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ShowOneNews from "./ShowOneNews";
import MostViewedNews from "./MostViewedNews";
import NewNews from "./NewNews";
import reportWebVitals from "./reportWebVitals";
import ShowNewsDetails from "./ShowNewsDetails";

// eslint-disable-next-line no-restricted-globals
const params = new URLSearchParams(location.search);
const id = params.get("id");

if (id === null) {
  const news = [
    {
      id: 124,
      title: "I love React",
      desc: "Happy Coding day",
    },
    {
      id: 124,
      title: "I love React",
      desc: "Happy Coding day",
    },
    {
      id: 124,
      title: "I love React",
      desc: "Happy Coding day",
    },
    {
      id: 124,
      title: "I love React",
      desc: "Happy Coding day",
    },
  ];
  ReactDOM.createRoot(document.getElementById("col-1")).render(
    <ShowOneNews news={news[0]} />
  );
  ReactDOM.createRoot(document.getElementById("col-2")).render(
    <ShowOneNews news={news[1]} />
  );
  ReactDOM.createRoot(document.getElementById("col-3")).render(
    <ShowOneNews news={news[2]} />
  );
  ReactDOM.createRoot(document.getElementById("col-4")).render(
    <ShowOneNews news={news[3]} />
  );
} else {
  document.querySelector("#sec-1").style.display = "none";
}

const mostViewedNews = [
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
  },
  {
    id: 125,
    title: "I love React 125",
    desc: "Happy Coding day",
  },
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
  },
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
  },
];
// ReactDOM.createRoot(document.getElementById("most-viewed-news")).render(
//   <MostViewedNews newsList={mostViewedNews} />
// );
if (id === null) {
  ReactDOM.createRoot(document.getElementById("most-viewed-news")).render(
    <NewNews newsList={mostViewedNews} />
  );
} else {
  const news = mostViewedNews.find((news) => news.id === Number(id));

  if (news !== undefined) {
    ReactDOM.createRoot(document.getElementById("most-viewed-news")).render(
      <ShowNewsDetails news={news} />
    );
  }
}

const newNews = [
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
    content: "Happy Coding day",
  },
  {
    id: 125,
    title: "I love React",
    desc: "Happy Coding day 125",
    content: "Happy Coding day",
  },
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
    content: "Happy Coding day",
  },
  {
    id: 124,
    title: "I love React",
    desc: "Happy Coding day",
    content: "Happy Coding day",
  },
];
// ReactDOM.createRoot(document.getElementById("new-news")).render(
//   <NewNews newsList={newNews} />
// );
if (id === null) {
  ReactDOM.createRoot(document.getElementById("new-news")).render(
    <NewNews newsList={newNews} />
  );
} else {
  const news = newNews.find((news) => news.id === Number(id));

  if (news !== undefined) {
    ReactDOM.createRoot(document.getElementById("new-news")).render(
      <ShowNewsDetails news={news} />
    );
  }
}

reportWebVitals();
