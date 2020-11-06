export const createHttpRequest = async (url: string, options: any, token: string = null) => {
  const { params, method }: { params: object, method: string } = options

  const fetchOptions = {
    method,
    body: params && JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }

  if (token) {
    fetchOptions.headers.append('Authorization', `Bearer ${token}`)
  }

  if (method === 'GET' && params) {
    url += '?' + objectToQueryString(params)
  }

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && !params) {
    throw new Error('You must provide HTTP request payload')
  }

  try {
    const response = await fetch(`${process.env.ROOT_ENDPOINT}${url}`, fetchOptions)

    if (response.ok && response.status === 204) {
      return Promise.resolve()
    }

    const result = await response.json()

    if (!response.ok) {
      return Promise.reject(result)
    }

    return result
  } catch (err) {
    return Promise.reject(err)
  }
}

export const objectToQueryString = (obj: object) => {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
}
