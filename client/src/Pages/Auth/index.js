
import AuthForm from '../../Components/AuthForm/index';
import AuthServices from '../../Components/AuthServices/index';
import './index.css';

const Auth = () => {
  return (
      <div className="Auth">
          <div className="AuthContainer">
            <AuthForm type='register' />
            <AuthServices />
          </div>
    </div>
  );
};

export default Auth;
