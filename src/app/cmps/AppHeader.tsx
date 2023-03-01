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
                    <button onClick={toggleDarkMode} className='btn small secondary rounded'>
                        {darkMode ? 'Dark' : 'Light'}
                    </button>
                </div>
                <div className='logo'>{title}</div>
                <nav>
                    <ul className='nav-links clean-list flex align-center space-inline-s'>
                        <li className='nav-link'>
                            <a className='btn small primary rounded' href='#'>
                                Play!
                            </a>
                        </li>
                        <li className='nav-link'>
                            <a className='btn small secondary rounded' href='#'>
                                Instructions
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
