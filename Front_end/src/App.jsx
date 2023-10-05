import './App.css'
import NavBar  from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { MyThemeProvider } from './contexts/MyThemeContext'
import { UserProvider } from './contexts/UserContext.jsx'

function App() {

  return (
      <UserProvider>
        <MyThemeProvider>
          <NavBar/>
          <main>
            <AppRoutes/>
          </main>
        </MyThemeProvider>
      </UserProvider>
  )
}

export default App
