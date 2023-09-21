import './App.css'
import NavBar  from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { MyThemeProvider } from './contexts/MyThemeContext'
import { UserProvider } from './contexts/userContext.jsx'

function App() {

  return (<MyThemeProvider>
      <UserProvider>
      
        <NavBar/>
        <main> <AppRoutes/> </main>      
      {//</MyThemeProvider>
  }   </UserProvider>
  </MyThemeProvider>
  )
}

export default App
