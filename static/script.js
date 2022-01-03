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
	request.open("DELETE", proxyAddr + 'narocniki/' + userId, false);
	request.send(null);
	loadPageAllUsers();
}

// Prevozi
function loadPageAllPrevozi() {
	var prevozi = getPrevozi();
	var mainContent = "";
	
	mainContent += "<div><h2>Vsi prevozi</h2>";
	console.log(prevozi);
	for (var i = 0; i < prevozi["prevozi"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Od kje:" + prevozi["prevozi"][i]["od_lokacije"] + "</p>";
		mainContent += "<p> Do kje: " + prevozi["prevozi"][i]["do_lokacije"] + "</p>";
		mainContent += "<p><a href=\"javascript:deletePrevoz(" + prevozi["prevozi"][i]["id_prevoza"] + ");\">Zbrisi</a>";
		mainContent += "<p><a href=\"/static/voznik.html?id=" + prevozi["prevozi"][i]["id_prevoza"] + "\" ;\">Podrobnosti</a>";
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}

function describePrevoz() {
	console.log("Pozdravljena zvezda!")
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	mainContent = ""
	prevoz = getPrevoz(id)
	console.log(prevoz)
	mainContent += "<p> Od kje:" + prevoz["od_lokacije"] + "</p>";
	mainContent += "<p> Do kje: " + prevoz["do_lokacije"] + "</p>";
	mainContent += "<p> Uporabnik_prevoza: " + prevoz["uporabnik_prevoza"] + "</p>";
	mainContent += "<p> Prevoznik: " + prevoz["prevoznik"] + "</p>";
	mainContent += "<p> Status: " + prevoz["status"] + "</p>";
	mainContent += "<p> Strosek: " + prevoz["strosek"] + "</p>";
	document.getElementById("main_prevoz").innerHTML = mainContent;
}

function addPrevoz() {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "ponujeni_prevozi", false);
	request.setRequestHeader("Content-Type", "application/json");

	prevoznik = int(document.getElementById("prevoznik").value);
	uporabnik_prevoza = int(document.getElementById("upprevoza").value);
	od_kje = document.getElementById("odkje").value;
	do_kje = document.getElementById("dokje").value;
	strosek = int(document.getElementById("strosek").value);
	id_prevoza = Math.floor(Math.random() * 10000);
	prevoz_status = "na voljo";
	var prevoz = {id_prevoza: id_prevoza, prevoznik: prevoznik, uporabnik_prevoza: uporabnik_prevoza, od_lokacije: od_kje, do_lokacije: do_kje, status: prevoz_status, strosek: strosek, cas_odhoda: "20:20"};
	request.send(JSON.stringify(prevoz));
	loadPageAllPrevozi();
}

function getPrevozi() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "ponujeni_prevozi", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function getPrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + 'ponujeni_prevozi/' + prevozId, false);
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function deletePrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + 'ponujeni_prevozi/' + prevozId, false);
	request.send(null);
	loadPageAllUsers();
}


// 

function loadPageAllPlacila() {
	var placila = getPlacila();
	var mainContent = "";
	mainContent += "<div><h2>Vsa placila</h2>";
	console.log(placila);
	for (var i = 0; i < placila["placila"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> ID prejemnika:" + placila["placila"][i]["id_placnika"] + "</p>";
		mainContent += "<p> ID placnika: " + placila["placila"][i]["id_prejemnika"] + "</p>";
		mainContent += "<p> Znesek: " + placila["placila"][i]["znesek_eur"] + "</p>";
		mainContent += "<p> Znesek bitcoin: " + placila["placila"][i]["znesek_coin"] + "</p>";
		mainContent += "<p> Status: " + placila["placila"][i]["status"] + "</p>";
		mainContent += "<p><a href=\"javascript:deletePlacilo(" + placila["placila"][i]["id"] + ");\">Zbrisi</a>";
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main_placila").innerHTML = mainContent;
}

function getPlacila() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "placila", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function getPlacilo(placiloId) {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + 'placila/' + placiloId, false);
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function deletePlacilo(userId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + 'placila/' + userId, false);
	request.send(null);
	loadPageAllUsers();
}