import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Filters from '../Filters'
import Header from '../Header'
import JobItem from '../JobItem'
import Profile from '../Profile'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobStatus: apiStatus.initial,
    jobsList: [],
    searchInput: '',

    activeEmployee: '',
    activeSalary: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onSuccessJobs = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-details-container">
        {jobsList[0].map(each => (
          <JobItem jobItem={each} key={each.id} />
        ))}
      </div>
    )
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobDetails)
  }

  onEmployee = id => {
    this.setState({activeEmployee: id}, this.getJobDetails)
  }

  onSalary = id => {
    this.setState({activeSalary: id}, this.getJobDetails)
  }

  onFailureJobs = () => {
    const onRetryClick = () => {
      this.getJobDetails()
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>OOPS!Something went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" onClick={onRetryClick}>
          Retry
        </button>
      </div>
    )
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployee, activeSalary, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployee}&minimum_package=${activeSalary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetched = data.jobs
    const jobsData = fetched.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    if (response.ok === true) {
      this.setState(prevState => ({
        jobStatus: apiStatus.success,
        jobsList: [...prevState.jobsList, jobsData],
      }))
    } else {
      this.setState({jobStatus: apiStatus.failure})
    }
  }

  renderJobs = () => {
    const {jobStatus, searchInput} = this.state
    console.log(searchInput)
    switch (jobStatus) {
      case apiStatus.success:
        return this.onSuccessJobs()
      case apiStatus.failure:
        return this.onFailureJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="jobs-container">
          <Header />
          <div className="profile-jobs">
            <div>
              <Profile />
              <hr />
              <Filters onEmployee={this.onEmployee} onSalary={this.onSalary} />
            </div>
            <div className="job-details-container">
              <div>
                <input
                  type="search"
                  className="inputEl"
                  onChange={this.onSearchInput}
                />
                <BsSearch className="search-icon" />
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobDetails
