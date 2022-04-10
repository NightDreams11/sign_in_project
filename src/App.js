import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/Home_Page/HomePage';
import SignIn from './Components/Sign_in_page/SignIn';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const onChangeAuth = (isAuth) => {
    setIsAuth(isAuth)
  }

  return (
    <div>
      <Routes>
        <Route
          path='/login'
          element={
            <SignIn
              onChangeAuth={onChangeAuth}
              isAuth={isAuth}
            ></SignIn>}>
        </Route>
        <Route
          path='/home'
          element={
            <HomePage
              isAuth={isAuth}
              onChangeAuth={onChangeAuth}
            ></HomePage>
          }>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
