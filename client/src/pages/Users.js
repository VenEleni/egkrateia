import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import './Users.css';

const Users = () => {
  const { action } = useParams();

  return (
    <div>
      <h1>{action === 'register' ? 'Register' : 'Login'}</h1>
      <UserForm isRegister={action === 'register'} />
    </div>
  );
};

export default Users;
