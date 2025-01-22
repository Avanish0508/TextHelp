// import logo from './logo.svg';
import React ,{ useState } from 'react';
import './App.css';

import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';





function App() {
  const [mode,setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null);
      
    }, 1500);
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled" , "success")
      // document.title = 'TextHelp-DarkMode'
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Dark mode has been disabled", "success")
    }

  }

  return (
     <>   
      <BrowserRouter>   
<Navbar title="TextHelp" mode = {mode} toggleMode = {toggleMode}  AboutText = "About TextHelp"/>
<Alert alert ={ alert}/>
<div className="container my-3">


        {/* <TextForm showAlert={showAlert} heading="Enter the text to analyse below" mode={mode} /> */}

        <Routes>
            <Route exact path="/about" element={<About mode = {mode} />}></Route>
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter The Text To Analyze Below" mode={mode} />}>
             
            
          </Route>
        </Routes>
        

  </div>
      </BrowserRouter>
      


     
     </>
  );
}

export default App;
