var proxyAddr = "http://34.149.11.70/";

function loadPageAllUsers() {
	var users = getUsers();
	console.log("Ola")
	var mainContent = "";
	
	mainContent += "<div><h2>Vsi uporabniki</h2>";
	console.log(users);
	for (var i = 0; i < users["narocniki"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Ime:" + users["narocniki"][i]["ime"] + "</p>";
		mainContent += "<p> Priimek: " + users["narocniki"][i]["priimek"] + "</p>";
		mainContent += "<p><a href=\"javascript:deleteUser(" + users["narocniki"][i]["id"] + ");\">Zbrisi</a>";
		mainContent += "<p><a href=\"/static/user.html?id=" + users["narocniki"][i]["id"] + "\" ;\">Podrobnosti</a>";
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}

function describeUser() {
	console.log("Pozdravljena zvezda!")
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	mainContent = ""
	user = getUser(id)
	console.log(user)
	mainContent += "<p> Ime:" + user["ime"] + "</p>";
	mainContent += "<p> Priimek: " + user["priimek"] + "</p>";
	mainContent += "<p> Uporabnisko ime: " + user["uporabnisko_ime"] + "</p>";
	mainContent += "<p> Stevilka: " + user["telefonska_stevilka"] + "</p>";
	document.getElementById("main_user").innerHTML = mainContent;
}

function addUser() {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "narocniki", false);
	request.setRequestHeader("Content-Type", "application/json");

	uporabnisko_ime = document.getElementById("uname").value
	ime = document.getElementById("fname").value
	priimek = document.getElementById("lname").value
	telefonska_stevilka = document.getElementById("mnum").value
	id = Math.floor(Math.random() * 10000)
	console.log("Pozdravljena zvezda!")
	var user = {ime: ime, priimek: priimek, id: id, uporabnisko_ime: uporabnisko_ime, telefonska_stevilka: telefonska_stevilka};
	console.log(user)
	request.send(JSON.stringify(user));
	loadPageAllUsers();
}

function getUsers() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "narocniki", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function getUser(userId) {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + 'narocniki/' + userId, false);
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function deleteUser(userId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + '/' + userId, false);
	request.send(null);
	loadPageAllUsers();
}

