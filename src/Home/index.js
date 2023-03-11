import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="description-container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs,salary information,company{' '}
          <br />
          reviews.Find the job that fits your ability and potential
        </p>
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </div>
    </div>
  </>
)

export default Home
