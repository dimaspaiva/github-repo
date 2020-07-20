import React from 'react'

import './styles.css'

interface Author {
  additions: number
  deletions: number
  commits: number
  login?: string
}

interface RequestsProps {
  totalCommits: number
  request: number
  count: number
  additions: number
  deletions: number
  authors: Map<string, Author>
}

const Requests: React.FC<RequestsProps> = ({
  totalCommits,
  request,
  count,
  authors,
  additions,
  deletions,
}) => {
  return (
    <section className="request-container">
      <p>
        Expected requests: <strong>{Math.ceil(totalCommits / 100)}</strong>
      </p>
      <p>
        Expected total commits: <strong>{totalCommits}</strong>
      </p>
      <p>
        Request counter: <strong>{request}</strong>
      </p>
      <p>
        Commits: <strong>{count}</strong>
      </p>
      <p>
        Commit authors: <strong>{authors.size}</strong>
      </p>
      <p>
        Total add lines +: <strong>{additions}</strong>
      </p>
      <p>
        Total rmv lines -: <strong>{deletions}</strong>
      </p>
    </section>
  )
}

export default Requests
