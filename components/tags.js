const Tags = ({ tags, handleTagClick }) => {
  return (
    <div>
      {tags.map((tag) => (
        <li
          key={tag.value}
          onClick={() => {
            handleTagClick(tag.value);
          }}
          className={`text-xs font-bold uppercase inline-block
					leading-4 px-2 py-1 mx-1 mt-2 rounded cursor-pointer ${
            tag.isActive
              ? "bg-indigo-200 text-indigo-700 "
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {tag.value}
        </li>
      ))}
    </div>
  );
};

export default Tags;
