import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { getSearchParam } from '@utils/functions';
import { GET_REPOSITORY } from '@utils/consts';
import RepositoryCard from '../RepositoryCard/RepositoryCard';
import { IRepositoryAll } from '@interfaces/index';
import Preloader from '../Preloader/Preloader';

interface DataType {
  repository: IRepositoryAll;
}

const Repository = () => {
  const { search } = useLocation();

  const { loading, error, data } = useQuery<DataType>(GET_REPOSITORY, {
    variables: {
      owner: getSearchParam(search, 'owner'),
      name: getSearchParam(search, 'name'),
    },
  });

  return (
    <section className='repository'>
      {loading ? (
        <Preloader />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && <RepositoryCard card={data.repository} full={true} />
      )}
    </section>
  );
};

export default Repository;
