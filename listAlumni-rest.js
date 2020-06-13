import http from "k6/http";
import { check } from "k6";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJsZXZlbCI6MCwiaWF0IjoxNTkxOTM4MDI1LCJleHAiOjE1OTIwMjQ0MjV9.mUhh_CVU-Kvue0v2HZiCCjW4OAPz71JmwmEeBC48Gww";

const alumniRest = () => {
	const params = {
		page: 1,
		limit: 40,
		headers: {
			authorization: `bearer ${token}`,
		},
	};

	const alumniRes = http.get(
		"https://sialumni-backend-rest.herokuapp.com/alumni",
		params
	);
	const linkedinRes = http.get(
		"https://sialumni-backend-rest.herokuapp.com/alumniLinkedin",
		params
	);
	check(linkedinRes, {
		"is linkedin alumni status 200": (r) => r.status === 200,
	});
	check(alumniRes, {
		"is alumni status 200": (r) => r.status === 200,
	});
};

export default alumniRest;
