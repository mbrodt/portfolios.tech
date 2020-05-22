import PortfolioCard from './portfolioCard';

const PortfolioList = ({ portfolios, handleTagClick }) => {
  return (
    <div className='w-full max-w-8xl mx-auto mt-8 px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 row-gap-8 col-gap-4 md:gap-8 xl:gap-12'>
        {portfolios.map((portfolio) => {
          const {
            id,
            title,
            link,
            description,
            image,
            portfolio_tags: tags,
          } = portfolio;
          return <PortfolioCard portfolio={portfolio} />;
        })}
      </div>
    </div>
  );
};

export default PortfolioList;
