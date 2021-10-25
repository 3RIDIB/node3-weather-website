const request = require('request');

//request({url:geoCodeUrl, json:true}, (error, response) => {
    //     //console.error(error)
    //     if(error){
    //         console.log(chalk.red.bold('Unable to connect to weather API'))
    //     }else if(response.body.features.length === 0){
    //         console.log('Unable to find location')
    //     }else{
    //         console.log(chalk.yellow.bold.inverse(response.body.features[0].place_name))
    //         console.log('Longitude : ' + chalk.green(response.body.features[0].center[0]))
    //         console.log('Latitude : ' + chalk.green(response.body.features[0].center[1]))
    //     }
        
    // })

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiM3JpZGliIiwiYSI6ImNrdWRzeHBpMzA3bzcydXJ0bmM5cTlnaXMifQ.jfC1v23UoUL7MkKivSOBlA&limit=1'
    request({url:url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather API')
        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to find location!!! Try again later!')
        }
        else{
            const data = {
                place: response.body.features[0].place_name,
                Longitude: response.body.features[0].center[0],
                Latitude: response.body.features[0].center[1]
            }

            callback(undefined, data)
        }
    })
}

module.exports = geoCode