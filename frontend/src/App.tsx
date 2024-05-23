import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux' // Import Provider
import { store } from './store/store' // Import your Redux store
import { RegisterForm, LoginForm } from './feature/auth'
import { ProductDashboard } from './feature/product'
import { ProfilePage } from './feature/user/user-profile'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/dashboard" element={<ProductDashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
