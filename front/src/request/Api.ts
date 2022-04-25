import { api } from "boot/axios"

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return `Bearer ${token}`;
}

const getHeaders = () => ({
  headers: {
    "Authorization": getToken()
  }
})

export default {
  get(url: string, params = {}) {
    return api.get(
      url,
      {
        params,
        ...getHeaders()
      }
    )
  },
  post(url: string, params = {}) {
    return api.post(
      url,
      params,
      getHeaders()
    )
    .then((response) => {
      return Promise.resolve(response.data)
    })
  },
  patch(url: string, params = {}) {
    return api.patch(
      url,
      params,
      getHeaders()
    ).then((response) => {
      return Promise.resolve(response.data)
    })
  },
  put(url: string, params = {}) {
    return api.put(
      url,
      params,
      getHeaders()
    )
  },
  delete(url: string, params = {}) {
    return api.delete(
      url,
      {
        params,
        ...getHeaders()
      }
    )
  }
}