const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos)
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/bears', async (req, res) => {
  try {
    const bear = await db('bears');
    res.status(200).json(bear)
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  // get the roles from the database
  try {
    const zoo = await db('zoos')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/bears/:id', async (req, res) => {
  // get the roles from the database
  try {
    const bear = await db('bears')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(bear);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  '19' : 'another record with that value exists'
}

//Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post //Post 
server.post('/api/zoos', async (req, res) => {
  try {
    const [id] = await db('zoos').insert(req.body);

    const zoo = await db('zoos')
      .where({ id })
      .first();

    res.status(201).json(zoo);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

server.post('/api/bears', async (req, res) => {
  try {
    const [id] = await db('bears').insert(req.body);

    const bear = await db('bears')
      .where({ id })
      .first();

    res.status(201).json(bear);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

// Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update 
server.put('/api/zoos/:id', async (req, res) => {
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const zoo = await db('zoos')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

server.put('/api/bears/:id', async (req, res) => {
  try {
    const count = await db('bears')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const bear = await db('bears')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(bear);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete 

server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

server.delete('/api/bears/:id', async (req, res) => {
  try {
    const count = await db('bears')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
