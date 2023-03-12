import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  const renderJobItem = () => (
    <div className="job-card">
      <div className="logo-container">
        <img src={`${companyLogoUrl}`} alt="logo" className="logo" />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="para">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-location">
        <div className="location-type">
          <div className="rating-container">
            <GoLocation className="location" />
            <p className="para">{location}</p>
          </div>
          <div className="rating-container">
            <BsFillBriefcaseFill className="location" />
            <p className="para">{employmentType}</p>
          </div>
        </div>
        <p className="para">{packagePerAnnum}</p>
      </div>
      <hr />
      <h1 className="heading">Description</h1>
      <p className="description">{jobDescription}</p>
    </div>
  )

  return (
    <div className="job-card">
      <div className="logo-container">
        <img src={`${companyLogoUrl}`} alt="logo" className="logo" />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="para">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-location">
        <div className="location-type">
          <div className="rating-container">
            <GoLocation className="location" />
            <p className="para">{location}</p>
          </div>
          <div className="rating-container">
            <BsFillBriefcaseFill className="location" />
            <p className="para">{employmentType}</p>
          </div>
        </div>
        <p className="para">{packagePerAnnum}</p>
      </div>
      <hr />
      <h1 className="heading">Description</h1>
      <p className="description">{jobDescription}</p>
    </div>
  )
}

export default JobItem
