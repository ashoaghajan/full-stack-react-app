import React from 'react';
import { Table, Row, Col } from 'reactstrap';

const Weather = ({ data }) => {
    const convertToC = temp => {
        return (temp - 32) * 5/9;
    }

    if(!data){
        return null
    } else {
        const { temp_max, temp_min, temp } = data.main;
        const maxTempC = convertToC(temp_max)
        const minTempC = convertToC(temp_min)
        const tempC = convertToC(temp)

        return (
           <Row className="weather">
               <Col sm='12' md={{ size: 4, offset: 4 }}>
                   <h2>{data.name}</h2>
                   <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='weather icon'/>
                   <span>{data.weather[0].main}</span>&nbsp;
                   <span>{Math.floor(tempC)}&deg;C</span>
                   <Table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>{Math.floor(data.wind.speed)} km/h</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{Math.floor(data.main.pressure)} hPa</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{Math.floor(data.main.humidity)}%</td>
                            </tr>
                            <tr>
                                <td>Min Temp</td>
                                <td>{Math.floor(minTempC)}&deg;C</td>
                            </tr>
                            <tr>
                                <td>Max Temp</td>
                                <td>{Math.floor(maxTempC)}&deg;C</td>
                            </tr>
                        </tbody>
                   </Table>
               </Col>
           </Row> 
        )
    }
}
 
export default Weather;