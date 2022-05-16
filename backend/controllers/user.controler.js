// Declaramos los modulos
const axios = require('axios')

// Funcion que devuelve el valor
user = async (req, res) => {

    // Comprobamos que el campo no venga vacio
    if (!req.body.user || req.body.team.length === 0) return res.status(400).json({
        error: true,
        msg: "Los campos son obligatorios"
    })

    // Obtenemos el usuario desde la api de Riot
    const user = await getUser(req.body.user)
    if (!user) return res.status(400).json({ // Si no existe el usuario devolvemos un error
        error: true,
        msg: "El usuario no existe"
    })
    const summonerName = req.body.user

    // Obtenermos las id de los ultimos games del usuario
    const numberOfGames = req.body.numberOfGames || 20 // Si no se pasa el numero de partidas por defecto sera 20
    var games = await getLastGames(user.puuid, numberOfGames)

    // Si no hay partidas devolvemos un error
    if (!games) return res.status(400).json({
        error: true,
        msg: "El usuario no ha jugado partidas"
    })

    var data = [] // Array donde se guardaran los datos de las partidas

    for (let index = 0; index < games.length; index++) {
        data.push({
            id: games[index],
            players: await getGame(games[index], summonerName)
        })
    }

    var playedWith = [] // Array donde se guardaran los jugadores que jugaron con el usuario

    req.body.team.forEach(name => {
        // Comprobamos si el usuario esta en alguna partida
        // const index = data.find(user => user.player.find(user => user.summonerName.toLowerCase() === element.toLowerCase()) !== -1)
        // console.log(element);
        data.forEach(element => {
            const aux = element.players.find(user => user.summonerName.toLowerCase() === name.toLowerCase())
            if (aux) {
                playedWith.push(aux)
            }
        });

    });

    return res.json({
        error: null,
        msg: "Todo funciona correctamente x2",
        playedWith: playedWith
    })

}

// Funcion para obtener los datos del usuario
getUser = async (user) => {

    return await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + user + '?api_key=' + process.env.API_KEY).then(res => {
        return res.data
    }).catch(err => {
        return 
    })

}

// Funcion para obtener las id de los ultimos games
getLastGames = async (puuid, numberOfGames) => {

    return await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=${numberOfGames}&api_key=${process.env.API_KEY}`).then(res => {
        return res.data
    }).catch(err => {
        return 
    })


}

// funcion para obtener la informacion de una partida
getGame =  (gameId, name) => {

    return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${process.env.API_KEY}`).then(res => {

        const index = res.data.info.participants.findIndex(user => user.summonerName.toLowerCase()  === name.toLowerCase() ) // Index del usuario en la partida
        var participant = res.data.info.participants.map((user, i) => {
            let aux = index < 5 ? true : false
            return {
                summonerName: user.summonerName,
                kda: user.kills + '/' + user.deaths + '/' + user.assists,
                win: user.win,
                sameTeam: i < 5 ? aux : !aux
            }
        })

        return participant
    }).catch(err => {
        return 
    })


}

// Exporatacion de modulos
module.exports = {
    user
}