const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Trapper Keeper';
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

app.use(express.json());

app.get('/', (request, response) => {
  return response.status(200).json(app.locals.notes);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
});