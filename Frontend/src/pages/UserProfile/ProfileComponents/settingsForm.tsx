import React from 'react';


class SettingsForm extends React.Component {
  state = {
    Username: "",
    Bio: ""
  }
  handleUserNameChange = (event:any) => {
    this.setState({
      Username: event.target.value
    })
  }

//   handleBioChange = (event:any) => {
//     this.setState({
//       Bio: event.target.value
//     })
//   }

  handleSubmit = (event:any) => {
    event.preventDefault()
    let formData = { Username: this.state.Username }
     currentUser(formData)
    console.log(formData.Username)
  }
  
  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
          <label>Change Your Username</label>
        <input type="text" name ="Username" id="Username"onChange={event => this.handleUserNameChange(event)} value={this.state.Username} />
        {/* <input type="text" onChange={event => this.handleBioChange(event)} value={this.state.Bio} /> */}
        <input type="submit"></input>
      </form>
    )
  }
}

export default SettingsForm;