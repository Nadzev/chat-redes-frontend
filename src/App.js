// src/App.js
// import React from 'react';
// import ChatApp from './ChatApp'; // Adjust the path as necessary

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Chat Application</h1>
//       </header>
//       <ChatApp />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the changes here
import Register from './Register';
import ChatApp from './ChatApp';

function App() {
    return (
        <Router>
            <Routes> {/* Updated from Switch to Routes */}
                <Route path="/register" element={<Register />} /> {/* Updated syntax */}
                <Route path="/chat" element={<ChatApp />} />
                <Route path="/" element={<Register />} /> {/* Default path */}
                {/* <Route path="*" element={<Navigate to="/register" replace />} /> */}

            </Routes>
        </Router>
    );
}

export default App;

