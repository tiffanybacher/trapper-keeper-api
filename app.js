const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

app.locals.notes = [
  { 
    title: 'This is a note', 
    list: [
      { 
        item: 'Create a new note',
        completed: false,
        id: 2222222222222 
      }
    ],
    id: 1111111111111
  }
]

app.get('/api/v1/notes', (request, response) => {
  return response.status(200).json(app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  const { title, list } = request.body;

  if (!title || !list) {
    return response.status(422).json('Please provide title and at least one list item');
  }

  const newNote = request.body;

  app.locals.notes.push(newNote);
  response.status(201).json(newNote);
});

module.exports = app;