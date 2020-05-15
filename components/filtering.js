const Filtering = ({ tags, handleTagClick }) => {
  const [activeTag, setActiveTag] = React.useState(null);
  return (
    <div className="w-11/12 max-w-3xl mx-auto -mt-12 mb-16">
      <div className="bg-white rounded shadow-xl z-10 px-6 py-6 sm:py-8 relative">
        <p className="text-center text-sm sm:text-base text-gray-600">
          Select a category to filter for
        </p>
        <ul className="flex flex-wrap space-x-2 justify-center mt-2">
          {tags.map((tag) => (
            <li
              className={`text-lg sm:text-xl lg:text-2xl
								 cursor-pointer text-gray-600 ${
                   tag.value === activeTag
                     ? "text-indigo-600 border-b border-indigo-600"
                     : ""
                 }`}
              onClick={() => {
                handleTagClick(tag.value);
                setActiveTag(tag.value);
              }}
              key={tag.value}
            >
              {tag.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filtering;
