const commentList = [{
    hikeName: 'Mesa Falls',
    typeFlag: 'hike',
    date: '10/24/2019',
    text: 'This is my comment.'
}];

class commentsView {
    renderCommentList(commentElement, commentList) {
        commentElement.innerHTML = `<h1>Comments:</h1>`;
        console.log("In the comments view");

        commentList.forEach(comment => {
            // notice the call to 'this' below. 'this' is like adding './' at the beginning of a path. It helps the computer find things.
            commentElement.appendChild(this.renderOneComment(comment));
          });
        console.log(commentElement);
    }

    renderOneComment(comment) {
        const item = document.createElement('li');
        item.setAttribute('data-name', comment.hikeName);
        item.innerHTML = `
        <div>
            <h3>${comment.hikeName}</h3>
            <p>${comment.text}</p>
        </div>`;

        return item;
    }
}

export default class commentsController {
    constructor(commentId, commentType) {
        this.commentView = new commentsView();
        this.commentModel = new commentsModel();
        this.commentElement = document.getElementById(commentId);
        this.type = commentType;
        console.log("in comments controller");
    }
    showCommentsList() {
        const commentList = this.commentModel.getAllComments();
        // send the list of hikes and the element we would like those placed into to the view.
        this.commentView.renderCommentList(this.commentElement, commentList);

        // after the hikes have been rendered...add our listener
        //this.addHikeListener();
    }
}

class commentsModel {
    getAllComments() {
        return commentList;
    }
}