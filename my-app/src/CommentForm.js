import React from "react";
import "./comment.css";
class CommentForm extends React.Component {
    render() {
        console.log(this.props.author)
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
                    <input readOnly placeholder={this.props.author} ></input><br />
                    <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
                </div>
                <div className="comment-form-actions">
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        );
    } // end render

    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        let author = this._author;
        let body = this._body;
        this.props.addComment(this.props.author, body.value);
    }
}

export default CommentForm;