import React from 'react';

function PortfolioCard({ portfolio }) {
  const {
    id,
    title,
    link,
    description,
    image,
    portfolio_tags: tags,
  } = portfolio;
  return (
    <div key={id} className='rounded bg-gray-300 shadow-2xl flex flex-col'>
      <img
        class='w-full h-full sm:h-48 lg:h-64 object-cover'
        src={image}
        alt='Portfolio screenshot'
      />
      <div className='px-4 pt-4 pb-6 flex flex-col flex-1'>
        <a
          href={link}
          target='_blank'
          className='text-gray-800 font-bold text-2xl'
        >
          {title}{' '}
          <svg
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            stroke='currentColor'
            viewBox='0 0 24 24'
            className='w-4 h-4 inline text-gray-500 '
          >
            <path d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'></path>
          </svg>
        </a>
        <p class='text-gray-700 mt-2 mb-4 flex-1'>{description}</p>

        <ul className='mt-1'>
          {tags.map((tag) => (
            <li
              onClick={() => handleTagClick(tag.tag_value)}
              key={tag.tag_value}
              className='bg-indigo-200 text-indigo-700 text-xs font-bold uppercase inline-block
   				leading-4 px-2 py-1 mr-1 mt-1 text-white rounded'
            >
              {tag.tag_value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PortfolioCard;
