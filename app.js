//  Get the current Domain
var domain = window.location.hostname;
domain = domain
	.replace("http://", "")
	.replace("https://", "")
	.replace("www.", "")
	.split(/[/?#]/)[0];

chrome.runtime.sendMessage(
	{ command: "fetch", data: { domain: domain } },
	(response) => {
		//  response from the database (background.html > firebase.js)
	}
);
