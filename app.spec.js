const request = require ('supertest');
const polyfill = require('@babel/polyfill');
const app = require('./app');

describe('API', () => {
  describe('GET/api/v1/notes', () => {
    let notes;

    beforeEach(() => {
      notes = [ 
        { title: 'Note', list: [], id: 1 },
        { title: 'Another note', list: [], id: 2}
      ];
      app.locals.notes = notes;
    });

    it('should return a status code of 200', async () => {
      const response = await request(app).get('/api/v1/notes');
      const expected = 200;

      expect(response.statusCode).toBe(expected);
    });

    it('should return an array of all notes', async () => {
      const response = await request(app).get('/api/v1/notes');
      const expected = (notes);

      expect(response.body).toEqual(expected);
    });
  });

  describe('GET/api/v1/notes/:id', () => {

   beforeEach(() => {
      notes = [ 
        { title: 'Note', list: [], id: 1 },
        { title: 'Another note', list: [], id: 2}
      ];
      app.locals.notes = notes;
    });

     it('should return status 200', async () => {
        const response = await request(app).get('/api/v1/notes/1');
        const expected = 200;

        expect(response.statusCode).toBe(expected);
     });

     it('should return the note with the matching id', async () => {
        const response = await request(app).get('/api/v1/notes/1');
        const expected = { title: 'Note', list: [], id: 1};

        expect(response.body).toEqual(expected);
     });

     it('should return status 404 if not matching note is found', async () => {
         const response = await request(app).get('/api/v1/notes/6');
         const expected = 404;

        expect(response.statusCode).toBe(expected);
     });

     it('should return an error message', async () => {
      const response = await request(app).get('/api/v1/notes/12');
      const expected = 'Note not found';

      expect(response.body).toEqual(expected);
    });
  });

  describe('POST/api/v1/notes', () => {
    let notes;
    let newNote;

    beforeEach(() => {
      notes = [ 
        { title: 'Note', list: [], id: 1 },
        { title: 'Another note', list: [], id: 2}
      ];
      app.locals.notes = notes;
    })

    it('should respond with status 201', async () => {
      newNote = { 
        id: 3,
        title: 'Another new note', 
        list: [],
      };

      expect(app.locals.notes.length).toEqual(2);
      const response = await request(app).post('/api/v1/notes').send(newNote);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newNote);
      expect(app.locals.notes.length).toEqual(3);
     });

    it('should respond with status 422 if wrong', async () => {
      newNote = {};
      Date.now = jest.fn().mockImplementation(() => 3);
      expect(app.locals.notes.length).toEqual(2);
      const response = await request(app).post('/api/v1/notes').send(newNote);

      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual('Please provide title and at least one list item');
      expect(app.locals.notes.length).toEqual(2);
     });
  });

  describe('DELETE/api/v1/notes', () => {
    let notes;

    beforeEach(() => {
      notes = [ 
        { title: 'Note', list: [], id: 1 },
        { title: 'Another note', list: [], id: 2}
      ]
      app.locals.notes = notes
    })
    it('should return 204 if delete was accepted', async () => {
      const response = await request(app).delete('/api/v1/notes/1');
      expect(response.statusCode).toBe(204)
    })
    it('should return 404 if delete was not accepted', async () => {
      const response = await request(app).delete('/api/v1/notes/12');
      expect(response.statusCode).toBe(404)
    })
  })

  describe('PUT /api/v1/notes', () => {
    let notes;
    let updateNote;

    beforeEach(() => {
      notes = [ 
        { title: 'Note', list: [], id: 1 },
        { title: 'Another note', list: [], id: 2}
      ];
      app.locals.notes = notes;
    });

    it('Should responed with status 204', async () => {
      updateNote = {title: 'Update note', list: [], id: 1};
      const response = await request(app).put('/api/v1/notes/1').send(updateNote);

      expect(response.statusCode).toBe(204);
      expect(app.locals.notes.length).toEqual(2);
    });
    
    it('Should responed with status 422 if update invalid', async () => {
      updateNote = {};
      const response = await request(app).put('/api/v1/notes/1').send(updateNote);

      expect(response.statusCode).toBe(422);
      expect(app.locals.notes.length).toEqual(2);
    });

    it('Should responed with status 404', async () => {
      updateNote = {title: 'Update note', list: [], id: 6};
      const response = await request(app).put('/api/v1/notes').send(updateNote);

      expect(response.statusCode).toBe(404);
      expect(app.locals.notes.length).toEqual(2);
    });
  });
});

