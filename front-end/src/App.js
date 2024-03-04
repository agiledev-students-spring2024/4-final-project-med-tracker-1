import './App.css';
import NavBar from './NavBar';
import React from 'react';

function App() {
  return (
    <>
    <div className="App">
      <NavBar />
      {/* <Router>
        <main className="App-main">
          <Routes>
            a router for the home page
            <Route path="/" element={<Home />} />

            a router for the history page
            <Route path="/history" element={<History />} />

            a router for the medicines page
            <Route path="/medicines" element={<Medicines />} />

            a router for setting page
            <Route path="/settings" element={<Settings />} />
      
          </Routes>
        </main>
      </Router> */}
    </div>
    </>
  );
}

export default App;
