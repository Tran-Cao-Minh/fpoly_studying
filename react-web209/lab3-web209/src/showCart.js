import React from "react";
export default class ShowCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { caption: "Choosen Product" };
  }

  render() {
    const result = [];
    this.props.choosenBooks.forEach((book) => {
      result.push(
        <div key={book.id} className="book">
          <img src={book.image} align="left" />
          <p>{book.name}</p>
          <p>Price: ${book.price}</p>
          <p>
            <span>X</span>
          </p>
        </div>
      );
    });

    return (
      <div className="show-cart">
        <h2>{this.state.caption}</h2>
        {result}
      </div>
    );
  }
}
