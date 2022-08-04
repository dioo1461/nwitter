
import React, {useState} from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn = {isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
    );
}

export default App;
