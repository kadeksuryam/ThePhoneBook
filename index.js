const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people<p>
      <div>${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.find(person => person.id === id)
    if(person) response.json(person)
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => (person.id !== id))
    
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    const isMissing  = (person.name === '') || (person.number === '')
    const isNotUnique = persons.find(p => person.name === p.name)
    if(isMissing){
        response.status(400).json({error : 'name or number is missing'})
    }
    else if(isNotUnique){
        response.status(400).json({error: 'name must be unique'})
    }
    else{
        const newId = Math.floor((Math.random()*1000))
        const newPerson = {...person, id : newId}
        persons = persons.concat(newPerson)
        
        response.json(newPerson)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})