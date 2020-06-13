import http from "k6/http";
import { check } from "k6";
import { token } from "./token.js";

const QUERY = `
    query getAlumniData {
        alumniDetail(id: \"5ed6fd29f4d1fc26acad615b\") {
            name
            major
            entry_year
            graduate_year
            email
            work_at
            work_position
            data_source
        }
        majorWithPagination {
            majors {
                name
            }
        }
    }
`;

const editAlumniGraphQL = () => {
	const headers = {
		authorization: `bearer ${token}`,
		"Content-Type": "application/json",
	};

	const alumniRes = http.post(
		"https://sialumni-backend-graphql.herokuapp.com/graphql",
		JSON.stringify({ query: QUERY }),
		{ headers: headers }
	);

	check(alumniRes, {
		"is response status 200": (r) => r.status === 200,
	});
};

export default editAlumniGraphQL;
