import Tags from "./tags";
import { useForm } from "react-hook-form";

const AddPortfolio = ({ addPortfolio, tags }) => {
  const [formTags, setFormTags] = React.useState([]);
  const [imgThumb, setImgThumb] = React.useState(null);
  const [state, setState] = React.useState({
    title: undefined,
    description: undefined,
    link: undefined,
    image: undefined, // TODO: default this to some placeholder
  });
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();

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
    setIsUploadingImage(true);
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

    setIsUploadingImage(false);
  };

  const handleTagClick = (clickedTag) => {
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

  const submit = () => {
    let linkWithProtocol = state.link;
    const linkStartsWithProtocol =
      state.link.startsWith("http://") || state.link.startsWith("https://");

    // If the link doesn't start with the protocol, eg. the user just wrote "madsbrodt.com", we add the protocol here
    if (!linkStartsWithProtocol) {
      linkWithProtocol = `http://${state.link}`;
    }

    // Get all the currently active tags for this submission
    const activeTags = formTags.filter((tag) => {
      return tag.isActive;
    });

    // Map the active tags to the format expected by the database
    const mappedTags = activeTags.map((tag) => {
      return {
        tag_value: tag.value,
      };
    });

    const portfolio_tags = {
      portfolio_tags: {
        data: mappedTags,
      },
    };

    const newPortfolio = {
      ...state,
      link: linkWithProtocol,
      ...portfolio_tags,
    };
    addPortfolio(newPortfolio);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700">Add a portfolio</h2>
      <p className="text-gray-700">
        It can be your own, or anyone you found online that you think looks cool
      </p>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col mt-4">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            className="input"
            placeholder="Include the name of the portfolio creator"
            type="text"
            name="title"
            ref={register({
              required: true,
            })}
            value={state.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="input-error">This field is required</p>
          )}
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
            ref={register({
              required: true,
            })}
            value={state.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="input-error">This field is required</p>
          )}
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
            ref={register({
              required: true,
            })}
            value={state.link}
            onChange={handleChange}
          />
          {errors.link && (
            <p className="input-error">
              This field is required, and must be a valid link
            </p>
          )}
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
            <>
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-indigo-500 rounded tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-200 hover:text-indigo-700">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  type="file"
                  name="file"
                  ref={register({
                    required: true,
                  })}
                  className="hidden"
                  onChange={onUploadImage}
                />
              </label>
              {errors.file && (
                <p className="input-error">You must upload an image</p>
              )}
            </>
          ) : (
            <img src={imgThumb} alt="Upload preview" />
          )}
        </div>

        <button
          type="submit"
          className={`btn mt-8 block w-full text-center px-6 py-4 text-xl leading-6 font-semibold ${
            isUploadingImage ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isUploadingImage}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
