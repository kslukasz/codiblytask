import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Footer from './Footer.js';
import Header from './Header.js';
import Content from './Content.js'
import { AppContext } from './AppContext.js'

import './App.css';

let table = [];

function App() {
  const numberOfProducts = 5;
  const api = "https://reqres.in/api/products?page=";
  const [dataLength, setDataLength] = useState(0);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState("");
  
  const chandleInput = (event) => {
    if (!(event.target.value > 99) && !(event.target.value < 0)) {
      setInput(event.target.value);

    }
    setCurrentPage(1);
    window.history.replaceState({}, "",1);
  
  }

  const changePage = (number) => setCurrentPage(currentPage + number);

  const fetchData = (i) => {
    fetch(api + i)
      .then(response => response.json())
      .then(fetchdata => {
        const result = fetchdata;
        result.data.forEach((element, index) => {
          table.push(element);
        });
        if (result.total_pages > i) {
          i++;
          fetchData(i);
        } else {
          result.data.length = 0;
          table.forEach((element) => {
            result.data.push(element);
          });
          setData(result);
          setDataLength(result.data.length);
        }
      })
      .catch(() => {
        console.log("błąd");
      })
  }
  useEffect(() => {
    let i = 1;
    fetchData(i);
    
  }, []);

  return (

    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppContext.Provider value={{
          input: input,
          chandleInput: chandleInput,
          data: data,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          numberOfProducts: numberOfProducts,
          dataLength: dataLength,
          setDataLength: setDataLength,
          changePage: changePage,
        }}>
          <Header />
          <div className='content cont_horizontal'>
            <hr />
            {data !== "" ?
              <Routes>
                <Route path="/:id" element={<Content />} />
                <Route path="/" element={<Content />} />
              </Routes>
              : "Loading..."}
          </div>
          <footer className='cont_vertical'>
            <Footer/>
          </footer>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
