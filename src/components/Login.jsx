import { useState } from 'react'
import { loginUser, registerUser } from '../auth'

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if (isRegister) {
                await registerUser(email, password)
            } else {
                await loginUser(email, password)
            }
            onLogin() // Callback when login/register successful
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <button
                onClick={() => setIsRegister(!isRegister)}
                style={{ marginTop: '10px', fontSize: '14px', cursor: 'pointer' }}
            >
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    )
}
