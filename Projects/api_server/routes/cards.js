const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileOperations');
const { authenticateToken } = require('./middleware');

router.get('/', async (req, res) => {
  const { set, type, rarity } = req.query;
  const cards = await readFile('./data/cards.json');

  const filteredCards = cards.filter(card => {
    return (!set || card.set === set) &&
           (!type || card.type === type) &&
           (!rarity || card.rarity === rarity);
  });

  res.json(filteredCards);
});

router.post('/create', authenticateToken, async (req, res) => {
  const newCard = req.body;
  const cards = await readFile('./data/cards.json');

  if (cards.some(card => card.cardId === newCard.cardId)) {
    return res.status(400).json({ errorMessage: 'CardId must be unique' });
  }

  cards.push(newCard);
  await writeFile('./data/cards.json', cards);

  res.json({ successMessage: 'Card created successfully', card: newCard });
});

router.put('/:id', authenticateToken, async (req, res) => {
  const cardId = req.params.id;
  const updatedCard = req.body;
  const cards = await readFile('./data/cards.json');

  const cardIndex = cards.findIndex(card => card.cardId === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: 'Card not found' });
  }

  cards[cardIndex] = { ...cards[cardIndex], ...updatedCard };

  if (cards.some((card, index) => card.cardId === updatedCard.cardId && index !== cardIndex)) {
    return res.status(400).json({ errorMessage: 'CardId must be unique' });
  }

  await writeFile('./data/cards.json', cards);
  res.json({ successMessage: 'Card updated successfully', card: cards[cardIndex] });
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const cardId = req.params.id;
  const cards = await readFile('./data/cards.json');

  const cardIndex = cards.findIndex(card => card.cardId === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ errorMessage: 'Card not found' });
  }

  const deletedCard = cards.splice(cardIndex, 1);
  await writeFile('./data/cards.json', cards);

  res.json({ successMessage: 'Card deleted successfully', card: deletedCard[0] });
});

module.exports = router;