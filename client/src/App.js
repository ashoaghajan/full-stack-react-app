import React, { Component } from 'react';
import { Container, Navbar, NavbarBrand, Input, InputGroupAddon,
  Row, Col, Jumbotron, InputGroup, Button, FormGroup } from 'reactstrap';
import Weather from './Weather';

class App extends Component {
  state = {
    weather: '',
    cityList: [],
    newCityName: ''
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      const cityList = res.map(row => row.city_name);
      this.setState({ cityList })
    })
  }

  handleInputChange = (e) => {
    this.setState({
      newCityName: e.target.value
    })
  }

  cityNameExists = cityName => {
    return this.state.cityList.find(city => city.toLowerCase() === cityName.toLowerCase());
  }

  handeAddCity = () => {
    if(this.state.newCityName && !this.cityNameExists(this.state.newCityName)){
      fetch('/api/cities', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: this.state.newCityName })
      })
      .then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ newCityName: '' });
      })
    }
  }

  getWeather = city => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      this.setState({ weather })
    })
    .then(() => console.log(this.state.cityList))
  }

  handleChangeCity = (e) => { 
    if(e.target.value){
      this.getWeather(e.target.value)
    }
  }

  componentDidMount () {
    this.getCityList();
  }

  render(){
    return (
      <Container fluid className='centered'>
        <Navbar dark color='dark'>
          <NavbarBrand href='/'>MyWeather</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron> 
              <h1 className="display-3">My Weather</h1>
              <p className="lead">The current weather for your favorite cities!</p>
              <InputGroup>
                <Input 
                placeholder='New city name'
                value={this.state.newCityName}
                onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType='append'>
                  <Button color='primary' onClick={this.handeAddCity}>Add City</Button>
                </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type='select' onChange={this.handleChangeCity}>
                { !this.state.cityList.length && <option>No cities added yet.</option> }
                { this.state.cityList.length && <option>Select a city.</option> }
                {  this.state.cityList.map((city, i) =>  <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather}/>
      </Container>
    );
  }
}

export default App;
