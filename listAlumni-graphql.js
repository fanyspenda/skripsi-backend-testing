import http from "k6/http";
import { check } from "k6";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJsZXZlbCI6MCwiaWF0IjoxNTkxOTM4MDI1LCJleHAiOjE1OTIwMjQ0MjV9.mUhh_CVU-Kvue0v2HZiCCjW4OAPz71JmwmEeBC48Gww";

const QUERY = `
query allAlumni {
	alumniWithPagination(page: 1, limit: 40) {
		alumni {
			_id
			name
			work_at
			work_position
			email
			data_source
		}
		alumniPage {
			totalPage
			pages {
				page
				skip
			}
		}
		totalData
	}
	linkedinWithPagination(page: 1, limit: 40) {
		alumniLinkedin {
			_id
			name
			work_at
			work_position
			email
			data_source
		}
		linkedinPage {
			totalPage
			pages {
				page
				skip
			}
		}
		totalData
	}
}`;

const alumniGraphQL = () => {
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
		"is status 200": (r) => r.status === 200,
	});
};

export default alumniGraphQL;
