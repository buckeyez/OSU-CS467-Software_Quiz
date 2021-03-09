import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
//import { useHistory } from 'react-router-dom';
//import * as ROUTES from '../constants/routes';
import { Form } from '../components';
import validator from 'validator';
import { updateUser, updateUserPassword, deleteAdminUser } from '../utils/updateUser';
import { storeUserSessionToLocalStorage } from '../utils/storeSession';
import { login } from '../utils/loginUser';
import {
  EditProfileInputStyle,
  EditFormMarginTop,
  EditFormBaseStyle,
} from '../pages/styles/customPageStyles';
import { Button } from '../components/QuizCard/styles/QuizCard';

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  //const history = useHistory();
  const [updatedFirstName, setUpdatedFirstName] = useState(user.firstName);
  const [updatedLastName, setUpdatedLastName] = useState(user.lastName);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [sendingData, setSendingData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  const updateGeneralInformation = async (event) => {
    event.preventDefault();

    const isValidEmail = validator.isEmail(updatedEmail);

    if (updatedFirstName === '' || updatedLastName === '') {
      setError(true);
      return;
    }

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
        setSuccess(false);
        setError(false);
        const updatedUser = await updateUser(updatedInforamtion);
        if (updatedUser) {
          setSendingData(false);
          setSuccess(true);
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
    } else {
      setError(true);
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
        setSuccess(false);
        setSendingData(true);
        setError(false);
        const newUserPassword = await updateUserPassword(user.id, updatedPassword);
        if (newUserPassword === 200) {
          console.log('password updated', newUserPassword);

          try {
            const user = await login(updatedEmail, updatedPassword);
            if (user) {
              setSendingData(false);
              setSuccess(true);
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
    } else {
      setError(true);
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDeleteAccount(!confirmDeleteAccount);
  };

  const handleDeleteAccount = async (userID) => {
    if (!confirmDeleteAccount) {
      return;
    }

    try {
      setSendingData(true);
      const deletedAdminAccount = await deleteAdminUser(userID);

      if (deletedAdminAccount === 200) {
        setSendingData(false);
        localStorage.removeItem('userData');
        window.location.reload();
      }
    } catch (e) {
      setSendingData(false);
      console.log(e);
    }
  };

  // console.log(user);
  return (
    <>
      <Form>
        <Form.Title>Edit Profile</Form.Title>

        <Form.Base onSubmit={updateGeneralInformation} method="POST">
          <div style={{ ...EditFormBaseStyle }}>
            <Form.FormLabel>
              First Name:
              <Form.Input
                value={updatedFirstName}
                onChange={({ target }) => setUpdatedFirstName(target.value.trim())}
                style={{ ...EditProfileInputStyle }}
              />
            </Form.FormLabel>
            <Form.FormLabel>
              Last Name:
              <Form.Input
                value={updatedLastName}
                onChange={({ target }) => setUpdatedLastName(target.value.trim())}
                style={{ ...EditProfileInputStyle }}
              />
            </Form.FormLabel>

            <Form.FormLabel>
              Email Address:
              <Form.Input
                value={updatedEmail}
                onChange={({ target }) => setUpdatedEmail(target.value.trim())}
                style={{ ...EditProfileInputStyle }}
              />
            </Form.FormLabel>
          </div>
          <Form.Submit type="submit" disabled={sendingData}>
            Update Profile
          </Form.Submit>
        </Form.Base>
      </Form>

      <Form>
        <Form.Base onSubmit={updatePassword} method="POST">
          <div style={{ ...EditFormBaseStyle }}>
            <Form.FormLabel>
              Password:
              <Form.Input
                placeholder="Update password here..."
                value={updatedPassword}
                onChange={({ target }) => setUpdatedPassword(target.value.trim())}
                style={{ ...EditProfileInputStyle, ...EditFormMarginTop }}
              />
            </Form.FormLabel>
          </div>
          <Form.Submit type="submit" disabled={sendingData}>
            Update Password
          </Form.Submit>
        </Form.Base>
      </Form>

      <Form>
        <Form.Base>
          <Form.TextSmall style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '50px' }}>
            NOTE: The below action CANNOT BE UNDONE. You will be taken back to the sign-in page.
          </Form.TextSmall>
          <div>
            <Form.FormLabel>
              <Form.Input
                type="checkbox"
                onChange={() => {
                  handleConfirmDelete();
                }}
              ></Form.Input>
              Confirm that you want to delete your account.
            </Form.FormLabel>
          </div>
        </Form.Base>
        <Form.Submit
          disabled={!confirmDeleteAccount}
          style={{ color: '#e53935', fontWeight: 'bold', marginTop: '5px' }}
          onClick={() => {
            handleDeleteAccount(user.id);
          }}
        >
          Delete Account
        </Form.Submit>
      </Form>

      {success && <p>Profile successfully updated.</p>}
      {error && (
        <p>
          One or more of the required fields are empty, or you've entered an invalid email/password.
          A valid password must be 8 characters long, contain at least 1 non-alpha ,1 uppercase and
          1 lowercase character.
        </p>
      )}
    </>
  );
}
