import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRepository, IRepositoryAll } from '@interfaces/index';

interface RepositoryCardProps {
  card: IRepository | IRepositoryAll;
  full?: boolean;
}

const RepositoryCard: React.FC<RepositoryCardProps> = memo(({ card, full }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenCard = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.target.id !== 'link') {
        navigate(`/repository?owner=${card.owner.login}&name=${card.name}`);
      }
    },
    [card.name, card.owner.login, navigate],
  );

  return (
    <article
      className={`card${full ? ' card_full' : ''}`}
      onClick={location.pathname === '/' ? handleOpenCard : undefined}>
      <h2 className='card__title'>{card.name}</h2>
      <div
        className={`card__full-container${
          full ? ' card__full-container_full' : ''
        }`}>
        <div className='card__grid-container'>
          <h3 className='card__grid-title'>Количество звезд:</h3>
          <p className='card__grid-subtitle'>{card.stargazerCount}</p>
          <h3 className='card__grid-title'>Последний коммит:</h3>
          <p className='card__grid-subtitle'>
            {new Date(card.updatedAt).toLocaleString('ru-ru', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            })}
          </p>
          <h3 className='card__grid-title'>Ссылка на гитхаб:</h3>
          <a
            id='link'
            target='_blank'
            href={card.url}
            className='card__grid-link'>
            {card.url}
          </a>
          {full && (
            <>
              <h3 className='card__grid-title'>Исп. языки:</h3>
              <p className='card__grid-subtitle'>
                {(card as IRepositoryAll).languages.languages.map((i, id) => (
                  <span key={id}>{id !== 0 && ', '}{i.language.name}</span>
                ))}
              </p>
              <h3 className='card__grid-title'>Описание:</h3>
              <p className='card__grid-subtitle'>{card.description}</p>
            </>
          )}
        </div>
        {full && (
          <div className='card__user-container'>
            <div className='card__avatar-container'>
              <h3 className='card__title'>Автор:</h3>
              {(card as IRepositoryAll).owner.avatarUrl && (
                <img
                  className='card__avatar'
                  src={(card as IRepositoryAll).owner.avatarUrl}
                />
              )}
            </div>
            <div className='card__user-info'>
              <div className='card__grid-container card__grid-container_full'>
                <h3 className='card__grid-title'>Логин:</h3>
                <p className='card__grid-subtitle'>{card.owner.login}</p>
                <h3 className='card__grid-title'>Ссылка:</h3>
                <a
                  id='link'
                  target='_blank'
                  href={(card as IRepositoryAll).owner.url}
                  className='card__grid-link'>
                  {(card as IRepositoryAll).owner.url}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
});

export default RepositoryCard;
