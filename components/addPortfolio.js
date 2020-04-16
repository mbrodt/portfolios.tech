import Tags from "./tags";

const AddPortfolio = ({ addPortfolio, tags, setTags }) => {
  const [formTags, setFormTags] = React.useState([]);
  const [imgThumb, setImgThumb] = React.useState(null);
  const [state, setState] = React.useState({
    title: undefined,
    description: undefined,
    link: undefined,
    image: undefined, // TODO: default this to some placeholder
  });

  console.log("FORM TAGS", formTags);

  React.useEffect(() => {
    setFormTags(tags);
  }, [tags]);

  const handleChange = (e) => {
    const newState = {
      ...state,
      [e.target.name]: e.target.value,
    };
    setState(newState);
  };

  const onUploadImage = async (e) => {
    const img = e.target.files[0];

    // Create a thumbnail of the image
    const thumb = URL.createObjectURL(img);
    setImgThumb(thumb);

    // Upload image to Cloudinary
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "portfolios");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnbiaqcir/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    // Save the returned image URL in state (so it gets saved in the DB on submit)
    setState({
      ...state,
      image: file.secure_url,
    });
  };

  const handleTagClick = (clickedTag) => {
    console.log("CLICKED clickedTag", clickedTag);
    const updatedTags = formTags.map((tag) => {
      if (tag.value === clickedTag) {
        return {
          ...tag,
          isActive: !tag.isActive,
        };
      } else {
        return tag;
      }
    });
    setFormTags(updatedTags);
  };

  const submit = (e) => {
    e.preventDefault();
    const activeTags = formTags.filter((tag) => {
      return tag.isActive;
    });
    const mapped = activeTags.map((tag) => {
      return {
        tag_value: tag.value,
      };
    });
    console.log("activeTags:", activeTags);
    console.log("mapped:", mapped);

    const portfolio_tags = {
      portfolio_tags: {
        data: mapped,
      },
    };
    // "portfolio_tags": {"data": [{"tag_value": "Front-End"}, {"tag_value": "Back-End"}] }}
    // const portfolio_tags = {
    // 	data: [

    // 	]
    // }
    const test = {
      ...state,
      ...portfolio_tags,
    };
    addPortfolio(test);
  };

  return (
    <div>
      <h2 class="text-2xl font-bold">Add a portfolio</h2>
      <p>
        It can be your own, or anyone you found online that you think looks cool
      </p>
      <form onSubmit={submit}>
        <div className="flex flex-col mt-4">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            className="input"
            placeholder="Include the name of the portfolio creator"
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            className="input"
            placeholder="A short description"
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="label" htmlFor="link">
            Link
          </label>
          <input
            className="input"
            placeholder="The direct URL to the portfolio"
            type="text"
            name="link"
            value={state.link}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="label">Tags</label>
          <Tags tags={formTags} handleTagClick={handleTagClick} />
        </div>
        <div className="flex flex-col mt-4">
          <label className="label mb-1" htmlFor="image">
            Image
          </label>
          {!imgThumb ? (
            <label class="w-full flex flex-col items-center px-4 py-6 bg-white text-indigo-500 rounded shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-200 hover:text-indigo-700">
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input type="file" class="hidden" onChange={onUploadImage} />
            </label>
          ) : (
            <img src={imgThumb} alt="Upload preview" />
          )}
        </div>

        <button
          type="submit"
          className="btn mt-8 block w-full text-center px-6 py-4 text-xl leading-6 font-semibold  "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
