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
	mainContent += "<p> Ime: " + user["ime"] + "</p>";
	mainContent += "<p> Priimek: " + user["priimek"] + "</p>";
	mainContent += "<p> Uporabnisko ime: " + user["uporabnisko_ime"] + "</p>";
	mainContent += "<p> Stevilka: " + user["telefonska_stevilka"] + "</p>";
	if(user["ocena"] != -1){
		mainContent += "<p> Ocena: " + user["ocena"] + "</p>";
	}
	document.getElementById("main_user").innerHTML = mainContent;
}

function spremeniUporabnika(){
	var request = new XMLHttpRequest();

	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	request.open("PUT", proxyAddr + "narocniki/" + id, false);
	request.setRequestHeader("Content-Type", "application/json");

	vrednost = document.getElementById("userocena").value
	var user = {atribut: "ocena", vrednost: vrednost};
	request.send(JSON.stringify(user));
	console.log(JSON.stringify(user));
	describeUser();
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
	var user = {ime: ime, priimek: priimek, id: id, uporabnisko_ime: uporabnisko_ime, telefonska_stevilka: telefonska_stevilka, ocena: -1};
	console.log(user)
	request.send(JSON.stringify(user));
	if(request.status != 201){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
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
		mainContent += "<p> Start: " + prevozi["prevozi"][i]["cas_odhoda"] + "</p>";
		mainContent += "<p> Pricakovano trajanje: " + prevozi["prevozi"][i]["cas_prihoda"] + "</p>";
		mainContent += '<form action=\"javascript:addAktivniPrevoz('+ prevozi["prevozi"][i]["id_prevoza"] + ",\'abaupid" + i + "\');\">"
		mainContent += '<label for="abaupid">Stranka:</label><br>'
  		mainContent += '<input type="text" id="abaupid' + i + '" name="abaupid" value=\"42\"><br><br>'
 		mainContent += '<input type="submit" value="Aktiviraj"></input></form>'
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
	mainContent += "<p> Start: " + prevoz["cas_odhoda"] + "</p>";
	mainContent += "<p> Pricakovano trajanje: " + prevoz["cas_prihoda"] + "</p>";
	mainContent += "<p> Status: " + prevoz["status"] + "</p>";
	mainContent += "<p> Strosek: " + prevoz["strosek"] + "</p>";
	document.getElementById("main_prevoz").innerHTML = mainContent;
}

function addPrevoz() {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "ponujeni_prevozi", false);
	request.setRequestHeader("Content-Type", "application/json");

	prevoznik = parseInt(document.getElementById("prevoznik").value);
	uporabnik_prevoza = -1;
	od_kje = document.getElementById("odkje").value;
	do_kje = document.getElementById("dokje").value;
	strosek = parseInt(document.getElementById("strosek").value);
	id_prevoza = Math.floor(Math.random() * 10000);
	prevoz_status = "na voljo";
	start = document.getElementById("start").value;
	var prevoz = {id_prevoza: id_prevoza, prevoznik: prevoznik, uporabnik_prevoza: uporabnik_prevoza, od_lokacije: od_kje, do_lokacije: do_kje, status: prevoz_status, strosek: strosek, cas_odhoda: start};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	if(request.status != 201){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
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
	loadPageAllPrevozi();
}


// 

function loadPageAllPlacila() {
	var placila = getPlacila();
	var mainContent = "";
	mainContent += "<div><h2>Vsa placila</h2>";
	console.log(placila);
	for (var i = 0; i < placila["placila"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> ID placila:" + placila["placila"][i]["id"] + "</p>";
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
	loadPageAllPlacila();
}

// Vsi iskani prevozi
// Prevozi
function loadPageAllIskaniPrevozi() {
	var prevozi = getIskaniPrevozi();
	var mainContent = "";
	
	mainContent += "<div><h2>Vsi iskani prevozi</h2>";
	console.log(prevozi);
	for (var i = 0; i < prevozi["prevozi"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Od kje:" + prevozi["prevozi"][i]["od_lokacije"] + "</p>";
		mainContent += "<p> Do kje: " + prevozi["prevozi"][i]["do_lokacije"] + "</p>";
		mainContent += "<p><a href=\"javascript:deleteIskanPrevoz(" + prevozi["prevozi"][i]["id_prevoza"] + ");\">Zbrisi</a>";
		mainContent += "<p><a href=\"/static/iskan.html?id=" + prevozi["prevozi"][i]["id_prevoza"] + "\" ;\">Podrobnosti</a>";		
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}


function addIskanPrevoz() {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "iskani_prevozi", false);
	request.setRequestHeader("Content-Type", "application/json");

	prevoznik = -1;
	uporabnik_prevoza = parseInt(document.getElementById("pupprevoza").value);
	od_kje = document.getElementById("podkje").value;
	do_kje = document.getElementById("pdokje").value;
	strosek = parseInt(document.getElementById("pstrosek").value);
	id_prevoza = Math.floor(Math.random() * 10000);
	prevoz_status = "na voljo";
	var prevoz = {id_prevoza: id_prevoza, prevoznik: prevoznik, uporabnik_prevoza: uporabnik_prevoza, od_lokacije: od_kje, do_lokacije: do_kje, status: prevoz_status, strosek: strosek, cas_odhoda: "20:20"};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	if(request.status != 201){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
	loadPageAllIskaniPrevozi();
}

function getIskaniPrevozi() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "iskani_prevozi", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function getIskanPrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + 'iskani_prevozi/' + prevozId, false);
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function describeIskanPrevoz() {
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	mainContent = ""
	prevoz = getIskanPrevoz(id)
	console.log(prevoz)
	mainContent += "<p> Od kje:" + prevoz["od_lokacije"] + "</p>";
	mainContent += "<p> Do kje: " + prevoz["do_lokacije"] + "</p>";
	mainContent += "<p> Stranka: " + prevoz["uporabnik_prevoza"] + "</p>";
	mainContent += "<p> Status: " + prevoz["status"] + "</p>";
	mainContent += "<p> Strosek: " + prevoz["strosek"] + "</p>";
	document.getElementById("main_prevoz").innerHTML = mainContent;
}

function deleteIskanPrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + 'iskani_prevozi/' + prevozId, false);
	request.send(null);
	loadPageAllIskaniPrevozi();
}
//################################################

function loadPageAllOcene() {
	var prevozi = getOcene();
	var mainContent = "";
	
	mainContent += "<div><h2>Ocene aplikacije</h2>";
	console.log(prevozi);
	for (var i = 0; i < prevozi["ocene"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Ime uporabnika:" + prevozi["ocene"][i]["ime"] + "</p>";
		mainContent += "<p> Ocena: " + prevozi["ocene"][i]["ocena"] + "</p>";
		mainContent += "<p><a href=\"javascript:deleteOcena(" + prevozi["ocene"][i]["id"] + ");\">Zbrisi</a>";	
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}


function addOcena() {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "ocene", false);
	request.setRequestHeader("Content-Type", "application/json");

	id_uporabnika = parseInt(document.getElementById("uporabnikid").value);
	ocena = document.getElementById("ocena").value;
	id = Math.floor(Math.random() * 10000);
	var ocena = {id_uporabnika: id_uporabnika, ocena: ocena, id: id};
	request.send(JSON.stringify(ocena));
	console.log(JSON.stringify(ocena));
	if(request.status != 201){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
	loadPageAllOcene();
}

function getOcene() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "ocene", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}


function deleteOcena(prevozId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + 'ocene/' + prevozId, false);
	request.send(null);
	loadPageAllOcene();
}

//################################################################

function loadPageAllAktivniPrevozi() {
	var prevozi = getAktivniPrevozi();
	var mainContent = "";
	
	mainContent += "<div><h2>Vsi aktivni prevozi</h2>";
	console.log(prevozi);
	for (var i = 0; i < prevozi["prevozi"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Od kje:" + prevozi["prevozi"][i]["od_lokacije"] + "</p>";
		mainContent += "<p> Do kje: " + prevozi["prevozi"][i]["do_lokacije"] + "</p>";
		mainContent += "<p> Start: " + prevozi["prevozi"][i]["cas_odhoda"] + "</p>";
		mainContent += "<p> Pricakovano trajanje: " + prevozi["prevozi"][i]["cas_prihoda"] + "</p>";
		mainContent += "<p><a href=\"javascript:deleteAktivniPrevoz(" + prevozi["prevozi"][i]["id_prevoza"] + ");\">Zbrisi</a>";
		mainContent += "<p><a href=\"/static/aktivniprevoz.html?id=" + prevozi["prevozi"][i]["id_prevoza"] + "\" ;\">Podrobnosti</a>";
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}

function describeAktivniPrevoz() {
	console.log("Pozdravljena zvezda!")
	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");
	mainContent = ""
	prevoz = getAktivniPrevoz(id)
	console.log(prevoz)
	mainContent += "<p> Od kje:" + prevoz["od_lokacije"] + "</p>";
	mainContent += "<p> Do kje: " + prevoz["do_lokacije"] + "</p>";
	mainContent += "<p> Uporabnik_prevoza: " + prevoz["uporabnik_prevoza"] + "</p>";
	mainContent += "<p> Prevoznik: " + prevoz["prevoznik"] + "</p>";
	mainContent += "<p> Start: " + prevoz["cas_odhoda"] + "</p>";
	mainContent += "<p> Pricakovano trajanje: " + prevoz["cas_prihoda"] + "</p>";
	mainContent += "<p> Status: " + prevoz["status"] + "</p>";
	mainContent += "<p> Trenutna lokacija: " + prevoz["trenutna_lokacija"] + "</p>";
	mainContent += "<p> Odpremljeno: " + prevoz["odpremljeno"] + "</p>";
	mainContent += "<p> Prejeto: " + prevoz["prejeto"] + "</p>";
	mainContent += "<p> Strosek: " + prevoz["strosek"] + "</p>";
	document.getElementById("main_prevoz").innerHTML = mainContent;
}

function addAktivniPrevoz(id_prevoza, id_uporabnika) {
	var request = new XMLHttpRequest();
	request.open("POST", proxyAddr + "aktivni_prevozi", false);
	request.setRequestHeader("Content-Type", "application/json");

	id_prevoza = id_prevoza
	vir = "ponujeni";
	console.log("Hej")
	console.log(id_uporabnika)
	uporabnik_prevoza = parseInt(document.getElementById(id_uporabnika).value);
	var prevoz = {id_prevoza: id_prevoza, vir:vir, uporabnik_prevoza:uporabnik_prevoza};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	if(request.status != 201){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
	loadPageAllPrevozi();
}

function spremeniAktivniPrevoz(){
	var request = new XMLHttpRequest();

	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	request.open("PUT", proxyAddr + "aktivni_prevozi/" + id, false);
	request.setRequestHeader("Content-Type", "application/json");

	vir = "ponujeni";
	vrednost = document.getElementById("trenutnalok").value
	var prevoz = {atribut: "trenutna_lokacija", vrednost: vrednost};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	describeAktivniPrevoz();
}

function prejmiAktivniPrevoz(){
	var request = new XMLHttpRequest();

	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	request.open("PUT", proxyAddr + "aktivni_prevozi/" + id, false);
	request.setRequestHeader("Content-Type", "application/json");

	var prevoz = {atribut: "prejeto", vrednost: "Da"};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	describeAktivniPrevoz();
}

function odpremiAktivniPrevoz(){
	var request = new XMLHttpRequest();

	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	request.open("PUT", proxyAddr + "aktivni_prevozi/" + id, false);
	request.setRequestHeader("Content-Type", "application/json");

	var prevoz = {atribut: "odpremljeno", vrednost: "Da"};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	describeAktivniPrevoz();
}

function placajAktivniPrevoz(){
	var request = new XMLHttpRequest();

	var url_string = window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	request.open("PUT", proxyAddr + "placila/" + id, false);
	request.setRequestHeader("Content-Type", "application/json");

	var prevoz = {atribut: "status", vrednost: "placano"};
	request.send(JSON.stringify(prevoz));
	console.log(JSON.stringify(prevoz));
	if(request.status != 200){
		content = ""
		content += "<p> Napaka: </p>";
		content += "<p>" + request.response + "<\p>";
		document.getElementById("napaka").innerHTML = content;
	}
	else{
		window.location = ("/static/aktivniprevozi.html")
	}
}

function getAktivniPrevozi() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "aktivni_prevozi", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function getAktivniPrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + 'aktivni_prevozi/' + prevozId, false);
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function deleteAktivniPrevoz(prevozId) {
	var request = new XMLHttpRequest();
	request.open("DELETE", proxyAddr + 'aktivni_prevozi/' + prevozId, false);
	request.send(null);
	loadPageAllAktivniPrevozi();
}

function getLestvica() {
	var request = new XMLHttpRequest();
	request.open("GET", proxyAddr + "lestvica", false);
	request.setRequestHeader("Access-Control-Allow-Origin", "*")
	request.send(null);
	if (request.readyState == 4 && request.status == 200) {
		return JSON.parse(request.responseText);
	}
	else {
		return null;
	}
}

function loadPageAllLestvica() {
	var prevozi = getLestvica();
	var mainContent = "";
	
	console.log(prevozi);
	for (var i = 0; i < prevozi["narocniki"].length; i++) {
		mainContent += "<p> -------------------------------------------</p>";
		mainContent += "<p> Ime uporabnika:" + prevozi["narocniki"][i]["ime"] + "</p>";
		mainContent += "<p> Ocena: " + prevozi["narocniki"][i]["ocena"] + "</p>";
		mainContent += "<p> Mesto: " + prevozi["narocniki"][i]["mesto"] + "</p>";
		mainContent += "<p> -------------------------------------------</p>";
	}
	mainContent += "</div>";
	

	document.getElementById("main").innerHTML = mainContent;
}