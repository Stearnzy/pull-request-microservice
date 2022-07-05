import Express from 'express';
import Path from 'path';
import Dotenv from 'dotenv';

Dotenv.config({ path: Path.resolve(process.cwd(), '.env') });

const app = Express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the GitHub pull request microservice!')
});

if(process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`SERVER RUNNING: PORT ${PORT}`));
}

export default app;
