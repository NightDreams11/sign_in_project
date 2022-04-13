import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Component_404 from './Components/404/404';
import HomePage from './Components/Home_Page/HomePage';
import SignIn from './Components/Sign_in_page/SignIn';

function App() {
  const [isAuth, setIsAuth] = useState(false);


  const onChangeAuth = (isAuth) => {
    setIsAuth(isAuth)
  }

  const user = {
    name: "Ross",
    surname: "Max",
    age: 26
  }

  const firstNameChar = user.name.substring(0, 1).toUpperCase();
  const firstSurnameChar = user.surname.substring(0, 1).toUpperCase();

  return (
    <div>
      <Routes>
        <Route
          path='/login'
          element={
            <SignIn
              onChangeAuth={onChangeAuth}
              isAuth={isAuth}
            ></SignIn>
          }>
        </Route>
        <Route
          path='/home'
          element={
            <HomePage
              isAuth={isAuth}
              onChangeAuth={onChangeAuth}
              firstNameChar={firstNameChar}
              firstSurnameChar={firstSurnameChar}
            ></HomePage>
          }>
        </Route>
        <Route
          path='/'
          element={<Component_404></Component_404>}
        ></Route>
      </Routes>
    </div>
  )
}

export default App;
