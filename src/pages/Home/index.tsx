import React, { useEffect, useState, useReducer } from 'react'

import fetchGraphQL from '../../relay-environment'
import Header from '../../components/Header'
import MainChart from '../../components/MainChart'
import TopList from '../../components/TopList'
import Requests from '../../components/Requests'

import './styles.css'
export interface Author {
  additions: number
  deletions: number
  commits: number
  login?: string
  avatarUrl?: string
  pushedDate?: string
}

interface State {
  count: number
  request: number
  additions: number
  deletions: number
  authors: Map<string, Author>
  topCommits: Author[]
  topAdditions: Author[]
  topDeletions: Author[]
  pushedDate?: string
}

const initialState: State = {
  count: 0,
  request: 0,
  additions: 0,
  deletions: 0,
  authors: new Map(),
  topCommits: [],
  topAdditions: [],
  topDeletions: [],
  pushedDate: '',
}

function reducer(
  state: State,
  action: { type: string; key?: string; value?: Author; array?: Author[] }
): State {
  switch (action.type) {
    case 'top-commits':
      if (!action.array) {
        return state
      }
      return { ...state, topCommits: action.array }

    case 'top-additions':
      if (!action.array) {
        return state
      }
      return { ...state, topAdditions: action.array }

    case 'top-deletions':
      if (!action.array) {
        return state
      }
      return { ...state, topDeletions: action.array }

    case 'new-request':
      return { ...state, request: state.request + 1 }

    case 'increment':
      if (!action.key || !action.value) {
        return state
      }

      const author = state.authors.get(action.key)
      const commit = action.value
      let dateFormat = ''

      if (commit.pushedDate) {
        const splittedDate = commit.pushedDate.substr(0, 10).split('-')
        dateFormat = `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`
      } else {
        dateFormat = state.pushedDate || ''
      }

      if (author) {
        const update = {
          additions: author.additions + commit.additions,
          deletions: author.deletions + commit.deletions,
          commits: author.commits + 1,
          login: commit?.login,
          avatarUrl: commit?.avatarUrl,
        }

        return {
          ...state,
          count: state.count + 1,
          additions: state.additions + commit.additions,
          deletions: state.deletions + commit.deletions,
          pushedDate: dateFormat,
          authors: state.authors.set(action.key, { ...update }),
        }
      }

      return {
        ...state,
        count: state.count + 1,
        additions: state.additions + commit.additions,
        deletions: state.deletions + commit.deletions,
        pushedDate: dateFormat,
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

const Home = () => {
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
                  pushedDate
                  additions
                  deletions
                  author {
                    avatarUrl
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
              avatarUrl: node.author.avatarUrl,
            },
          })
        }
      }

      const allUsers = Array.from(commitList.authors.entries()).map(
        (it) => ({
          ...it[1],
        })
      )

      const top100 = topCommits(allUsers)
      const topAdd = topAdditions(allUsers)
      const topDel = topDeletions(allUsers)
      dispatchCommitList({ type: 'top-commits', array: top100 })
      dispatchCommitList({ type: 'top-additions', array: topAdd })
      dispatchCommitList({ type: 'top-deletions', array: topDel })
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
                      pushedDate
                      additions
                      deletions
                      author {
                          name
                          avatarUrl
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
      if (pageInfo.hasNextPage && counter < 100) {
        loopRequest(pageInfo.endCursor, counter + 1)
      }
    }
  }, [commitList.authors])

  const topCommits = (allUsers: Author[]) => {
    return allUsers
      .sort((a, b) => a.commits - b.commits)
      .reverse()
      .slice(0, 100)
  }

  const topAdditions = (allUsers: Author[]) => {
    return allUsers
      .sort((a, b) => a.additions - b.additions)
      .reverse()
      .slice(0, 10)
  }

  const topDeletions = (allUsers: Author[]) => {
    return allUsers
      .sort((a, b) => a.deletions - b.deletions)
      .reverse()
      .slice(0, 10)
  }

  return (
    <div className="App">
      <Header />
      <MainChart
        pushedDate={commitList.pushedDate}
        topCommits={commitList.topCommits.slice(0, 5)}
        top100Commits={commitList.topCommits}
      />

      <section className="slogan-container">
        <p className="slogan">
          Transforming data in to <strong>knowledge</strong> and
          <strong> business strategy</strong>!
        </p>
      </section>

      <section className="lists">
        <TopList
          title="Top 10 commiters with more line add"
          dataType="additions"
          amountColor="#033E05"
          authors={commitList.topAdditions.slice(0, 10)}
        />
        <TopList
          dataType="deletions"
          title="Top 10 commiters with more line removed"
          amountColor="#620717"
          authors={commitList.topDeletions.slice(0, 10)}
        />
      </section>

      <Requests
        additions={commitList.additions}
        deletions={commitList.deletions}
        authors={commitList.authors}
        count={commitList.count}
        request={commitList.request}
        totalCommits={totalCommits}
      />
    </div>
  )
}

export default Home
