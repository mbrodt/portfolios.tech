import Router from "next/router";
import { GraphQLClient } from "graphql-request";
import { Dialog } from "@reach/dialog";

import Hero from "../components/hero";
import PortfolioList from "../components/portfolioList";
import AddPortfolio from "../components/addPortfolio";
import Filtering from "../components/filtering";

const Index = () => {
  const [portfolios, setPortfolios] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const endpoint = "https://api.portfolios.tech/v1/graphql";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "x-hasura-admin-secret": process.env.hasuraSecret,
      "x-hasura-role": "client",
    },
  });

  const GET_PORTFOLIOS_AND_TAGS = `
	query Portfolios {
		portfolios {
			title
			link
			id
			description
			image
			portfolio_tags {
				tag_value
			}
		}
		tags {
			value
		}
	}
	`;

  const ADD_PORTFOLIO = `
	mutation addPortfolio($title: String!, $description: String!, $link: String!, $image: String!, $portfolio_tags: portfolio_tags_arr_rel_insert_input!) {
		insert_portfolios(objects: {description: $description, image: $image, link: $link, title: $title, portfolio_tags: $portfolio_tags}) {
			returning {
				title
			}
		}
	}
	`;

  React.useEffect(() => {
    graphQLClient.request(GET_PORTFOLIOS_AND_TAGS).then((data) => {
      setPortfolios(data.portfolios);
      const tagsWithProperty = data.tags.map((tag) => {
        return {
          ...tag,
          isActive: false,
        };
      });
      setTags(tagsWithProperty);
    });
  }, []);

  const addPortfolio = (variables) => {
    console.log("commiting mutation with variables", variables);
    graphQLClient.request(ADD_PORTFOLIO, variables).then((data) => {
      console.log("returning data", data);
      // TODO show success message and reload page
      close();
    });
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Hero openDialog={open} />
      <Filtering tags={tags} />
      <Dialog
        aria-label="Add Portfolio dialog"
        className="max-w-lg relative rounded"
        isOpen={showDialog}
        onDismiss={close}
      >
        <button
          className="close-button absolute right-0 top-0 w-8 h-8"
          onClick={close}
        >
          <svg
            aria-hidden
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-gray-500"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <AddPortfolio
          addPortfolio={addPortfolio}
          tags={tags}
          setTags={setTags}
        />
      </Dialog>
      <PortfolioList portfolios={portfolios} />
    </div>
  );
};

export default Index;
