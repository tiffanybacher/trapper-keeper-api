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
        id: 22
      }
    ],
    id: 11
  },
  { 
    title: 'This is another note', 
    list: [
      { 
        item: 'Create another note',
        completed: false,
        id: 23
      }
    ],
    id: 12
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

app.get('/api/v1/notes/:id', (request, response) => {
  const note = app.locals.notes.find(note => note.id == request.params.id);

  if (!note) {
    return response.status(404).json('Note not found');
  } else {
    return response.status(200).json(note);
  }
});

app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);

  if (noteIndex === -1) {
    return response.status(404).json('Note not found');
  } else {
    app.locals.notes.splice(noteIndex, 1);

    return response.sendStatus(204);
  }
});

module.exports = app;