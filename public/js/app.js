//const response  = require("express")

console.log('Client-side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
let search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

//message1.textContent = 'Response'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() 
    // console.log('Testing - form submitted.')
    let address = search.value
    // console.log(address)
    const url = '/weather?address=' + address
    // console.log(url)
    // console.log('http://localhost:3000/weather?address=kolkata')
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''
    fetch(url).then( (response) => {
    response.json().then( (data)=>{
        // console.log(data)
        if(data.error){
            console.log('Error : ' + data.error)
            message1.textContent = 'Error : ' + data.error
        }else if(data.errorMessage){
            message1.textContent = 'Error : ' + data.errorMessage
        }
        else{
            console.log('Temparature: '+ data.Temparature)
            message1.textContent = 'Temparature: '+ data.Temparature
            console.log('Rain Precipitation: '+ data.Rain_Precipitation)
            message2.textContent = 'Rain Precipitation: '+ data.Rain_Precipitation
            console.log('Location: ' + data.Address)
            message3.textContent = 'Location: ' + data.Address
        }
    })
})
})