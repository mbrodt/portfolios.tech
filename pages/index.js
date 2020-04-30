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
		portfolios(order_by: {created_at: desc}) {
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
      const portfoliosWithProperty = data.portfolios.map((portfolio) => {
        const tags = portfolio.portfolio_tags.map((tag) => tag.tag_value);
        return {
          ...portfolio,
          tags: tags,
          isActive: true,
        };
      });
      setPortfolios(portfoliosWithProperty);
      setTags(data.tags);
    });
  }, []);

  const addPortfolio = (variables) => {
    console.log("commiting mutation with variables", variables);
    graphQLClient.request(ADD_PORTFOLIO, variables).then((data) => {
      // TODO show success message
      Router.reload();
      close();
    });
  };

  const handleTagClick = (clickedTag) => {
    const activePortfolios = portfolios.map((portfolio) => {
      if (portfolio.tags.includes(clickedTag)) {
        return {
          ...portfolio,
          isActive: true,
        };
      }
      return {
        ...portfolio,
        isActive: false,
      };
    });
    setPortfolios(activePortfolios);
  };

  return (
    <div className="min-h-screen bg-gray-200 pb-24">
      <Hero openDialog={open} />
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-gray-500"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <AddPortfolio addPortfolio={addPortfolio} tags={tags} />
      </Dialog>

      <PortfolioList
        handleTagClick={handleTagClick}
        portfolios={portfolios.filter((portfolio) => {
          return portfolio.isActive;
        })}
      />
    </div>
  );
};

export default Index;
