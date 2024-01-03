import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve the existing users from local storage
        const existingUsers = JSON.parse(localStorage.getItem('usernames')) || [];

        // Check if username already exists
        if (!existingUsers.includes(username)) {
            // Add the new username to the existing users array and save it back to local storage
            localStorage.setItem('usernames', JSON.stringify([...existingUsers, username]));

            // Proceed with registration
            localStorage.setItem('username', username); // Save the current user's username
            navigate('/chat'); // Redirect to chat page
        } else {
            // Handle the case where username is not unique
            alert("Um usuário com esse username já existe"); // Simple alert, consider a more user-friendly approach
        }

        setUsername('');  // Clear input field
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-input"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username" 
                        required 
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
}

export default Register;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Updated import

// import './Register.css';
// function Register() {
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate(); // Updated to useNavigate

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // TODO: Implement the actual registration logic here
//         // ...

//         // Simulate successful registration
//         const registrationSuccessful = true; // replace with actual check
//         if (registrationSuccessful) {
//             // Save the username to localStorage or handle it as needed
//             localStorage.setItem('username', username);

//             // Redirect to the chat page using navigate instead of history.push
//             navigate('/chat');
//         }

//         setUsername('');  // Clear input
//     };

//     return (
//     <div className="register-container">
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit} className="register-form">
//             <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input 
//                     type="text" 
//                     id="username" 
//                     className="form-input"
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     placeholder="Enter your username" 
//                     required 
//                 />
//             </div>
//             <button type="submit" className="register-btn">Register</button>
//         </form>
//     </div>

//     );
// }

// export default Register;
