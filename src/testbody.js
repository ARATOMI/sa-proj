import React, { useState, useEffect } from 'react'
// import { FaAngleDoubleRight } from 'react-icons/fa'

import { data } from './data'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const [prList, setPrList] = useState(false);

  const fetchJobs = async () => {
    // const response = await fetch(url);
    // const newJobs = await response.json();
    // setJobs(newJobs);
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className='section loading'>
        <h1>loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title, status } = jobs[value];

  if (prList) {
    return (
      <section className='section'>
        <div className='title'>

          <h2>My projects</h2>
          <div className='underline'></div>
        </div>
        <div className='jobs-center'>
          {/* btn container */}

          <div className="btn-container">
            <button
              className={`job-btn`}
            >
              Add
            </button>
            <button
              className={`job-btn`}
            >
              Delete
            </button>
          </div>

          {/* job info */}
          <article className='job-info'>
            <div className='participant'>
              <h3>{title}</h3>
              <h4>{status}</h4>
              <p className='job-date'>{dates}</p>
              {duties.map((duty, index) => {
                return (
                  <div key={index} className='job-desc, participant'>
                    {/* <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight> */}
                    <p>{duty}</p>
                  </div>
                );
              })
              }
              <a className='btn' style={{marginBottom: '10px'}} onClick={() => setPrList(false)}>show</a>
            </div>

          </article>

        </div>
      </section>
    );
  }

  return (
    <section className='section'>
      <div className='title'>
        <button 
        className='btn' 
        style={{ float: 'left', marginBottom: '50px', padding: '0px 0px 0px 0px' }}
        onClick={() => setPrList(true)}> -back</button>
        <h2>Project information</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        {/* btn container */}

        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={job.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && 'active-btn'}`}
              >
                {job.company}
              </button>
            );
          })}
        </div>

        {/* job info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{status}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc, participant'>
                {/* <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight> */}
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App
