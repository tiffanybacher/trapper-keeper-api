const app = require('./app');

app.set('port', 3001);

app.listen(app.get('port'), () => {
  console.log(`Trapper Keeper is running on http://localhost:${app.get('port')}.`)
});