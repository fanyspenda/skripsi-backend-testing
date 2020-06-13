import http from "k6/http";
import { check } from "k6";
import { token } from "./token.js";

const editAlumniRest = () => {
	const alumniParams = {
		headers: {
			authorization: `bearer ${token}`,
		},
	};

	const majorParams = {
		page: 1,
		limit: 0,
		headers: {
			authorization: `bearer ${token}`,
		},
	};

	const response = http.batch([
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/alumni/5ed6fd29f4d1fc26acad615b",
			null,
			alumniParams,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/major",
			null,
			majorParams,
		],
	]);

	check(response[0], {
		"is Response get Detail Alumni 200?": (r) => r.status === 200,
	});
	check(response[1], {
		"is Response get majors 200?": (r) => r.status === 200,
	});
};

export default editAlumniRest;
