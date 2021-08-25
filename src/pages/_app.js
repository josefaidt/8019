import { useEffect, useState } from 'react'
import { Amplify, API, Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import config from '../aws-exports.js'

Amplify.configure(config)

async function get() {
  const apiName = 'api8019'
  const path = '/hello'
  const myInit = {
    // response: true,
  }

  return API.get(apiName, path, myInit)
    .then((response) => {
      console.log('got response', response)
      return response
    })
    .catch((error) => {
      console.log('got error', error)
      return error
    })
}

async function post() {
  const apiName = 'api8019'
  const path = '/hello-post'
  const myInit = {
    // response: true,
    body: { name: 'World' },
  }

  return API.post(apiName, path, myInit)
    .then((response) => {
      console.log('got response', response)
      return response
    })
    .catch((error) => {
      console.log('got error', error)
      return error
    })
}

function App() {
  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)
  async function getResponse() {
    setIsLoading(true)
    const getResponseData = await get()
    setResponse((existing) => ({ ...existing, get: getResponseData }))
    setIsLoading(false)
  }
  async function postResponse() {
    setIsLoading(true)
    const postResponseData = await post()
    setResponse((existing) => ({ ...existing, post: postResponseData }))
    setIsLoading(false)
  }
  function refresh() {
    getResponse()
    postResponse()
  }
  useEffect(() => {
    refresh()
  }, [])
  return (
    <div>
      <AmplifySignOut />
      <button onClick={refresh}>refresh</button>
      {isLoading && <span>Loading...</span>}
      <code>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </code>
    </div>
  )
}

export default withAuthenticator(App)
