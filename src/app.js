const path = require('path')
const express = require('express')
const hbs = require('hbs')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()
const  publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')
const port = process.env.PORT || 3000

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title:'Hello Express!! Welcome to the world of JS at Backend :)', 
        author:'Tridib',
        details:'Fetched from a HBS(Handlebars for Express) file'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!! Welcome to the world of JS at Backend :) </h1>')
// })

app.get('/help', (req,res) => {
//     res.send({
//         Name: 'Tridib',
//         Phone: 1234567890
//     })
        res.render('help', {
           title:'Express4.17.1     Help Section',
           author:'Tridib',
           details:'Fetched from a HBS(Handlebars for Express) file'
        })
})

 app.get('/about', (req,res) => {
//     res.send('<h1></h1>')
       res.render('about', {
           title:'Express4.17.1     Fast, unopinionated, minimalist web framework for Node.js',
           author:'Tridib',
           details:'Fetched from a HBS(Handlebars for Express) file'
       })
 })

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Please provide an address for the weather forecast'
        })
    }
    geoCode(req.query.address, (error, {place, Longitude, Latitude} = {}) => {

        if(error){
            return res.send({
                errorMessage:error
            })
        }
        //console.log('Error : ' + error )
        //console.log(place)
        forecast(place, Longitude, Latitude, (error, data) => {
            if(error){
                return res.send({
                    errorMessage:error
                })
            }
            // console.log('Error : ', error)
            console.log('Data : ', data)
            res.send({
                Temparature:data.Temparature,
                Rain_Precipitation : data.precipitation,
                Address: data.Address,
                Feels_like:data.feels_like,
                Wind_speed:data.wind_speed
            })
          }) 
    })


    // res.send({
    //     forecast:'Rainy, Heavy rainfall for 2-3 days',
    //     Temparature: 30,
    //     Address: req.query.address
    // })
})

app.get('/product/:qty', (req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'please provide a search value!'
        })
    }

    console.log(req.query)
    console.log(req.params)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    //res.send('help article not found')
    res.render('404', {
        title: '404 - Not Found',
        author: 'Tridib',
        errorMessage: 'Help Article Not Found'  
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404 - Not Found',
        author: 'Tridib',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port:' + port)
})



//app.com
//app.com/help
//app.com/about