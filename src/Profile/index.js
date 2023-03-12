import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {
    profileStatus: apiStatus.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="profile-container">
        <img src={`${profileImageUrl}`} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderFailureProfile = () => {
    const onClickRetry = () => {
      this.getProfileDetails()
    }
    return (
      <div className="profile-fail">
        <button type="button" className="retry-button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderOutput = () => {
    const {profileStatus} = this.state
    console.log(profileStatus)

    switch (profileStatus) {
      case apiStatus.success:
        return this.renderSuccessProfile()
      case apiStatus.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = data.profile_details
    const updatedData = {
      name: fetchedData.name,
      shortBio: fetchedData.short_bio,
      profileImageUrl: fetchedData.profile_image_url,
    }

    if (response.ok === true) {
      this.setState(
        {
          profileStatus: apiStatus.success,
          profileDetails: updatedData,
        },
        this.renderOutput,
      )
    } else {
      this.setState(
        {profileStatus: apiStatus.failure, profileDetails: ''},
        this.renderOutput,
      )
    }
  }

  render() {
    return <div>{this.renderOutput()}</div>
  }
}

export default Profile
