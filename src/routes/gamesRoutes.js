const express = require('express');
const router = express.Router();
const controller = require('../controllers/gamesController')

router.get('/games', controller.getGames)

router.post('/games', controller.addGame)

router.get('/games/:id', controller.getGameById)

router.put('/games/:id', controller.updateGame)

router.delete('/games/:id', controller.deleteGame)

module.exports = router;
