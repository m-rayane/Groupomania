import Post from '../Models/PostModels'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiRequests'

export default class PostServices {
  // post request
  async postPost(data) {
    return await postRequest('/posts', data)
  }

  // get request
  async getPost() {
    const req = await getRequest('/posts')
    const res = req.data
    return res.map((data) => new Post(data))
  }

  // put request
  async putPost(id, data) {
    return await putRequest('/posts/' + id, data)
  }

  // delete request
  async deletePost(id) {
    return await deleteRequest('/posts/' + id)
  }

  // ********** Comment request **********

  // post request
  async postComment(id, data) {
    return await postRequest('/posts/' + id + '/comment', data)
  }
  async deleteComment(id, data) {
    return await postRequest('/posts/' + id + '/comment/delete', data)
  }

  // put request
  async putComment(id, data) {
    return await putRequest('/posts/' + id + '/comment', data)
  }

  // ********** Like request **********

  // post request
  async postLike(id, data) {
    return await postRequest('/posts/' + id + '/like', data)
  }
}
