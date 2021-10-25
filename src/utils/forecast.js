const request = require('request');

// request({url:weatherForecastUrl, json:true}, (error, response)=> {
//     //console.log(response.body)
//     //console.log(response.statusCode)
//     if(error){
//         console.log(chalk.red.bold('Unable to connect to weather API'))
//     }else if(response.statusCode !== 200){
//         console.log('Unable to find location')
//     }
//     else{
//         //console.log(response.statusCode)
//         //console.log((response.body))
//         console.log('It is currently ' + chalk.red(response.body.current.temp) + ' degrees out. There is a ' + chalk.red(response.body.current.uvi) + ' % chance of rain.')
//     }
   // const data = JSON.parse(response.body)
    //console.log(data)
//})

const forecast = (place,longitude, latitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&exclude=hourly,daily&units=metric&appid=59d630d0a30b97fee84a668431ee7483'

    request({url:url, json:true}, (error, response) => {
            if(error){
                callback('Unable to connect to weather API')
            }else if(response.statusCode !== 200){
                callback('Unable to find location!! Try another Location!!')
            }else{
                const data = 'It is currently ' + response.body.current.temp + ' degrees out. There is a ' + response.body.current.uvi + ' % chance of rain.'
                const data2 = {
                    Temparature: response.body.current.temp,
                    precipitation: response.body.current.uvi,
                    Address: place
                }
                //console.log(data2)
                callback(undefined, data2)
            }
    })
}

module.exports = forecast