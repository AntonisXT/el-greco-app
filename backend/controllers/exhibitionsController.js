const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/exhibitions.json');

const getExhibitions = (req, res) => {
  const exhibitions = JSON.parse(fs.readFileSync(filePath));
  res.json(exhibitions);
};

const addExhibition = (req, res) => {
  const exhibitions = JSON.parse(fs.readFileSync(filePath));
  const newExhibition = { id: Date.now(), ...req.body };
  exhibitions.push(newExhibition);
  fs.writeFileSync(filePath, JSON.stringify(exhibitions));
  res.status(201).json(newExhibition);
};

const updateExhibition = (req, res) => {
  const exhibitions = JSON.parse(fs.readFileSync(filePath));
  const index = exhibitions.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Exhibition not found');
  exhibitions[index] = { ...exhibitions[index], ...req.body };
  fs.writeFileSync(filePath, JSON.stringify(exhibitions));
  res.json(exhibitions[index]);
};

const deleteExhibition = (req, res) => {
  let exhibitions = JSON.parse(fs.readFileSync(filePath));
  exhibitions = exhibitions.filter(e => e.id !== parseInt(req.params.id));
  fs.writeFileSync(filePath, JSON.stringify(exhibitions));
  res.status(204).send();
};

module.exports = { getExhibitions, addExhibition, updateExhibition, deleteExhibition };
