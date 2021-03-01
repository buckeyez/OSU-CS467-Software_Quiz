import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import { Form } from '../components';
import validator from 'validator';
import { updateUser, updateUserPassword } from '../utils/updateUser';
import { storeUserSessionToLocalStorage } from '../utils/storeSession';
import { login } from '../utils/loginUser';

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  //const history = useHistory();
  const [updatedFirstName, setUpdatedFirstName] = useState(user.firstName);
  const [updatedLastName, setUpdatedLastName] = useState(user.lastName);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [sendingData, setSendingData] = useState(false);

  const updateGeneralInformation = async (event) => {
    event.preventDefault();

    const isValidEmail = validator.isEmail(updatedEmail);

    if (isValidEmail) {
      const updatedInforamtion = {
        Id: user.id,
        Name: user.name,
        FirstName: updatedFirstName,
        LastName: updatedLastName,
        Email: updatedEmail,
      };
      try {
        setSendingData(true);
        const updatedUser = await updateUser(updatedInforamtion);
        if (updatedUser) {
          setSendingData(false);
          console.log('updated user response>', updatedUser);
          setUser(updatedUser);
          storeUserSessionToLocalStorage(updatedUser);
          //Delete local userDate and log user out
          // localStorage.removeItem('userData');
          // history.go(0);
        }
      } catch (e) {
        setSendingData(false);
        console.log('error', e);
      }
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();

    //validate password
    const isValidPassword = validator.isStrongPassword(updatedPassword, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (isValidPassword) {
      try {
        setSendingData(true);
        const newUserPassword = await updateUserPassword(user.id, updatedPassword);
        if (newUserPassword === 200) {
          console.log('password updated', newUserPassword);

          try {
            const user = await login(updatedEmail, updatedPassword);
            if (user) {
              setSendingData(false);
              console.log('user after updating pw', user);
              setUser(user);
              storeUserSessionToLocalStorage(user);
            }
          } catch (e) {
            console.log('error', e);
          }

          //call signin function and updated password here along
          //with local storage
        }
      } catch (e) {
        setSendingData(false);
        console.log('error', e);
      }
    }
  };

  console.log(user);
  return (
    <>
      <Form>
        <Form.Title>Edit Profile</Form.Title>

        <Form.Base onSubmit={updateGeneralInformation} method="POST">
          <Form.Input
            value={updatedFirstName}
            onChange={({ target }) => setUpdatedFirstName(target.value.trim())}
          />
          <Form.Input
            value={updatedLastName}
            onChange={({ target }) => setUpdatedLastName(target.value.trim())}
          />
          <Form.Input
            value={updatedEmail}
            onChange={({ target }) => setUpdatedEmail(target.value.trim())}
          />
          <Form.Submit type="submit" disabled={sendingData}>
            Update profile
          </Form.Submit>
        </Form.Base>
      </Form>

      <Form>
        <Form.Base onSubmit={updatePassword} method="POST">
          <Form.Input
            placeholder="Update password here..."
            value={updatedPassword}
            onChange={({ target }) => setUpdatedPassword(target.value.trim())}
          />

          <Form.Submit type="submit" disabled={sendingData}>
            Update password
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}
