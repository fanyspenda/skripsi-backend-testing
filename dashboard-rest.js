import http from "k6/http";
import { check } from "k6";
import { token } from "./token.js";

const dashboardRest = () => {
	const params = {
		headers: {
			authorization: `bearer ${token}`,
		},
	};

	const response = http.batch([
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/counter/countAll",
			null,
			params,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/counter/countWorking",
			null,
			params,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/counter/countNotWorking",
			null,
			params,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/counter/countLinkedin",
			null,
			params,
		],
		[
			`GET`,
			"https://sialumni-backend-rest.herokuapp.com/counter/countAlumni",
			null,
			params,
		],
	]);

	check(response[0], {
		"is response CountAll 200?": (r) => r.status === 200,
	});
	check(response[1], {
		"is response countWorking 200?": (r) => r.status === 200,
	});
	check(response[2], {
		"is response countNotWorking 200?": (r) => r.status === 200,
	});
	check(response[3], {
		"is response countLinkedin 200?": (r) => r.status === 200,
	});
	check(response[4], {
		"is response countAlumni 200?": (r) => r.status === 200,
	});
};

export default dashboardRest;
