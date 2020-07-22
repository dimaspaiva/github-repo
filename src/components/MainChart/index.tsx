import React from 'react'

import './styles.css'

import { Author } from '../../pages/Home'

interface MainChartProps {
  topCommits: Author[]
  pushedDate?: string
}

const MainChart: React.FC<MainChartProps> = ({
  topCommits,
  pushedDate,
}) => {
  const temporaryUsers = () => {
    const fakeUsers = []
    for (let i = 0; i < 5; i++) {
      fakeUsers.push(
        <div className="photo">
          <img
            src={
              'https://image.flaticon.com/icons/png/512/1183/1183672.png'
            }
            alt="user"
            className="user-img"
          />
        </div>
      )
    }

    return fakeUsers
  }

  const temporaryBars = () => {
    const fakeBars = []

    for (let i = 0; i++; i < 5) {
      fakeBars.push(
        <div className="bar">
          <div
            className="bar-visual"
            style={{
              width: '2em',
              transition: '0.3s ease',
            }}
          />
          <p className="commit-amount">0 | loading...</p>
        </div>
      )
    }

    return fakeBars
  }

  return (
    <section className="chart-container">
      <h3 className="chart-title">
        Linux open source top contributors with more commits
        <label className="chart-title-date"> (since {pushedDate})</label>
      </h3>
      <div className="chart">
        <div className="users">
          {topCommits[0]?.commits
            ? topCommits.map((commit) => (
                <div className="photo">
                  <img
                    src={
                      commit?.avatarUrl ||
                      'https://image.flaticon.com/icons/png/512/1183/1183672.png'
                    }
                    alt="user"
                    className="user-img"
                  />
                </div>
              ))
            : temporaryUsers()}
        </div>

        <div className="bars-container">
          {topCommits[0]
            ? topCommits?.map((commit) => (
                <div className="bar">
                  <div
                    className="bar-visual"
                    style={{
                      width: topCommits[0]?.commits
                        ? `${
                            60 *
                            (commit.commits /
                              (topCommits[0].commits +
                                topCommits[1].commits))
                          }em`
                        : '0.5em',
                      transition: '0.3s ease',
                    }}
                  />
                  <p className="commit-amount">
                    {commit.commits || 0} | {commit.login}
                  </p>
                </div>
              ))
            : temporaryBars()}
        </div>
      </div>

      <div className="chart-link-container">
        <p className="chart-link">See top 100 ranking</p>
      </div>
    </section>
  )
}

export default MainChart
