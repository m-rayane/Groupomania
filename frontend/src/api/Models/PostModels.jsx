export default class Post {
    constructor(data) {
      this._id = data._id
      this._posterId = data.posterId
      this._message = data.message
      this._image = data.image
      this._likes = data.likes
      this._usersLiked = data.usersLiked
      this._comments = data.comments
      this._createdAt = data.createdAt
      this._updatedAt = data.updatedAt
    }
  
    get id() {
      return this._id
    }
    get posterId() {
      return this._posterId
    }
    get message() {
      return this._message
    }
    get picture() {
      return this._picture
    }
    get likes() {
      return this._likes
    }
    get usersliked() {
      return this._usersLiked
    }
    get comments() {
      return this._comments
    }
    get createdAt() {
      return this._createdAt
    }
    get updatedAt() {
      return this._updatedAt
    }
  }
  