// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing components
import BarChart from '../components/barChart'
import Page from '../components/page'

// styled component
const Dashboard = styled.section`
  & > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    & > h2 {
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 0.35rem;
    }

    & > div{
      display: grid;
      grid-auto-flow: column;
      grid-gap: 0.7rem;

      & > button{
        height: 3rem;
        width: 3rem;
        background-color: var(--background-black);
        border-radius: 50%;
        border-none;
        outline: none;
        cursor: pointer;
        border: none;

        :hover{
          & > svg{
            color: var(--teacher-white);
          }
        }
        
        & > svg{
          font-size: 1.3rem;
          color: var(--text-light-black);
        }
      }
    }
  }

  & > div {
    width: 95vw;
    max-width: 500px;
    overflow: hidden;
    color: white;
  }
`

export default function TeacherDashboard() {
  const user = 'Ashok Lama'
  const courseData = [
    { name: 'Python', students: 400 },
    { name: 'Java', students: 700 },
    { name: 'JS', students: 200 },
    { name: 'React', students: 1000 },
  ]

  const growthData = {
    labels: courseData.map((el) => el.name),
    datasets: [
      {
        label: 'Total Student',
        data: courseData.map((el) => el.students),
        backgroundColor: '#45484e',
        borderWidth: 1,
        barThickness: 30,
        maxBarThickness: 30,
        borderRadius: 5,
        color: 'green',
      },
    ],
  }

  return (
    <Page title={user}>
      <Dashboard>
        <header>
          <h2>Welcome! {user}</h2>

          <div>
            <button>
              <Icon icon="material-symbols:library-add-outline-rounded" />
            </button>
            <button>
              <Icon icon="zondicons:notification" />
            </button>
          </div>
        </header>

        <div>
          <BarChart data={growthData} length={courseData.length} />
        </div>
      </Dashboard>
    </Page>
  )
}
