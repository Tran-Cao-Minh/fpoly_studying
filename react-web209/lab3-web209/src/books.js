import React from "react";
import Book from "./book";

export default class Books extends React.Component {
  constructor(props) {
    super();
    this.state = {
      choosenBookQuantity: 0,
      choosenBooksID: [],
    };
  }

  chooseBook = (id) => {
    this.state.choosenBooksID.push(id);
    this.state.choosenBookQuantity++;

    this.props.updateCart(id);
  };

  render() {
    const books = [];
    this.props.books.forEach((book) => {
      books.push(
        <Book key={book.id} chooseBook={this.chooseBook} book={book} />
      );
    });

    return (
      <div className="books-container">
        <h2>{this.props.caption}</h2>
        <div className="books">{books}</div>
      </div>
    );
  }
}
