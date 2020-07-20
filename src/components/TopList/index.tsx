import React from 'react'

import './styles.css'

const TopList = () => {
  return (
    <div className="top-list-container">
      <h2 className="top-list-title">
        Top 10 commiters with more line add
      </h2>
      <div className="top-list">
        <div className="list-titles">
          <p>User</p>
          <p>Lines</p>
        </div>

        <div className="list-user">
          <p className="name">Belgium Dev</p>
          <p className="amount">753,951</p>
        </div>

        <div className="list-user">
          <p className="name">Belgium Dev</p>
          <p className="amount">753,951</p>
        </div>

        <div className="list-user">
          <p className="name">Belgium Dev</p>
          <p className="amount">753,951</p>
        </div>

        <div className="list-user">
          <p className="name">Belgium Dev</p>
          <p className="amount">753,951</p>
        </div>

        <div className="list-user">
          <p className="name">Belgium Dev</p>
          <p className="amount">753,951</p>
        </div>
      </div>
    </div>
  )
}

export default TopList
