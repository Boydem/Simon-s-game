export function AppHeader() {
    const title = `Simon's Game`
    return (
        <header className='app-header main-layout'>
            <div className='wrapper'>
                <div className='dark-light-switch'>
                    <button className='btn small secondary rounded'>Dark</button>
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
