import React from 'react'

import './styles.css'

interface Author {
  additions: number
  deletions: number
  commits: number
  login?: string
  avatarUrl?: string
}

interface MainChartProps {
  topCommits: Author[]
}

const MainChart: React.FC<MainChartProps> = ({ topCommits }) => {
  return (
    <section className="chart-container">
      <h3 className="chart-title">
        Linux open source top contributors with more commits
      </h3>
      <div className="chart">
        <div className="users">
          <div className="photo">
            <img
              src={
                topCommits[0]?.avatarUrl ||
                'https://image.flaticon.com/icons/png/512/1183/1183672.png'
              }
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src={
                topCommits[1]?.avatarUrl ||
                'https://image.flaticon.com/icons/png/512/1183/1183672.png'
              }
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src={
                topCommits[2]?.avatarUrl ||
                'https://image.flaticon.com/icons/png/512/1183/1183672.png'
              }
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src={
                topCommits[3]?.avatarUrl ||
                'https://image.flaticon.com/icons/png/512/1183/1183672.png'
              }
              alt="user"
              className="user-img"
            />
          </div>
          <div className="photo">
            <img
              src={
                topCommits[4]?.avatarUrl ||
                'https://image.flaticon.com/icons/png/512/1183/1183672.png'
              }
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
                width: topCommits[0]?.commits
                  ? `${
                      60 *
                      (topCommits[0].commits /
                        (topCommits[0].commits + topCommits[1].commits))
                    }em`
                  : '0.5em',
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {topCommits[0]?.commits || 0} {topCommits[0]?.login}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: topCommits[0]?.commits
                  ? `${
                      60 *
                      (topCommits[1].commits /
                        (topCommits[0].commits + topCommits[1].commits))
                    }em`
                  : '0.5em',
                transition: '0.6s ease',
              }}
            />
            <p className="commit-amount">
              {topCommits[1]?.commits || 0} {topCommits[1]?.login}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: topCommits[0]?.commits
                  ? `${
                      60 *
                      (topCommits[2].commits /
                        (topCommits[0].commits + topCommits[1].commits))
                    }em`
                  : '0.5em',
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {topCommits[2]?.commits || 0} {topCommits[2]?.login}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: topCommits[0]?.commits
                  ? `${
                      60 *
                      (topCommits[3].commits /
                        (topCommits[0].commits + topCommits[1].commits))
                    }em`
                  : '0.5em',
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {topCommits[3]?.commits || 0} {topCommits[3]?.login}
            </p>
          </div>

          <div className="bar">
            <div
              className="bar-visual"
              style={{
                width: topCommits[0]?.commits
                  ? `${
                      60 *
                      (topCommits[4].commits /
                        (topCommits[0].commits + topCommits[1].commits))
                    }em`
                  : '0.5em',
                transition: '0.3s ease',
              }}
            />
            <p className="commit-amount">
              {topCommits[4]?.commits || 0} {topCommits[4]?.login}
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
