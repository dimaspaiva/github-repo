import envVar from './safety'

console.log(envVar.TOKEN)

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

  console.log(process.env)
  return await response.json()
}

export default fetchGraphQL
