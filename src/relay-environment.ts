import envVar from './safety'

async function fetchGraphQL(text: string, variables: {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${envVar.TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  return await response.json()
}

export default fetchGraphQL
