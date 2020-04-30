const Hero = ({ openDialog }) => (
  <div className="h-40vh sm:h-70vh relative flex items-center justify-center">
    <img
      className="absolute h-full w-full object-cover"
      src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      alt="Example portfolio hero"
      style={{ filter: "brightness(0.3)" }}
    />
    <div className="relative text-center text-white">
      <h1 className="text-4xl xl:text-6xl font-bold leading-none">
        Portfolios.tech
      </h1>
      <p className="text-lg sm:text-xl xl:text-2xl mt-2">
        A curated list of technical portfolios
      </p>
      <button
        onClick={openDialog}
        className="btn  sm:text-2xl py-2 sm:py-3  px-4 sm:px-6 font-semibold leading-relaxed mt-6 inline-flex items-center"
      >
        Add yours{" "}
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="ml-2 w-4 h-4 sm:w-6 sm:h-6"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </div>
  </div>
);

export default Hero;
