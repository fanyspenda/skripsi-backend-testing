import http from "k6/http";
import { check } from "k6";
import { token } from "./token.js";

const QUERY = `
    query counter {
        countWorkingAlumni
        countNotWorkingAlumni
        countTotalAlumni
        countLinkedin
        countAlumniManual
    }
`;

const dashboardGraphQL = () => {
	const headers = {
		authorization: `bearer ${token}`,
		"Content-Type": "application/json",
	};

	const response = http.post(
		"https://sialumni-backend-graphql.herokuapp.com/graphql",
		JSON.stringify({ query: QUERY }),
		{ headers: headers }
	);

	check(response, {
		"is response 200?": (r) => r.status === 200,
	});
};

export default dashboardGraphQL;
