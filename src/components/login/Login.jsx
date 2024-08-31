/** * @file Login.jsx
 * @description This is the file responsible for generating the login component, where you log in with a Google account at the beginning.
 * @date Created: 29/08/2024
 * @date Last Modified: 29/08/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 * @note None
*/

import './Login.css';

function GoogleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.35 11.1h-9.4v3.75h5.5c-.65 1.85-2.4 3.16-5.5 3.16-3.16 0-5.75-2.6-5.75-5.75s2.59-5.75 5.75-5.75c1.55 0 2.86.6 3.81 1.58L19.18 5c-1.56-1.46-3.59-2.35-5.83-2.35-5.02 0-9.08 4.07-9.08 9.09 0 5.02 4.06 9.09 9.08 9.09 4.53 0 8.33-3.22 8.33-8.05 0-.52-.06-.91-.18-1.32z"></path>
    </svg>
  );
}

export default function Login() {
  return (
    <div className="container">
      <div className="card">
        <img src="/src/assets/logo.png" alt="Eccode Studio Logo" style={{ width: '200px', height: 'auto', marginBottom: '1rem' }} />

        <h1>ECCODE STUDIO</h1>
        <p>INNOVATING FOR CLEAN AIR</p>

        <button className="button">
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
