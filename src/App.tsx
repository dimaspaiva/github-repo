import React, { useEffect, useState, useReducer } from 'react'

import fetchGraphQL from './relay-environment'
import Header from './components/Header'
import MainChart from './components/MainChart'

interface Author {
  additions: number
  deletions: number
  commits: number
  login?: string
}

interface State {
  count: number
  request: number
  additions: number
  deletions: number
  authors: Map<string, Author>
}

const initialState: State = {
  count: 0,
  request: 0,
  additions: 0,
  deletions: 0,
  authors: new Map<string, Author>(),
}

function reducer(
  state: State,
  action: { type: string; key?: string; value?: Author }
): State {
  switch (action.type) {
    case 'new-request':
      return { ...state, request: state.request + 1 }

    case 'increment':
      if (!action.key || !action.value) {
        console.log(action)
        return state
      }

      const author = state.authors.get(action.key)
      const commit = action.value

      if (author) {
        const update = {
          additions: author.additions + commit.additions,
          deletions: author.deletions + commit.deletions,
          commits: author.commits + 1,
          login: commit?.login,
        }

        return {
          ...state,
          count: state.count + 1,
          additions: state.additions + commit.additions,
          deletions: state.deletions + commit.deletions,
          authors: state.authors.set(action.key, { ...update }),
        }
      }

      return {
        ...state,
        count: state.count + 1,
        additions: state.additions + commit.additions,
        deletions: state.deletions + commit.deletions,
        authors: state.authors.set(action.key, {
          ...action.value,
          commits: 0,
        }),
      }

    case 'reset':
      return initialState

    default:
      return state
  }
}

function App() {
  const [totalCommits, setTotalCommits] = useState(0)
  const [commitList, dispatchCommitList] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    fetchGraphQL(
      `query getAllCommits {
        repository(name: "linux", owner: "torvalds") {
          object(expression: "master") {
            ...on Commit {
              history(since: "2020-01-01T00:00:00Z") {
                totalCount
                pageInfo {
                  endCursor
                  hasNextPage
                }
                nodes {
                  additions
                  deletions
                  author {
                    name
                    user {
                      id
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      {}
    ).then(({ data }) => {
      const {
        nodes,
        pageInfo,
        totalCount,
      } = data.repository.object.history
      setTotalCommits(totalCount)
      dispatchCommitList({ type: 'new-request' })
      updateData(nodes)
      loopRequest(pageInfo.endCursor, 1)
    })

    const updateData = (nodes: any) => {
      for (const node of nodes) {
        if (!node.author.user) {
          const { name } = node.author
          dispatchCommitList({
            key: name,
            type: 'increment',
            value: {
              ...node,
              login: node.author.name,
            },
          })
        } else {
          const { id } = node.author.user
          dispatchCommitList({
            key: id,
            type: 'increment',
            value: {
              ...node,
              login: node.author.user.login,
            },
          })
        }
      }
    }

    const loopRequest = async (
      nextPage: string,
      counter: number
    ): Promise<void> => {
      const { data } = await fetchGraphQL(
        `
          query getAllCommitsPages ($nextPage: String) {
            repository(name: "linux", owner: "torvalds") {
              object(expression: "master") {
                ...on Commit {
                  history(since: "2020-01-01T00:00:00Z", after: $nextPage) {
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                    nodes {
                      additions
                      deletions
                      author {
                          name
                          user {
                            id
                            login
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        { nextPage }
      )

      const { nodes, pageInfo } = data.repository.object.history
      updateData(nodes)
      dispatchCommitList({ type: 'new-request' })
      if (pageInfo.hasNextPage && counter < 2) {
        loopRequest(pageInfo.endCursor, counter + 1)
      }
    }
  }, [])

  return (
    <div className="App">
      <p className="slogan">
        Transforming data in to <strong>knowledge</strong> and
        <strong> business strategy</strong>!
      </p>

      <h4>Expected requests: {Math.ceil(totalCommits / 100)}</h4>
      <h4>Expected total commits: {totalCommits}</h4>
      <h4>Request counter: {commitList.request}</h4>
      <h4>Commits: {commitList.count}</h4>
      <h4>Commit authors: {commitList.authors.size}</h4>
      <h4>Total add lines +: {commitList.additions}</h4>
      <h4>Total rmv lines -: {commitList.deletions}</h4>
      <div>
        {Array.from(commitList.authors.keys()).map((key) => (
          <p key={Math.random() * 10}>{key}</p>
        ))}
      </div>
    </div>
  )
}

export default App
