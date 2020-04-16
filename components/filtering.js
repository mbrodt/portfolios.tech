const Filtering = ({ tags }) => {
  return (
    <div>
      I am filtering
      <ul>
        {tags.map((tag) => (
          <li>{tag.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Filtering;
