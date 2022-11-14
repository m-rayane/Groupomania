import axios from 'axios'

// axios configuration
axios.defaults.baseURL = 'http://localhost:4200/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

// axios request
export const getRequest = async (url) => {
  const result = await axios.get(url)
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}

export const postRequest = async (url, data = null) => {
  const result = await axios.post(url, data)
  if (result.status === 201 || result.status === 200) {
    return result
  } else {
    throw result.status
  }
}

export const deleteRequest = async (url) => {
  const result = await axios.delete(url)
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}

export const putRequest = async (url, data = null) => {
  const result = await axios.put(url, data)
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}
