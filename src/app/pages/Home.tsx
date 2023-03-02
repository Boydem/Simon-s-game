import { useEffect, useRef, useState } from 'react'

interface Color {
    name: string
    sound: HTMLAudioElement
}

const colors: Color[] = [
    { name: 'green', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3') },
    { name: 'red', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3') },
    { name: 'yellow', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3') },
    { name: 'blue', sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3') },
]
const SHOW_HIGHLIGHT_TIME = 250
const SHOW_HIGHLIGHT_DELAY = 1000

export const Home = () => {
    const [level, setLevel] = useState<number>(1)
    const [isGameOn, setIsGameOn] = useState(true)
    const [isPlayerMove, setIsPlayerMove] = useState(false)
    const sequence = useRef<Color[]>([])
    const gameBoardRef = useRef<HTMLDivElement>(null)
    const timeoutIds = useRef<NodeJS.Timeout[]>([])
    const playerClick = useRef<number>(0)

    useEffect(() => {
        if (!isGameOn) return
        addNextLevel()
        highlightSequence()

        return () => {
            clearTimeOuts()
        }
    }, [level, isGameOn])

    function addNextLevel() {
        const randomNum: number = Math.floor(Math.random() * 3)
        let nextInSequence = colors[randomNum]
        sequence.current.push(nextInSequence)
    }

    function highlightSequence() {
        for (let i = 0; i < level; i++) {
            const timeoutId = setTimeout(
                () => {
                    hilghlightBtn(sequence.current[i], i)
                },
                i === 0 ? SHOW_HIGHLIGHT_DELAY : SHOW_HIGHLIGHT_DELAY + i * SHOW_HIGHLIGHT_DELAY
            )
            timeoutIds.current.push(timeoutId)
        }
    }

    function hilghlightBtn(color: Color, sequenceCount: number) {
        gameBoardRef.current?.classList.add(color.name)
        playSound(color.sound)
        timeoutIds.current.push(
            setTimeout(() => {
                gameBoardRef.current?.classList.remove(color.name)
                if (sequenceCount === sequence.current.length - 1) {
                    setIsPlayerMove(true)
                }
            }, SHOW_HIGHLIGHT_TIME)
        )
    }

    function handleClick(color: Color): void {
        playSound(color.sound)
        if (isCorrectMove(color.name)) {
            playerClick.current++
            if (playerClick.current === level) {
                playerClick.current = 0
                setIsPlayerMove(false)
                setLevel(prev => prev + 1)
            }
            return
        }
        setIsGameOn(false)
    }

    function playSound(colorSound: HTMLAudioElement) {
        colorSound.currentTime = 0
        colorSound.volume = 0.1
        colorSound.play()
    }

    function getColor(colorName: string) {
        return colors.find(color => color.name === colorName)
    }

    function isCorrectMove(clickedName: string): boolean {
        let clickedColor = getColor(clickedName)
        return sequence.current[playerClick.current] === clickedColor
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
            <div ref={gameBoardRef} className='board'>
                {colors.map((color, idx) => (
                    <button
                        disabled={!isPlayerMove}
                        key={idx}
                        onClick={() => handleClick(color)}
                        className={`game-btn ${color.name}`}
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
