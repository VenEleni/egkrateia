import React from 'react';
import { useParams } from 'react-router-dom';
// import UserForm from '../components/UserForm';
import './Users.css';
import LoginForm from '../components/LoginForm';

const Users = () => {
  const { action } = useParams();

  return (
    <div>
      <LoginForm isRegister={action === 'register'} />
    </div>
  );
};

export default Users;
