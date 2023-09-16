import React, { useState, useEffect } from 'react';

const AuthenticationForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [signupForm, showSignupForm] = useState(false);

	function handleInputChange(e) {
		const { name, value } = e.target;

		if (name === 'username') {
			console.log('the username changes!');
			setUsername(value);
		} else if (name === 'password') {
			console.log('the password changes!');
			setPassword(value);
		} else if (name === 'signup-toggle') {
			console.log('in the signup!');
			showSignupForm(!signupForm);
		} else if (name === 'signup') {
			console.log('made username ');
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		//Target property here looks pretty important.
		console.log('the event: ', e);
		if (!signupForm) {
			//Login fetch here
			console.log('you logged in!');
		} else {
			//Signup fetch here
			console.log('you signed up!');
		}
	}

	if (!signupForm) {
		return (
			<div className='login-signup'>
				<form className='login-form' onSubmit={handleSubmit}>
					<label htmlFor='username'>Username: </label>
					<input type='text' name='username' value={username} className='user-form' onChange={handleInputChange}></input>
					<label htmlFor='password'>Password: </label>
					<input type='password' name='password' value={password} className='user-form' onChange={handleInputChange}></input>
					<button type='submit' id='button' className='user-form'>
						Sign In
					</button>
				</form>
				<div id='signup-div'>
					<button type='button' name='signup-toggle' id='button' className='user-form' onClick={handleInputChange}>
						Already Have An Account?
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='login-signup'>
				<form className='login-form' onSubmit={handleSubmit}>
					<label htmlFor='username'>Username: </label>
					<input type='text' name='username' value={username} className='user-form' onChange={handleInputChange}></input>
					<label htmlFor='password'>Password: </label>
					<input type='password' name='password' value={password} className='user-form' onChange={handleInputChange}></input>
					<button type='submit' id='button' className='user-form'>
						Sign In
					</button>
				</form>
				<div id='signup-div'>
					<button type='button' name='signup-toggle' id='button' className='user-form' onClick={handleInputChange}>
						Already Have An Account?
					</button>
				</div>
			</div>
		);
	}
};

export default AuthenticationForm;