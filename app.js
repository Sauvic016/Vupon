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
		parseCoupons(response.data);
	}
);
var parseCoupons = function (coupons, domain) {
	try {
		//  In case there is no coupons
		var couponHTML = "";
		coupons.forEach(function (coupon, index) {
			couponHTML +=
				"<li>Code: " +
				coupon.code +
				" - <em>" +
				coupon.description +
				"</em></li>";
		});
		var couponDisplay = document.createElement("div");
		couponDisplay.className = "_coupon__list";
		couponDisplay.innerHTML =
			"<h1>Coupons</h1><p>List of coupons for: " +
			domain +
			"</p><ul>" +
			couponHTML +
			"</ul>";
		couponDisplay.style.cssText =
			"height:300px;width:300px;border-radius:3px;" +
			"border:1px solid;background:white;color:blue;" +
			"cursor:pointer;position:fixed;top:90px;right:5px;" +
			"z-index:99999999999;overflow:hidden;";
		couponDisplay.style.display = "none";
		document.body.appendChild(couponDisplay);
		var couponButton = document.createElement("div");
		couponButton.className = "_coupon__button";
		couponButton.style.cssText =
			"height:30px;width:30px;border-radius:100%;" +
			"border:1px solid;background:white;color:blue;" +
			"cursor:pointer;position:fixed;top:5px;right:5px;text-align:center;" +
			"z-index:99999999999;display:flex;justify-content:center;align-items:center;";
		couponButton.innerHTML = "💰";
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
			document.querySelector("._coupon__list").style.display = "block";
		});
};
