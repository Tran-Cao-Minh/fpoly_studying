import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Book from "./book";
import Books from "./books";
import ShowCart from "./showCart";

const books = [
  {
    id: 1,
    name: "Living Slow Waiting For The Sun To Rise",
    price: 89,
    image: "./nghethuatsong/song-cham-doi-nang-len.png",
    description: "",
  },
  {
    id: 2,
    name: "Live Green Like Tea Leaves",
    price: 109,
    image: "./nghethuatsong/song-xanh-nhu-nhung-la-tra.png",
    description: "",
  },
  {
    id: 3,
    name: "Live Like The First, Love Like The Last",
    price: 99,
    image: "./nghethuatsong/song-nhu-lan-dau-yeu-nhu-lan-cuoi.jpg",
    description: "",
  },
  {
    id: 4,
    name: "Sunny Days",
    price: 129,
    image: "./nghethuatsong/nhung-ngay-day-nang.png",
    description: "",
  },
  {
    id: 5,
    name: "The Power of Kindness",
    price: 68,
    image: "./nghethuatsong/suc-manh-cua-su-tu-te.png",
    description: "",
  },
  {
    id: 6,
    name: "To Have A Future",
    price: 155,
    image: "./nghethuatsong/de-co-mot-tuong-lai.png",
    description: "",
  },
];

ReactDOM.createRoot(document.getElementById("best-seller-books")).render(
  <div className="books">
    <Book book={books[0]} />
    <Book book={books[1]} />
    <Book book={books[2]} />
  </div>
);

ReactDOM.createRoot(document.getElementById("best-seller-books")).render(
  <Books updateCart={updateCart} caption="Best seller books" books={books} />
);

const choosenBooks = [];
function updateCart(id) {
  const choosenBook = books.find((book, i) => {
    if (book.id === id) return true;
  });
  if (choosenBook === null) {
    alert("Don't have this book");
    return;
  } else {
    choosenBooks.push(choosenBook);
  }

  ReactDOM.createRoot(document.getElementById("cart")).render(
    <ShowCart choosenBooks={choosenBooks} />
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
