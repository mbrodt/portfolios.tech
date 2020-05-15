const PortfolioList = ({ portfolios, handleTagClick }) => {
  return (
    <div className="w-full max-w-8xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 row-gap-8 col-gap-4 md:gap-8 xl:gap-12">
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
            <div key={id} className="rounded bg-gray-300 shadow-2xl">
              <div className="relative flex justify-center items-center h-48 lg:h-64 group bg-cover">
                <div
                  className="w-full h-full absolute group-hover:opacity-25 transition-opacity ease-in duration-150"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
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
              <div className="px-4 pt-4 pb-6">
                <a
                  href={link}
                  target="_blank"
                  className="text-gray-800 font-bold text-2xl"
                >
                  {title}{" "}
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 inline text-gray-500 "
                  >
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>

                <ul className="mt-1">
                  {tags.map((tag) => (
                    <li
                      onClick={() => handleTagClick(tag.tag_value)}
                      key={tag.tag_value}
                      className="bg-indigo-200 text-indigo-700 text-xs font-bold uppercase inline-block
										leading-4 px-2 py-1 mr-1 mt-1 text-white rounded"
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
