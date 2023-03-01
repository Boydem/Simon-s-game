import { LegacyRef, useEffect, useRef, useState } from 'react'

const colors: string[] = ['green', 'red', 'yellow', 'blue']

export const Home = () => {
    const [level, setLevel] = useState<number>(1)
    const [isGameOn, setIsGameOn] = useState(true)
    const randomNums = useRef<number[]>([])
    const gameBtnsRefs = useRef<HTMLButtonElement[]>([])
    const timeoutIds = useRef<NodeJS.Timeout[]>([])
    const clickCount = useRef<number>(0)

    useEffect(() => {
        if (!isGameOn) return
        const randomNum: number = Math.floor(Math.random() * 3) + 1
        randomNums.current.push(randomNum)

        function hilghlightBtn(index: number) {
            gameBtnsRefs.current[index]?.classList.add('active')
            timeoutIds.current.push(
                setTimeout(() => {
                    gameBtnsRefs.current[index]?.classList.remove('active')
                }, 1000)
            )
        }

        for (let i = 0; i < level; i++) {
            const timeoutId = setTimeout(() => {
                hilghlightBtn(i)
            }, 250 + i * 1000) // Delay each button activation by 1 second
            timeoutIds.current.push(timeoutId)
        }

        console.log('randomNums.current:', randomNums.current)
        return () => {
            clearTimeOuts()
        }
    }, [level, isGameOn])

    function handleClick(clickedIdx: number): void {
        console.log('clickedIdx:', clickedIdx)
        console.log('randomNums.current[clickCount.current]:', randomNums.current[clickCount.current])
        if (isCorrectMove(clickedIdx)) {
            clickCount.current++
            console.log('clickCount.current:', clickCount.current)
            if (clickCount.current === level) {
                console.log('LEVEL UPPPPP**************************:')
                clickCount.current = 0
                setLevel(prev => prev + 1)
            }
            return
        }
        setIsGameOn(false)
    }

    const isCorrectMove = (clickedIdx: number): boolean => {
        return randomNums.current[clickCount.current] === clickedIdx
    }

    function resetGame() {
        randomNums.current = []
        setLevel(1)
        clearTimeOuts()
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
                    <h1 title='score'>{level}</h1>
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
