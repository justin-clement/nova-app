import { useEffect, useState } from 'react'
import PredictionCard from './PredictionCard.jsx';
import '../styling/games.css'

function Games({ data }) {

    const noRec = () => (
        <div>
            <h1 style={{color: "grey"}}>No recommendations yet.</h1>
            <br />
            <button>Refresh</button>       
        </div>
    )

    return (
        <>
            <div className='recommendation-page-container' 
            style={{display: "flex", 
                    flexDirection: "column",
                    alignItems: "center",
            }}>
                <br />
                <h2 style={{
                    color: "brown", 
                    textAlign: "center", 
                    marginBottom: "0" 
                    }}>RECOMMENDATIONS OF THE DAY</h2>

                <p style={{
                    color: "grey", 
                    textAlign: "center" 
                    }}>Some recommendations come with multiple options; choose the ones 
                    most preferred by you.
                </p>
                <div className='recommendationDisplayArea'>
                    {data.status ? 
                    data.games.map(game => (
                        <PredictionCard 
                        key={game.key}
                        league={game.league} 
                        home={game.home} 
                        away={game.away}
                        recommendation={game.recommendation} />
                    )) 
                    : noRec}
                    <br />
                </div>
            </div>
        </>
    )
};

export default Games;