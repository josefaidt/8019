exports.handler = async (event) => {
  // TODO implement
  const { name } = JSON.parse(event.body)
  const body = JSON.stringify(`Hello, ${name}!`)
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body,
  }
  return response
}
