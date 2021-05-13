import React, { useReducer, createContext } from 'react'
import Appcss from './App.css'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Login from './components/Login'
import Logout from './components/Logout'
import Error from './components/Error'
import { Switch, Route } from 'react-router-dom'

import { initialState, reducer } from '../src/reducer/UserReducer'

export const UserContext = createContext()

export const Routing = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={Register} />
        <Route component={Error} />
      </Switch>
    </>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)  // reducer is also function it take two parameter and defined another file
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
