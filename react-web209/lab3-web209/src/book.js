import React from "react";

class Book extends React.Component {
  constructor(props) {
    super();
    this.state = { isLiked: false };
    console.log("A book component Constructor");
  }

  likeBook = () => {
    this.setState({ isLiked: true });
  };

  componentDidMount() {
    console.log("A book component Did Mount");
  }

  shouldComponentUpdate() {
    console.log("A book component should update");
  }

  componentDidUpdate() {
    console.log("A book component did update");
  }

  render() {
    console.log("Render a book");
    return (
      <div className={this.state.isLiked ? "bookLiked" : "book"}>
        <h3>{this.props.book.name}</h3>
        <img src={this.props.book.image} alt="A book" />
        <p className="price">{this.props.book.price}</p>
        <p className="button">
          <button className="like-btn" onClick={this.likeBook} type="button">
            Like
          </button>
          <button
            className="buy-btn"
            type="button"
            onClick={() => this.props.chooseBook(this.props.book.id)}
          >
            Buy
          </button>
        </p>
        <p>{this.props.book.description}</p>
      </div>
    );
  }
}

export default Book;
