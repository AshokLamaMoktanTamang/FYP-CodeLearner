// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

// importing components
import BarChart from '../../components/barChart'
import Page from '../../components/page'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseBarData } from '../../slice/courseSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'

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

      & > button, & > a{
        height: 3rem;
        width: 3rem;
        background-color: var(--background-black);
        border-radius: 50%;
        border-none;
        outline: none;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;

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
    max-width: 90%;
    height: auto;
    overflow: hidden;
    color: white;
  }
`

export default function TeacherDashboard() {
  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // chart values
  const [chartHeight, setchartHeight] = useState(0);
  const courseData = useSelector((state) => state.course.courseChartData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseBarData())
        .unwrap()
        .catch((err) => {
          setmessage('Failed to fetch course.')
          if (err.status) {
            setmessage('Poor Internet or Too Many Request')
          }
          setopen(true)
          setshowLoading(false)
        })
      setshowLoading(false)
  }, [dispatch]);

  const growthData = {
    labels: courseData.map((el) => el.course),
    datasets: [
      {
        label: 'Total Student',
        data: courseData.map((el) => el.students),
        backgroundColor: '#45484e',
        borderWidth: 1,
        barThickness: 50,
        maxBarThickness: 50,
        borderRadius: 5,
      },
    ],
  }

  useEffect(() => {
    if(courseData && courseData.length > 5){
      setchartHeight(courseData.length * 70)
      return
    }
    setchartHeight(350)
  }, [courseData]);

  // user detail
  const user = useSelector((state) => state.user.user)
  const [userName, setuserName] = useState('');

  useEffect(() => {
    if(user && user.data){
      const name = user.data.firstName + ' ' + user.data.lastName
      setuserName(name)
    }
  }, [user]);

  return (
    <Page title={userName}>
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />
      {showLoading && <Loading />}
      <Dashboard>
        <header>
          <h2>Welcome {userName}!</h2>

          <div>
            <Link to={'addCourse'}>
              <Icon icon="material-symbols:library-add-outline-rounded" />
            </Link>
            <button>
              <Icon icon="zondicons:notification" />
            </button>
          </div>
        </header>

        <div style={{height: `${chartHeight}px`}}>
          <BarChart data={growthData} length={courseData.length} />
        </div>
      </Dashboard>
    </Page>
  )
}
