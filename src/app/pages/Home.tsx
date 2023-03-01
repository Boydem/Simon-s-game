import { LegacyRef, useEffect, useRef, useState } from 'react'

const colors: string[] = ['green', 'red', 'yellow', 'blue']

// * Sound Effects *
const sounds: { [key: string]: HTMLAudioElement } = {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
}

export const Home = () => {
    const [level, setLevel] = useState<number>(1)
    const [isGameOn, setIsGameOn] = useState(true)
    const [isPlayerMove, setIsPlayerMove] = useState(false)
    const sequence = useRef<number[]>([])
    const gameBtnsRefs = useRef<HTMLButtonElement[]>([])
    const timeoutIds = useRef<NodeJS.Timeout[]>([])
    const playerClick = useRef<number>(0)

    useEffect(() => {
        document.body.focus()
    }, [])

    console.log('isPlayerMove:', isPlayerMove)
    useEffect(() => {
        if (!isGameOn) return
        const randomNum: number = Math.floor(Math.random() * 3)
        sequence.current.push(randomNum)

        function hilghlightBtn(colorIdx: number, sequenceCount: number) {
            gameBtnsRefs.current[colorIdx]?.classList.add('active')
            playSound(colorIdx)
            timeoutIds.current.push(
                setTimeout(() => {
                    gameBtnsRefs.current[colorIdx]?.classList.remove('active')
                    console.log('colorIdx:', colorIdx)
                    console.log('sequence.current.length - 1:', sequence.current.length - 1)
                    if (sequenceCount === sequence.current.length - 1) {
                        console.log('hello:')
                        setIsPlayerMove(true)
                    }
                }, 250)
            )
        }

        for (let i = 0; i < level; i++) {
            const timeoutId = setTimeout(
                () => {
                    hilghlightBtn(sequence.current[i], i)
                },
                i === 0 ? 1000 : 1000 + i * 1000
            ) // Use a longer delay for the first button activation
            timeoutIds.current.push(timeoutId)
        }

        console.log('randomNums.current:', sequence.current)
        return () => {
            clearTimeOuts()
        }
    }, [level, isGameOn])

    function handleClick(clickedIdx: number): void {
        console.log('clickedIdx:', clickedIdx)
        console.log('randomNums.current[clickCount.current]:', sequence.current[playerClick.current])
        playSound(clickedIdx)
        if (isCorrectMove(clickedIdx)) {
            playerClick.current++
            console.log('clickCount.current:', playerClick.current)
            if (playerClick.current === level) {
                console.log('LEVEL UPPPPP**************************:')
                playerClick.current = 0
                setIsPlayerMove(false)
                setLevel(prev => prev + 1)
            }
            return
        }
        setIsGameOn(false)
    }

    function playSound(index: number) {
        let sound = sounds[Object.keys(sounds)[index]]
        sound.currentTime = 0
        sound.volume = 0.1
        sound.play()
    }

    function isCorrectMove(clickedIdx: number): boolean {
        return sequence.current[playerClick.current] === clickedIdx
    }

    function resetGame() {
        playerClick.current = 0
        sequence.current = []
        setLevel(1)
        clearTimeOuts()
        setIsPlayerMove(false)
        setIsGameOn(true)
    }

    function clearTimeOuts() {
        timeoutIds.current.forEach(id => {
            clearTimeout(id)
        })
    }

    return (
        <div className='home'>
            <div className='board'>
                {colors.map((color, idx) => (
                    <button
                        disabled={!isPlayerMove}
                        key={idx}
                        ref={el => {
                            if (el && !gameBtnsRefs.current.includes(el)) {
                                gameBtnsRefs.current.push(el)
                            }
                        }}
                        onClick={() => handleClick(idx)}
                        className={`game-btn ${color}`}
                    ></button>
                ))}
                <div className='level'>
                    <h1 title='Level'>{level}</h1>
                </div>
                {!isGameOn && (
                    <div className='modal'>
                        <h2>Game Lost!</h2>
                        <button onClick={() => resetGame()} className='btn secondary rounded medium'>
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
