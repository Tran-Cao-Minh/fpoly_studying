import React from "react";

class ShowNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = { showReview: false };
  }
  changeState = () => {
    this.setState({ showReview: !this.state.showReview });
  };

  addReviewForm = () => {
    return (
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <textarea></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <input type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  render() {
    return (
      <div className="news">
        <p>{this.props.news.title}</p>
        <p>{this.props.news.desc}</p>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.news.content }}
        ></div>
        <button type="button" onClick={this.changeState}>
          Add Review
        </button>
        <hr />
        {this.state.showReview === true ? this.addReviewForm() : null}
      </div>
    );
  }
}

export default ShowNewsDetails;
