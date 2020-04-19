const PortfolioList = ({ portfolios, handleTagClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-3 gap-8">
        {portfolios.map((portfolio) => {
          const {
            id,
            title,
            link,
            description,
            image,
            portfolio_tags: tags,
          } = portfolio;
          return (
            <div key={id} className="rounded">
              <div className="relative flex justify-center items-center h-64 group">
                <img
                  className="absolute h-full group-hover:opacity-25 transition-opacity ease-in duration-150"
                  src={image}
                  alt=""
                />
                <div className="relative z-10 opacity-0 group-hover:opacity-100 text-center p-4 transition-opacity ease-in duration-150">
                  <p className="text-gray-800 text-xl font-bold">
                    {description}
                  </p>
                  <a
                    className="btn py-1 px-4 mt-4 inline-block"
                    target="_blank"
                    href={link}
                  >
                    Visit &rarr;
                  </a>
                </div>
              </div>
              <div className="p-2">
                <h4 className="text-gray-800 font-bold text-2xl">{title}</h4>

                <ul>
                  {tags.map((tag) => (
                    <li
                      onClick={() => handleTagClick(tag.tag_value)}
                      key={tag.tag_value}
                      className="bg-indigo-200 text-indigo-700 text-xs font-bold uppercase inline-block
										leading-4 px-2 py-1 mx-1 text-white mt-2 rounded"
                    >
                      {tag.tag_value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioList;
