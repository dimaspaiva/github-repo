import React from 'react'

import './styles.css'

const MainChart = () => {
  return (
    <section className="chart-container">
      <h3 className="chart-title">
        Linux open source top contributors with more commits
      </h3>
      <div className="chart">
        <div className="users">
          <div className="photo">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644_960_720.jpg"
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644_960_720.jpg"
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644_960_720.jpg"
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644_960_720.jpg"
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644_960_720.jpg"
              alt="user"
              className="user-img"
            />
          </div>
        </div>
        <div className="bars-container">
          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: `${Math.random() * 50}em`,
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {(456839 * Math.random()).toFixed(0)}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: `${Math.random() * 50}em`,
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {(456839 * Math.random()).toFixed(0)}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: `${Math.random() * 50}em`,
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {(456839 * Math.random()).toFixed(0)}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: `${Math.random() * 50}em`,
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {(456839 * Math.random()).toFixed(0)}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: `${Math.random() * 50}em`,
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {(456839 * Math.random()).toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      <div className="chart-link-container">
        <p className="chart-link">See top 100 ranking</p>
      </div>
    </section>
  )
}

export default MainChart
