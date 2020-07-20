import dotenv from 'dotenv'

dotenv.config({
  path: '.env',
})

async function fetchGraphQL(text: string, variables: {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'bearer 5df89638e57dcc4d1f31ca004ab3a5eb44be316b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  console.log(process.env)
  return await response.json()
}

export default fetchGraphQL
