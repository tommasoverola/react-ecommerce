const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));
const productdb = JSON.parse(fs.readFileSync('./database.json', 'UTF-8')).products;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';
const expiresIn = '20h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in the database
function isAuthenticated({ email, password }) {
  return userdb.users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

// Register New User
server.post('/auth/register', (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password })) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile('./users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    const usersData = JSON.parse(data.toString());
    const lastUserId = usersData.users[usersData.users.length - 1].id;

    usersData.users.push({ id: lastUserId + 1, email, password });
    fs.writeFile('./users.json', JSON.stringify(usersData), (err) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return
      }
    });

    const access_token = createToken({ email, password });
    res.status(200).json({ access_token });
  });
});

// Login Endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!isAuthenticated({ email, password })) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

// Middleware for Authorization, except for GET /products
server.use((req, res, next) => {
  // Allow GET requests to /products without authentication
  if (req.method === 'GET' && req.path === '/products') {
    next();
    return;
  }
  console.log("req", req.headers.authorization.split(' ')[0])
  // All other routes require authentication
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});

// CRUD Operations for Products

// Get All Products with Pagination (Public)
server.get('/products', (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const paginatedProducts = productdb.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
  res.status(200).json(paginatedProducts);
});

// Get Single Product by ID (Protected)
server.get('/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  console.log("hello")
  const product = productdb.find((p) => p.id === productId);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.status(200).json(product);
});

// Create a New Product (Protected)
server.post('/products', (req, res) => {
  const newProduct = req.body;
  const lastProductId = productdb[productdb.length - 1]?.id || 0;
  newProduct.id = lastProductId + 1;
  productdb.push(newProduct);
  fs.writeFileSync('./database.json', JSON.stringify({ products: productdb }, null, 2));
  res.status(201).json(newProduct);
});

// Update Product by ID (Protected)
server.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = productdb.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  productdb[productIndex] = { ...productdb[productIndex], ...req.body };
  fs.writeFileSync('./database.json', JSON.stringify({ products: productdb }, null, 2));
  res.status(200).json(productdb[productIndex]);
});

// Delete Product by ID (Protected)
server.delete('/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = productdb.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  productdb.splice(productIndex, 1);
  fs.writeFileSync('./database.json', JSON.stringify({ products: productdb }, null, 2));
  res.status(204).end();
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server on http://localhost:8000');
});
