import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import './style.css';
import CaveMaker from './main.jsx';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupForm, showSignupForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [existingUsers, setExistingUsers] = useState(new Set());
    const [usernameTaken, setUsernameTaken] = useState(false);


    useEffect(() => {
        function gatherExistingUsers() {
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(data => {
                    const updatedUsersSet = new Set(existingUsers);
                    data.forEach((user) => {
                        updatedUsersSet.add(user);
                    })
                    setExistingUsers(updatedUsersSet);
                })
                .catch((err) => {
                    console.log('An error occurred while fetching all users.');
                })
        }
        if (!isLoggedIn) {
            gatherExistingUsers();
        }
    }, []);

    if (isLoggedIn) {
        //add in routes if you wanna use Navigate method from other pages
        console.log('made it past check');
        return <CaveMaker />;
    }


    function handleInputChange(e) {
        const { name, value } = e.target;

        if (name === 'username') {
            console.log('the username changes!');
            setUsername(value);
            if (signupForm && existingUsers.has(value)) {
                setUsernameTaken(true);
            }
            else if (signupForm && !existingUsers.has(value)) {
                setUsernameTaken(false);
            }
        } else if (name === 'password') {
            console.log('the password changes!');
            setPassword(value);
        } else if (name === 'signup-toggle') {
            showSignupForm(!signupForm);
        }
    }


    function handleSubmit(e) {
        e.preventDefault();

        if (!signupForm) {
            //Login fetch here
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setIsLoggedIn(!isLoggedIn);
                    }
                    else {
                        setUsername('');
                        setPassword('');
                        alert('Incorrect username/password. Please try again.');
                    }
                })
                .catch((err) => {
                    console.log('An error occured during the request');
                })
        } else {
            // Signup fetch here
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showSignupForm(!signupForm);
                        alert('Welcome to Cave Maker!');
                        setUsername('');
                        setPassword('');
                    }
                    else {
                        setUsername('');
                        setPassword('');
                        alert('An error occurred. Please try again.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred during the request');
                })
        }
    }


    // function usernameCreatorValidation() {
    //     if (existingUsers.has(username) && !usernameTaken) {
    //         setUsernameTaken(!usernameTaken);
    //     }
    // }

    if (!signupForm) {
        return (
            <div className='login-signup'>
                <h1>Cave Generator</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' name='username' value={username} className='user-form' onChange={handleInputChange}></input>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' value={password} className='user-form' onChange={handleInputChange}></input>
                    <button type='submit' id='login-page-button' className='user-form'>
                        Enter
                    </button>
                </form>
                <div id='signup-div'>
                    <button type='button' name='signup-toggle' id='login-page-button' className='user-form' onClick={handleInputChange}>
                        Create Account
                    </button>
                </div>
            </div>
        );
    } else {
        // usernameCreatorValidation();
        return (
            <div className='login-signup'>
                <h1>Cave Generator</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='username-container'>
                        <label htmlFor='username'>Username: </label>
                        <input type='text' name='username' value={username} className='user-form' onChange={handleInputChange}></input>
                        {usernameTaken && (
                            <label htmlFor='username' id='existing-user-flag'>Name is already taken.</label>
                        )}
                    </div>
                    <div className='password-container'>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' value={password} className='user-form' onChange={handleInputChange}></input>
                        <button type='submit' id='login-page-button' className='user-form'>
                            Create
                        </button>
                    </div>
                </form>
                <div id='signup-div'>
                    <button type='button' name='signup-toggle' id='login-page-button' className='user-form' onClick={handleInputChange}>
                        Already Have An Account?
                    </button>
                </div>
            </div>
        );
    }
}

const root = createRoot(document.getElementById('content'));
root.render(<App />);
