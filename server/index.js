import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app: Express = express()
const PORT = process.env.SERVER_PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mock database
const users: any[] = []
const withdrawals: any[] = []

// Routes

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Federal Grants Portal API is running' })
})

// Auth Routes
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const user = {
      id: Date.now().toString(),
      username,
      email,
      balance: 65000,
      depositVerified: false,
      createdAt: new Date().toISOString(),
    }

    users.push(user)
    res.json({
      success: true,
      message: 'Registration successful',
      user: { ...user, password: undefined },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    // Mock authentication
    const user = users.find((u) => u.email === email) || {
      id: Date.now().toString(),
      username: email.split('@')[0],
      email,
      balance: 65000,
      depositVerified: false,
      createdAt: new Date().toISOString(),
    }

    const token = Buffer.from(JSON.stringify(user)).toString('base64')

    res.json({
      success: true,
      token,
      user: { ...user, password: undefined },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// User Routes
app.get('/api/users/profile', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/users/profile', (req: Request, res: Response) => {
  try {
    const { username, email } = req.body
    res.json({
      success: true,
      message: 'Profile updated',
      user: { username, email },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/users', (req: Request, res: Response) => {
  try {
    // Admin only
    res.json({ success: true, users })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Withdrawal Routes
app.post('/api/withdrawals', (req: Request, res: Response) => {
  try {
    const { amount, cryptoType, address } = req.body

    if (!amount || !cryptoType || !address) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const withdrawal = {
      id: Date.now().toString(),
      amount,
      cryptoType,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    withdrawals.push(withdrawal)
    res.json({
      success: true,
      message: 'Withdrawal request created',
      withdrawal,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/withdrawals', (req: Request, res: Response) => {
  try {
    res.json({ success: true, withdrawals })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/withdrawals/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const withdrawal = withdrawals.find((w) => w.id === id)
    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' })
    }

    withdrawal.status = status
    res.json({
      success: true,
      message: 'Withdrawal updated',
      withdrawal,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error Handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🏛️  Federal Grants Portal API`)
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health\n`)
})

export default app
