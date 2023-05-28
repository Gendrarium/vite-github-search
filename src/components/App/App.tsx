import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Repository from '../Repository/Repository';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import { useAppDispatch } from '@/store/store';
import { getUser } from '@/store/user/actions';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/repository' element={<Repository />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
};

export default App;
