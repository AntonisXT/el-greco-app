const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/links.json');

const getLinks = (req, res) => {
  const links = JSON.parse(fs.readFileSync(filePath));
  res.json(links);
};

const addLink = (req, res) => {
  const links = JSON.parse(fs.readFileSync(filePath));
  const newLink = { id: Date.now(), ...req.body };
  links.push(newLink);
  fs.writeFileSync(filePath, JSON.stringify(links));
  res.status(201).json(newLink);
};

const updateLink = (req, res) => {
  const links = JSON.parse(fs.readFileSync(filePath));
  const index = links.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Link not found');
  links[index] = { ...links[index], ...req.body };
  fs.writeFileSync(filePath, JSON.stringify(links));
  res.json(links[index]);
};

const deleteLink = (req, res) => {
  let links = JSON.parse(fs.readFileSync(filePath));
  links = links.filter(l => l.id !== parseInt(req.params.id));
  fs.writeFileSync(filePath, JSON.stringify(links));
  res.status(204).send();
};

module.exports = { getLinks, addLink, updateLink, deleteLink };
