import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.SERVER_PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Federal Grants Portal API',
    version: '1.0.0',
    status: 'Running',
  })
})

// Auth Routes (to be implemented)
app.post('/api/auth/register', (req: Request, res: Response) => {
  res.json({ message: 'Register endpoint - to be implemented' })
})

app.post('/api/auth/login', (req: Request, res: Response) => {
  res.json({ message: 'Login endpoint - to be implemented' })
})

// User Routes (to be implemented)
app.get('/api/users/profile', (req: Request, res: Response) => {
  res.json({ message: 'Get user profile - to be implemented' })
})

// Withdrawal Routes (to be implemented)
app.post('/api/withdrawals', (req: Request, res: Response) => {
  res.json({ message: 'Create withdrawal - to be implemented' })
})

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🏛️  Federal Grants Portal API`)
  console.log(`📍 Server running on http://localhost:${PORT}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
  console.log(`\n✅ Ready to accept requests!\n`)
})

export default app
