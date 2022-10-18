// libraries
import axios from 'axios'

const tokenLS = localStorage.getItem("token");

// axios configuration
axios.defaults.baseURL = 'http://localhost:4200/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = tokenLS
// axios.defaults.timeout = 6000
// axios.defaults.withCredentials = true

const setRequest = (val) => {
    const config = {
      params: {},
    }
    if (val) {
      config.params = val
    }
    return config
  }
  

// axios request
export const getRequest = async (url, val = null) => {
  const result = await axios.get(url, { ...setRequest(val) })
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}

export const postRequest = async (url, data = null, val = null) => {
  const result = await axios.post(url, data, { ...setRequest(val) })
  if (result.status === 201 || result.status === 200) {
    return result;
  } else {
    throw result.status
  }
}

export const deleteRequest = async (url, val = null) => {
  const result = await axios.delete(url, { ...setRequest(val) })
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}

export const putRequest = async (url, data = null, val = null) => {
  const result = await axios.put(url, data, { ...setRequest(val) })
  if (result.status === 200) {
    return result
  } else {
    throw result.status
  }
}