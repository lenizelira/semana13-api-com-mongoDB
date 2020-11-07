const fs = require('fs')
let allData = require('../data/games.json')

const selectAllGames = () => {
    if(allData){
        return {error: null, data: allData}
    } else {
        return {error: {message: "Ocorreu um erro"}, data: null}
    }
}

const selectGameById = (id) => {
    const gameId = id
    const dadoEncontrado = allData.find(item => item.id == gameId)
    if (dadoEncontrado){
        return {error: null, data: dadoEncontrado}
    } else{
        return {error: {message:"Registro não encontrado na base"}, data: null}
    }
}

const insertGame = (newGame) => {
    const gameFound = allData.find(maravilhosa => maravilhosa.name == newGame.name) // recupero o filme que foi criei no array de filmes      
    
    if (!newGame.id) {
        newGame.id = Math.random().toString(36).substr(-8)
    }
 
    if(gameFound) {
       return {error: {message: "Ops, registro duplicado"}} 
    } else {
        fs.writeFileSync('./src/data/games.json', JSON.stringify([...allData, newGame]), 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })
    
        return {error: null}
    }
}

const updateGame = (id, dataToUpdate) => {
    const gameId = id
    const gameFound = allData.find(item => item.id == gameId) 
    const gameIndex = allData.indexOf(gameFound) 

    if (gameIndex >= 0) { 
        allData.splice(gameIndex, 1, dataToUpdate)
        fs.writeFileSync('./src/data/games.json', JSON.stringify([allData]), 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })

        return {error: null, data: selectGameById(id)}
    } else {
        return {error: {message: "Ops, não encontrei esse registro para poder alterá-lo"}, data: null}
    }
}

const deleteGame = (id) => {
    const gameId = id
    const gameFound = allData.find(item => item.id == gameId) 
    const gameIndex = allData.indexOf(gameFound) 



    if (gameIndex >= 0) { 
        allData.splice(gameIndex, 1)
        fs.writeFileSync('./src/data/games.json', JSON.stringify([allData]), 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
        })
        return {error: null}
    } else {
        return {error: {message: "Ops, não encontrei esse registro para poder deletá-lo"}}
    }
}

module.exports = {
    selectAllGames, 
    selectGameById, 
    insertGame, 
    updateGame, 
    deleteGame
}