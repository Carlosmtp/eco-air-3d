import { useState } from 'react';
import useAuthStore from './stores/use-auth-store';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerWithEmailAndPassword = useAuthStore((state) => state.registerWithEmailAndPassword);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerWithEmailAndPassword(email, password);
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </form>
  );
};

export default RegisterForm;
