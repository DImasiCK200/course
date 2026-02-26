const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(express.static())
app.use(cors());

morgan.token("body", function getBody(req) {
  const body = JSON.stringify(req.body);

  return body ? body : " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const generateId = () => String(Math.floor(Math.random() * 100000));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  const date = new Date();

  res.send(
    `<h1>Phonebook has info about ${persons.length} persons</h1><p>${date.toString()}</p>`,
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((n) => n.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((n) => n.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: `name or number missing`,
    });
  }

  if (
    persons.some((p) => p.name === body.name) ||
    persons.some((p) => p.number === body.number)
  ) {
    return res.status(409).json({
      error: `entered name or number is already exist`,
    });
  }

  const person = {
    name: String(body.name),
    number: String(body.number),
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
