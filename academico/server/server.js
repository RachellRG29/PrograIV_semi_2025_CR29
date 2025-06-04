// server.js - Versión ES Module compatible con Express, MongoDB y Socket.IO

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Variables base
const app = express();
const port = 3000;
const urlMongo = 'mongodb://localhost:27017';
const client = new MongoClient(urlMongo);
const dbName = 'db_amigos';

// Para obtener __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear servidor HTTP y conectar Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: ["http://localhost:3000", "http://127.0.1:3000/", "http://localhost:3000/"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Sirve archivos como index.html desde la misma carpeta

// Socket.IO
io.on('connection', (socket) => {
  console.log('Chat conectado');

  socket.on('mensajeAmigo', async (mensaje) => {
    const db = await conectarMongoDb();
    const collection = db.collection('chats');
    await collection.insertOne({ mensaje: mensaje, fecha: new Date() });

    io.emit('mensajeAmigo', mensaje); // Envía a todos (incluyéndome)
  });
});

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/historial_chat', async (req, res) => {
  const db = await conectarMongoDb();
  const collection = db.collection('chats');
  const chats = await collection.find().sort({ fecha: 1 }).toArray();
  res.send(chats);
});

app.post('/api/amigos', async (req, res) => {
  const amigo = req.body;
  const db = await conectarMongoDb();
  const collection = db.collection('amigos');
  const result = await collection.insertOne(amigo);
  res.send({ msg: result });
});

app.put('/api/amigos', async (req, res) => {
  const amigo = req.body;
  const db = await conectarMongoDb();
  const collection = db.collection('amigos');
  const result = await collection.updateOne(
    { _id: new ObjectId(amigo.id) },
    { $set: amigo }
  );
  res.send({ msg: result });
});

app.get('/api/amigos', async (req, res) => {
  const buscar = req.query.buscar || '';
  const db = await conectarMongoDb();
  const collection = db.collection('amigos');
  const amigos = await collection.find({
    $or: [
      { nombre: { $regex: new RegExp(buscar, 'i') } },
      { telefono: { $regex: new RegExp(buscar, 'i') } },
      { email: { $regex: new RegExp(buscar, 'i') } },
    ],
  }).limit(5).toArray();
  res.send(amigos);
});

app.delete('/api/amigos/:id', async (req, res) => {
  const id = req.params.id;
  const db = await conectarMongoDb();
  const collection = db.collection('amigos');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send({ msg: result });
});

// Iniciar servidor
httpServer.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Conexión a MongoDB
async function conectarMongoDb() {
  await client.connect();
  return client.db(dbName);
}
