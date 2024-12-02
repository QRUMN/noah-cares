import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Pages will be imported here as we create them
import MoodPage from './features/mood/pages/mood-page'
import Layout from './components/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MoodPage />} />
            {/* Add more routes as we create them */}
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
