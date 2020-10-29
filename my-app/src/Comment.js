import React from "react";
import "./comment.css";
class Comment extends React.Component {
    render () {
        return(
            <div className="comment">
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">- {this.props.body}</p>
                <div className="comment-footer">
                    <button className="comment-footer-delete" onClick={this._deleteComment.bind(this,
                            this.props.id)}>Delete Comment</button>
                </div>
            </div>
        );
    }
    _deleteComment(id1) {
        let id={id:id1}

       this.props.deleteComment(id)
    }
}

export default Comment;
