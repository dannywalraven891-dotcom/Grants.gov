import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import AdminAuth from './pages/AdminAuth'
import Withdrawal from './pages/Withdrawal'
import Processing from './pages/Processing'
import { AuthState } from './types'
import ThemeToggle from './components/ThemeToggle'
import LanguageSelector from './components/LanguageSelector'

type PageType = 'landing' | 'login' | 'signup' | 'dashboard' | 'admin-auth' | 'admin' | 'withdrawal' | 'processing'

function App() {
  const { i18n } = useTranslation()
  const [currentPage, setCurrentPage] = useState<PageType>('landing')
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  })
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Load theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setAuth({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        })
      } catch (error) {
        setAuth({ user: null, isAuthenticated: false, loading: false, error: null })
      }
    } else {
      setAuth({ user: null, isAuthenticated: false, loading: false, error: null })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setAuth({ user: null, isAuthenticated: false, loading: false, error: null })
    setCurrentPage('landing')
  }

  const handleAdminLogout = () => {
    setAdminAuthenticated(false)
    setCurrentPage('landing')
  }

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-deep-slate dark:to-slate-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-deep-slate dark:to-slate-dark transition-colors duration-300">
      {/* Header with Controls */}
      <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              🏛️
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Federal Grants Portal
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            {auth.isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            )}
            {adminAuthenticated && (
              <button
                onClick={handleAdminLogout}
                className="btn-danger text-sm"
              >
                Exit Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {currentPage === 'landing' && (
          <Landing 
            onNavigate={setCurrentPage}
            isAuthenticated={auth.isAuthenticated}
            user={auth.user}
          />
        )}
        {currentPage === 'login' && (
          <Login 
            onNavigate={setCurrentPage}
            setAuth={setAuth}
          />
        )}
        {currentPage === 'signup' && (
          <SignUp 
            onNavigate={setCurrentPage}
            setAuth={setAuth}
          />
        )}
        {currentPage === 'dashboard' && auth.isAuthenticated && auth.user && (
          <Dashboard 
            user={auth.user}
            onNavigate={setCurrentPage}
            setAuth={setAuth}
          />
        )}
        {currentPage === 'admin-auth' && (
          <AdminAuth 
            onSuccess={() => {
              setAdminAuthenticated(true)
              setCurrentPage('admin')
            }}
            onCancel={() => setCurrentPage('landing')}
          />
        )}
        {currentPage === 'admin' && adminAuthenticated && (
          <AdminPanel onNavigate={setCurrentPage} />
        )}
        {currentPage === 'withdrawal' && auth.isAuthenticated && auth.user && (
          <Withdrawal 
            user={auth.user}
            onNavigate={setCurrentPage}
            setAuth={setAuth}
          />
        )}
        {currentPage === 'processing' && (
          <Processing onNavigate={setCurrentPage} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Federal Grants Portal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure and professional grant distribution platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm">
                <li><button onClick={() => setCurrentPage('landing')} className="text-blue-600 dark:text-blue-400 hover:underline">Home</button></li>
                <li><a href="#terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms & Conditions</a></li>
                <li><a href="#privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: hatcanoff779@owleyes.ch<br/>
                Phone: +1 (256) 563-1275
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 Federal Grants Portal. All rights reserved. | Professional & Secure</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
