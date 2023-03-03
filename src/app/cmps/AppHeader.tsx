import { useState } from 'react'

export function AppHeader() {
    const title = `Simon Says`
    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => {
        const root = document.documentElement
        root.classList.toggle('light-mode')
        setDarkMode(prev => !prev)
    }
    return (
        <header className='app-header main-layout'>
            <div className='wrapper'>
                <div className='dark-light-switch'>
                    <button onClick={toggleDarkMode} className='btn small primary rounded'>
                        {darkMode ? 'Light' : 'Dark'}
                    </button>
                </div>
                <div className='logo'>{title}</div>
            </div>
        </header>
    )
}
