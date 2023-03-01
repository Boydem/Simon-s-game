import { useEffect, useState } from 'react'

export const Home = () => {
    const [level, setLevel] = useState()

    useEffect(() => {}, [])

    function handleClick(color: string): void {
        console.log('color:', color)
    }
    return (
        <div className='home'>
            <div className='board'>
                <button onClick={() => handleClick('green')} className='game-btn green'></button>
                <button onClick={() => handleClick('red')} className='game-btn red'></button>
                <button onClick={() => handleClick('yellow')} className='game-btn yellow'></button>
                <button onClick={() => handleClick('blue')} className='game-btn blue'></button>
                <div className='level'>
                    <h1 title='score'>0</h1>
                </div>
            </div>
        </div>
    )
}
