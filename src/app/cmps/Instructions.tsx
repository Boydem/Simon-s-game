const instructions: { [key: string]: string }[] = [
    { title: '👋 Introduction', description: 'Welcome to the Simon says game!' },
    { title: '🎯 Objectives', description: 'Repeat the sequence of colors in the correct order.' },
    {
        title: '🎮 How to play',
        description: 'Watch the sequence of colors, then click on the same colors in the same order.',
    },
    { title: '🥇 Scoring', description: 'Game keeps track of successful rounds. Try to beat your high score.' },
    { title: '🏆 Good Luck!', description: 'Have fun!' },
]

export function Instructions({ resetGame, closeModal }: { [key: string]: (() => void) | undefined }) {
    return (
        <div className='instructions'>
            <h1 className='title'>Simon Says!</h1>
            <ul className='clean-list flex column'>
                {instructions.map((item, idx) => (
                    <li key={`i-${idx}`}>
                        <h3 className='item-title'>{item.title}</h3>
                        <p className='item-description'>{item.description}</p>
                    </li>
                ))}
            </ul>
            <div className='space-inline-s'>
                <button onClick={closeModal || resetGame} className='btn primary rounded medium'>
                    {`${closeModal ? 'Continue' : 'Start'}`}
                </button>
                {closeModal && (
                    <button onClick={resetGame} className='btn secondary rounded medium'>
                        Reset
                    </button>
                )}
            </div>
        </div>
    )
}
