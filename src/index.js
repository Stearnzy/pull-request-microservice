import Express from 'express';
import Path from 'path';
import Dotenv from 'dotenv';
import routes from './routes/pullRequests.routes.js';

Dotenv.config({ path: Path.resolve(process.cwd(), '.env') }); // Added so .env file variables can be used

const app = Express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the GitHub pull request microservice!')
});

if (process.env.NODE_ENV !== 'test') { // This is added so that EADDRINUSE error isn't thrown when running tests
  app.listen(PORT, () => console.log(`SERVER RUNNING: PORT ${PORT}`));
}

// I'm not sure if this is the best place to define my API's base url
app.use('/api/github', routes);

app.use('*', function (req, res, next) {
  res.status(404).send({ error: 'Route not found' });
})

export default app;
