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
		parseCoupons(response.data, domain);
	}
);
var parseCoupons = function (coupons, domain) {
	try {
		//  In case there is no coupons
		var couponHTML = "";
		coupons.forEach(function (coupon, index) {
			couponHTML += `<li><span class='code'>${coupon.code}</span>
				<p> ➡️ ${coupon.description}</p></li>`;
		});

		var couponDisplay = document.createElement("div");
		couponDisplay.className = "_coupon__list";
		couponDisplay.innerHTML = `<h1>Coupons</h1><p>Browse coupons below that have been used for <strong>${domain}</strong></p>
			<p style = 'font-style:italic;'>Click any coupon to copy &amp; use</p>
			<ul>${couponHTML}</ul>`;
		couponDisplay.style.display = "none";
		document.body.appendChild(couponDisplay);

		var couponButton = document.createElement("div");
		couponButton.className = "_coupon__button";
		couponButton.innerHTML = "C";
		document.body.appendChild(couponButton);
		createEvents();
	} catch (e) {
		console.log("No coupons found for this domain", e);
	}
};
var createEvents = function () {
	document
		.querySelector("._coupon__button")
		.addEventListener("click", function (event) {
			if (
				document.querySelector("._coupon__list").style.display ==
				"block"
			) {
				document.querySelector("._coupon__list").style.display = "none";
			} else {
				document.querySelector("._coupon__list").style.display =
					"block";
			}
		});
};
