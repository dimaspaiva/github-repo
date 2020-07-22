import React from 'react'

import { Author } from '../../pages/Home'

import './styles.css'

interface TopListProps {
  amountColor: string
  title: string
  dataType: string
  authors: Author[]
}

const TopList: React.FC<TopListProps> = ({
  amountColor,
  title,
  authors,
  dataType,
}) => {
  // workaround to show dynamically
  const showData = (author: Author) => {
    switch (dataType) {
      case 'additions':
        return author.additions

      case 'deletions':
        return author.deletions

      default:
        return 'none'
    }
  }

  return (
    <div className="top-list-container">
      <h2 className="top-list-title">{title}</h2>
      <div className="top-list">
        <div className="list-titles">
          <p>User</p>
          <p>Lines</p>
        </div>

        {authors.map((author, index) => (
          <div className="list-user">
            <p className="name">
              {index + 1} - {author.login}
            </p>
            <p className="amount" style={{ color: amountColor }}>
              {showData(author)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopList
