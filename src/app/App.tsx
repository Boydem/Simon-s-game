import React from 'react'
import './app.scss'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { Home } from './pages/Home'

function App() {
    return (
        <>
            <AppHeader />
            <main className='app-main main-layout'>
                <Home />
            </main>
            <AppFooter />
        </>
    )
}

export default App
