//const { gamesCollection } = require('../models/gamesSchema')
const { response } = require('../app')
const gamesTeste = require('../models/gamesSchema')

const getGames =  (req,res) => {
    console.log(req.url)
    gamesTeste.maravilhosaCollection.find((error, games) =>{
        if(error){
            return res.status(500).send(error)
        }else{
            return res.status(200).send(games)
        }
    })
}

//getGameById
const getGameById =  (req,res) => {
   const idParam = req.params.id
   gamesTeste.gamesCollection.findById(idParam, (error, games) =>{
       if(error){
           return res.status(500).send(error)
       }else{
           if(games){
               return res.status(200).send(games)
           }else{
               return res.status(404).send("Game não encontrado ;(")
           }
       }
   })
}

//addGame 
const addGame = (req,res) => {
    console.log(req.url)
    const gamesBody = req.body
    const games = new gamesTeste.gamesCollection(gamesBody)

    games.save((error) =>{
        if(error){
            return res.status(400).send(error)
        }else{
            return res.status(201).send(games)
        }
    })
}


//updateGame 
const updateGame = (req, res) => {
    const idParam = req.params.id
    const gamesBody = req.body
    const novo = {new: true}

    gamesTeste.gamesCollection.findByIdAndUpdate(
        idParam,
        gamesBody,
        novo,
        (error, games) =>{
            if(error){
                return res.status(500).send(error)
            }else if(games){
                return res.status(500).send(games)
            }else{
                return res.sendStatus(404)
            }
        }

    )
    
}

//deleteGame
const deleteGame = (req, res) => {
    const idParam = req.params.id
    gamesTeste.gamesCollection.findByIdAndDelete(idParam, (error, games) =>{
        if(error){
            return res.status(500).send(error)
        }else{
            if(games){
                return res.status(200).send("O game foi apagado")
            }else{
                return res.sendStatus(404)
            }
        }
    }
    )
}

module.exports = {
    getGames, 
    getGameById, 
    addGame, 
    updateGame, 
    deleteGame 
}