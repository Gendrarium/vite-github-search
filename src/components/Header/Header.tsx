import { useAppSelector } from '@/store/store';
import { selectUserLogin } from '@/store/user/selectors';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useAppSelector(selectUserLogin);
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div className='header__full-container'>
        <h2
          className='header__title'
          onClick={() => {
            navigate('/');
          }}>
          Github Search
        </h2>
        <p className='header__subtitle'>{user && user}</p>
      </div>
    </header>
  );
};

export default Header;
