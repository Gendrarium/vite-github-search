import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import type { IRepository } from '@interfaces/index';

import RepositoryCard from '../RepositoryCard/RepositoryCard';
import Preloader from '../Preloader/Preloader';
import Paginator from '../Paginator/Paginator';
import { useAppSelector } from '@/store/store';
import { selectAuthChecking, selectUserLogin } from '@/store/user/selectors';
import { GET_REPOSITORIES } from '@utils/consts';
import { createArrayFromNumber } from '@/utils/functions';

interface DataType {
  cursor: string;
  repo: IRepository;
}

type Page = {
  currentPage: number;
  allPages: number[];
  loading: boolean;
  firstReload: boolean;
};

const Search: React.FC = () => {
  const [getSearch, { error, data, fetchMore }] = useLazyQuery<{
    search: { repos: DataType[] };
  }>(GET_REPOSITORIES);
  const [sortedData, setSortedData] = useState<DataType[] | undefined>(
    undefined,
  );
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<Page>({
    currentPage: 1,
    allPages: [],
    loading: true,
    firstReload: true,
  });
  const [apolloLoading, setApolloLoading] = useState<boolean>(true);
  const userLogin = useAppSelector(selectUserLogin);
  const authChecking = useAppSelector(selectAuthChecking);

  const handleChangePage = useCallback(
    (p: number) => {
      if (data) {
        setPage((prev) => {
          const lastPage = prev.allPages[prev.allPages.length - 1];
          if (lastPage - p < 5 && lastPage >= 10) {
            const after =
              data.search.repos[data.search.repos.length - 1].cursor;
            setApolloLoading(true);
            fetchMore({ variables: { after } }).finally(() => {
              setApolloLoading(false);
            });
          }
          return {
            ...prev,
            currentPage: p,
          };
        });

        window.scroll(0, 0);
      }
    },
    [data, fetchMore],
  );

  // change page and sort data
  useEffect(() => {
    if (!page.firstReload) {
      if (data) {
        setPage((prev) => {
          return {
            ...prev,
            allPages: createArrayFromNumber(
              Math.ceil(data.search.repos.length / 10),
            ),
          };
        });
      } else {
        setPage((prev) => {
          return {
            ...prev,
            currentPage: 1,
            allPages: [],
          };
        });
      }
    }
  }, [data, page.firstReload]);

  // sort data
  useEffect(() => {
    if (!page.firstReload) {
      if (data) {
        setSortedData(
          data.search.repos.slice(
            (page.currentPage - 1) * 10,
            10 + (page.currentPage - 1) * 10,
          ),
        );
      } else {
        setSortedData(data);
      }
    }
  }, [data, page.currentPage, page.firstReload]);

  // delay for search
  useEffect(() => {
    if (!page.firstReload) {
      let delayDebounceFn: NodeJS.Timeout | undefined;

      if (query) {
        delayDebounceFn = setTimeout(() => {
          setApolloLoading(true);
          getSearch({ variables: { search: query } }).finally(() => {
            setApolloLoading(false);
          });
        }, 500);
      } else if (userLogin) {
        setApolloLoading(true);
        getSearch({ variables: { search: `user:${userLogin}` } }).finally(
          () => {
            setApolloLoading(false);
          },
        );
      }

      return () => clearTimeout(delayDebounceFn);
    }
  }, [getSearch, page.firstReload, query, userLogin]);

  // save query and page
  useEffect(() => {
    if (!page.firstReload) {
      localStorage.setItem('query', query);
      localStorage.setItem('currentPage', String(page.currentPage));
    }
  }, [page.currentPage, page.firstReload, query]);

  // load query and page
  useEffect(() => {
    const loadAllData = async () => {
      if (page.firstReload && userLogin) {
        const pastQuery = localStorage.getItem('query');
        const pastCurrentPage = localStorage.getItem('currentPage');
        if (pastQuery && pastCurrentPage) {
          const res = await getSearch({ variables: { search: pastQuery } });
          if (Number(pastCurrentPage) * 10 > 100) {
            if (res.data) {
              const resRepos = res.data.search.repos;
              let cursor: string = resRepos[resRepos.length - 1].cursor;
              const i = Math.ceil((Number(pastCurrentPage) * 10) / 100);

              for (let o = 1; o < i; o++) {
                const r = await fetchMore({ variables: { after: cursor } });
                if (r.data) {
                  const rRepos = r.data.search.repos;
                  cursor = rRepos[rRepos.length - 1].cursor;
                }
              }
            }
          }
          setQuery(pastQuery);
        }
        setPage((prev) => {
          const p = { ...prev, firstReload: false, loading: false };
          if (pastCurrentPage) {
            return { ...p, currentPage: Number(pastCurrentPage) };
          }
          return p;
        });
      }
    };

    loadAllData();
  }, [fetchMore, getSearch, page.firstReload, userLogin]);

  return (
    <section className='search'>
      {!page.loading && (
        <form className='search__form'>
          <input
            className='search__input'
            placeholder='Введите запрос'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query || ''}
          />
        </form>
      )}
      <div className='search__data-container'>
        {apolloLoading || authChecking || page.loading ? (
          <Preloader />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : sortedData && sortedData.length > 0 ? (
          sortedData.map(({ repo }, id) => (
            <RepositoryCard key={id} card={repo} />
          ))
        ) : (
          <p>Ничего не найдено!</p>
        )}
      </div>
      {!(apolloLoading || authChecking || page.loading) && (
        <Paginator
          pages={page.allPages}
          currentPage={page.currentPage}
          handleChangePage={handleChangePage}
        />
      )}
    </section>
  );
};

export default Search;
