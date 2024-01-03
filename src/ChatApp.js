// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './styles.css'; // Ensure this CSS file exists and is styled properly

// const SERVER_URL = 'https://localhost:8000';

// function ChatApp() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [username, setUsername] = useState("");
//     const [users, setUsers] = useState([]);
//     const [currentChatUser, setCurrentChatUser] = useState(null);
//     const socketRef = useRef(null);  // Using useRef to persist the socket instance

//     useEffect(() => {
//         socketRef.current = io(SERVER_URL, {
//             transports: ["websocket"],
//             rejectUnauthorized: false
//         });

//         const storedUsername = localStorage.getItem('username');
//         if (storedUsername) {
//             setUsername(storedUsername);
//             socketRef.current.emit('register', {username:storedUsername});
//         }

//         socketRef.current.on('clientMessage', (incomingMessage) => {
//             console.log("clientMessage", incomingMessage)
//             setMessages(prevMessages => [...prevMessages, ...incomingMessage]);
//         });

//         socketRef.current.on('messageHistory', (history) => {
//             console.log("messageHistory", history)
//             setMessages(history); // Assume history is an array of message objects
//         });

//         socketRef.current.on('usersList', (usersList) => {
//             console.log("usersList", usersList)
//             const otherUsers = usersList.filter(user => user !== storedUsername);
//             setUsers(otherUsers);
//         });

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//         };
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message && username && currentChatUser) {
//             const messageData = {
//                 text: message,
//                 from: username,
//                 to: currentChatUser,
//             };
//             if (socketRef.current) {
//                 socketRef.current.emit("message", messageData);
//             }
//             setMessage('');
//         }
//     };

//     const handleUserClick = (user) => {
//         setCurrentChatUser(user);
//         if (socketRef.current && username) {
//             socketRef.current.emit("request_history", {
//                 from: username, 
//                 to: user
//             });
//         }
//     };

//     return (
//         <div className="chat-app-container">
//             <div className="sidebar">
//                 <div className="sidebar-header">Users</div>
//                 <ul className="users-list">
//                     {users.map((user, index) => (
//                         <li key={index} className={`user-item ${user === currentChatUser ? 'active' : ''}`} onClick={() => handleUserClick(user)}>
//                             {user}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="chat-container">
//                 <div className="chat-box">
//                 <ul className="messages">
//                 {messages.map((msg, index) => (
//                     <li key={index} className="message">{msg.text}</li> // Ensure msg.text is valid
//                     ))}
//                 </ul>

//                 </div>
//                 <form className="chat-input-container" onSubmit={handleSubmit}>
//                     <input type="text" className="chat-input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
//                     <button type="submit" className="send-button">Send</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ChatApp;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles.css'; // Ensure this CSS file exists and is styled properly

const SERVER_URL = 'https://localhost:8000';

function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const socketRef = useRef(null);  // Using useRef to persist the socket instance

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(SERVER_URL, {
            transports: ["websocket"],
            rejectUnauthorized: false
        });

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            socketRef.current.emit('register', {username:storedUsername});  // Register the user
        }

        socketRef.current.on('clientMessage', (incomingMessage) => {
            // setMessages((prevMessages) => [...prevMessages, incomingMessage]);
            console.log("clientMessage")
            setMessages(prevMessages => [...prevMessages, ...incomingMessage]);  // Spread incomingMessage as it's a list
        });

        socketRef.current.on('messageHistory', (history) => {
            console.log("messageHistory")
            // Assuming history is an array of message objects
            setMessages(history); // Set the messages state to the received history
            console.log("Received history:", history); // Debugging line
        });

        socketRef.current.on('usersList', (usersList) => {
            console.log("usersList")
            const otherUsers = usersList.filter(user => user !== storedUsername);

            // setUsers(usersList);  // Update the list of users
            setUsers(otherUsers)
        });

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message && username && currentChatUser) {
            const messageData = {
                text: message,
                from: username,  // Sender username
                to: currentChatUser,  // Recipient username
            };
            if (socketRef.current) {
                socketRef.current.emit("message", messageData);
            }
            setMessage('');  // Clear input after sending
        }
    };

    const handleUserClick = (user) => {
        setCurrentChatUser(user);  // Update the current user to chat with
        if (socketRef.current && username) {
            socketRef.current.emit("request_history", {
                from: username, 
                to: user
            });
        }
    };

    return (
        <div className="chat-app-container">
        <div className="sidebar">
            <div className="sidebar-header">Users</div>
            <ul className="users-list">
                {users.map((user, index) => (
                    <li key={index} className={`user-item ${user === currentChatUser ? 'active' : ''}`} onClick={() => handleUserClick(user)}>
                        {user} {/* Display each user */}
                    </li>
                ))}
            </ul>
        </div>
        <div className="chat-container">
            <div className="chat-box">
                <ul className="messages">
                    {messages.map((msg, index) => (
                        
                        <li key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.text} 
                        </li>
                    ))}
                </ul>
            </div>
            <form className="chat-input-container" onSubmit={handleSubmit}>
                <input type="text" className="chat-input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    </div>
    );
}

export default ChatApp;


// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './styles.css'; // Ensure this CSS file exists and is styled properly
// import forge from 'node-forge';
// const SERVER_URL = 'https://localhost:8000';
// const crypto = require('crypto')
// ;

// function ChatApp() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [username, setUsername] = useState("");
//     const [users, setUsers] = useState([]);
//     const [currentChatUser, setCurrentChatUser] = useState(null);
//     const [privateKey, setPrivateKey] = useState("");
//     const [publicKey, setPublicKey] = useState("");
//     const [recipientPublicKeyPem, setRecipientPublicKeyPem] = useState("");
//     const socketRef = useRef(null);
    

    

// // Replace 'aes-256-cbc' & keys with your algorithm and key of choice
//     const algorithm = 'camellia256'
//     const key = crypto.randomBytes(32); // Key size depends on the algorithm
//     const iv = crypto.randomBytes(16)

//     useEffect(() => {
//         socketRef.current = io(SERVER_URL, {
//             transports: ["websocket"],
//             rejectUnauthorized: false
//         });

        
//         function decryptMessage(encryptedData) {
//             // Decrypt the AES key with the private RSA key
//             const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
//             const decryptedKey = privateKeyObj.decrypt(encryptedData.key, 'RSA-OAEP');
    
//             // Decrypt the message with the AES key
//             const decipher = forge.cipher.createDecipher('AES-CBC', decryptedKey);
//             decipher.start({iv: forge.random.getBytesSync(16)});
//             decipher.update(forge.util.createBuffer(encryptedData.message));
//             decipher.finish();
//             return decipher.output.toString();
//         }


//         const storedUsername = localStorage.getItem('username');
//         if (storedUsername) {
//             setUsername(storedUsername);
//             const registrationData = {username: storedUsername, public_key: publicKey}
//             socketRef.current.emit('register', registrationData);
//         }
//         generateRSAKeys();

//         socketRef.current.on('clientMessage', (incomingMessage) => {
//             const decryptedMessage = decryptMessage(incomingMessage);

//             console.log("clientMessage", decryptedMessage);

//             setMessages(prevMessages => [...prevMessages, ...decryptedMessage]);
//         });


//         socketRef.current.on('getReceipientPublicKey', (recipientpublicKey) => {

//             setRecipientPublicKeyPem(recipientpublicKey);
//         });


//         socketRef.current.on('messageHistory', (history) => {
//             console.log("messageHistory", history)
//             setMessages(history); // Assume history is an array of message objects
//         });

//         socketRef.current.on('usersList', (usersList) => {
//             console.log("usersList", usersList)
//             const otherUsers = usersList.filter(user => user !== storedUsername);
//             setUsers(otherUsers);
//         });

//         function generateRSAKeys() {
//             const keypair = forge.pki.rsa.generateKeyPair(2048);
//             setPrivateKey(forge.pki.privateKeyToPem(keypair.privateKey));
//             setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey));
//         }

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//         };
//     }, []);

//     function generateAESKey() {
//         return crypto.randomBytes(32); // 256 bit key for AES
//     }



//     function encryptMessage(message) {


//         let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//         let encrypted = cipher.update(message);
//         const encryptedMessage = Buffer.concat([encrypted, cipher.final()]);
//         // Encrypt the AES key with the recipient's public RSA key
//         // Assuming you have the recipient's public key
//         const recipientPublicKey = forge.pki.publicKeyFromPem(recipientPublicKeyPem);
//         const encryptedKey = recipientPublicKey.encrypt(generateAESKey(), recipientPublicKey);

//         return {
//             message: encryptedMessage,
//             key: encryptedKey
//         };
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (message && username && currentChatUser) {
//             const encryptedData = encryptMessage(message);

//             const messageData = {
//                 text: encryptedData.message,
//                 from: username,
//                 to: currentChatUser,
//                 key: encryptedData.key
//             };

//             if (socketRef.current) {
//                 socketRef.current.emit("message", messageData);
//             }
//             setMessage('');
//         }
//     };

//     const handleUserClick = (user) => {
//         setCurrentChatUser(user);
//         if (socketRef.current && username) {
//             socketRef.current.emit("request_history", {
//                 from: username, 
//                 to: user
//             });
//         }
//         socketRef.current.emit("get_receipient_public_key", {username: user});
//     };

//     return (
//         <div className="chat-app-container">
//             <div className="sidebar">
//                 <div className="sidebar-header">Users</div>
//                 <ul className="users-list">
//                     {users.map((user, index) => (
//                         <li key={index} className={`user-item ${user === currentChatUser ? 'active' : ''}`} onClick={() => handleUserClick(user)}>
//                             {user}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="chat-container">
//                 <div className="chat-box">
//                 <ul className="messages">
//                 {messages.map((msg, index) => (
//                     <li key={index} className="message">{msg.text}</li> // Ensure msg.text is valid
//                     ))}
//                 </ul>

//                 </div>
//                 <form className="chat-input-container" onSubmit={handleSubmit}>
//                     <input type="text" className="chat-input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
//                     <button type="submit" className="send-button">Send</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ChatApp;
