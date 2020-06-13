import http from "k6/http";
import { check } from "k6";
import { token } from "./token.js";

const alumniRest = () => {
	const params = {
		page: 1,
		limit: 40,
		headers: {
			authorization: `bearer ${token}`,
		},
	};

	const response = http.batch([
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/alumni",
			null,
			params,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/alumniLinkedin",
			null,
			params,
		],
	]);

	check(response[0], {
		"is alumni status 200": (r) => r.status === 200,
	});
	check(response[1], {
		"is linkedin alumni status 200": (r) => r.status === 200,
	});
};

export default alumniRest;
