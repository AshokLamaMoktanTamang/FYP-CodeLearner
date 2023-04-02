// importing the react and external libraries
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// importing the react components
import Page from '../../components/page'
import SearchItem from '../../components/searchItem'
import Loading from '../../components/loading'
import { searchCourse } from '../../slice/courseSlice'

// styled components
const SearchWrapper = styled.section`
  .search-heading {
    font-size: 1.1rem;
    color: var(--text-black);
    line-height: 1.5;
    margin-bottom: 1.3rem;
    text-transform: capitalize;
    width: fit-content;
    position: relative;

    ::before {
      position: absolute;
      content: '';
      width: 1.8rem;
      height: 5px;
      border-radius: 10px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
    }
  }

  .search-results-container {
    display: grid;
    grid-gap: 1rem;
  }

  .no-course {
    display: flex;
    height: calc(100vh - 110px);
    min-height: 100px;
    justify-content: center;
    align-items: center;

    & > p {
      display: block;
      padding: 2rem;
      text-align: center;
      background-color: var(--btn-hover-color);
      font-weight: bold;
      border: 1px dashed var(--light-border-color);
      color: var(--dark-scroll-bar);
      line-height: 1.5;
      max-width: 300px;
      border-radius: 0.25rem;
    }
  }
`

export default function Article() {
  const { query } = useParams()

  // for alerts and loading
  const [showLoading, setshowLoading] = useState(false)

  // redux
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    ; (() => {
      setshowLoading(true)
      dispatch(searchCourse(query))
        .unwrap()
        .then(() => {
          setshowLoading(false)
        })
        .catch(() => {
          navigate('/app')
        })
    })()
  }, [dispatch, query, navigate])

  const courses = useSelector((state) => state.course.courses)

  return (
    <Page title={`${query}`}>
      {showLoading && <Loading />}

      <SearchWrapper>
        <h2 className="search-heading">Search - {query} (6 results)</h2>

        <div className="search-results-container">
          {courses && courses.length > 0 ? (
            courses.map((course, index) => {
              return (
                <SearchItem
                  saved={false}
                  courseId={course._id}
                  courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.thumbnail}`}
                  courseName={course.courseName}
                  courseBrief={course.courseDescription}
                  authorName={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                  lastUpdated={course.updatedAt}
                  price={course.price}
                  key={index}
                  totalStudent={100}
                  rating={Math.round(course.avgRating * 10) / 10}
                />
              )
            })
          ) : (
            <div className="no-course">
              <p>No results for "{query}"</p>
            </div>
          )}
        </div>
      </SearchWrapper>
    </Page>
  )
}
