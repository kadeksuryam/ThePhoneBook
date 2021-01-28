require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
/*  
let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "a",
        "number": "1",
        "id": 5
      }
]
 */
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(result => {
        const cntPeople = result.length
        response.send(`<p>Phonebook has info for ${cntPeople} people<p>
                        <div>${new Date()}</div>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)

    Person.findById(request.params.id).then(person => {
        if(person) response.json(person)
        else response.status(404).end()
    }).catch(error => next(error))
    /*
    person = persons.find(person => person.id === id)
    if(person) response.json(person)
    else response.status(404).end() */
})


app.delete('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)
    Person.findByIdAndDelete(request.params.id).then(result =>{
        response.status(204).end()
    }).catch(error => next(error))
    /*
    persons = persons.filter(person => (person.id !== id))
    
    response.status(204).end() */
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    const newPerson = new Person({
        name : person.name,
        number : person.number
    })

    newPerson.save().then(result => {
        response.json(result)
    }).catch(error => next(error))    


    /*
    const isMissing  = (person.name === '') || (person.number === '')
    Person.find({'name' : person.name}).then(result => {
        isNotUnique = result.length
        if(isNotUnique) response.status(400).json({error: 'name must be unique'})
        else if(isMissing) response.status(400).json({error : 'name or number is missing'})
        else{

        }
    }).catch(error => next(error))
    /*
    //persons.find(p => person.name === p.name)
    if(isMissing){
        
    }
    else{
        /*
        const newId = Math.floor((Math.random()*1000))
        const newPerson = {...person, id : newId}
        persons = persons.concat(newPerson)
        
        response.json(newPerson) 
        const newPerson = new Person({
            name : person.name,
            number : person.number
        })

        newPerson.save().then(result => {
            response.json(result)
        })
    } */
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
    //const opts = { runValidators: true };
    /*
    Person.findByIdAndUpdate(request.params.id, person, {new : true}).then(updatedPerson =>{
        response.json(updatedPerson)
    }).catch(error => next(error)) */
    Person.findByIdAndUpdate(request.params.id, {name, number},
         {runValidators : true, new : true, context: 'query'}).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
  // handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if(error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
    }
    next(error)
  }
  
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})