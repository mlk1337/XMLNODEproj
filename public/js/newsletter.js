document.getElementById('addPost').addEventListener('submit', addPost);

function addPost(e){
	e.preventDefault();

	let email 	= document.getElementById('email').value;
	let phone	= document.getElementById('phone').value;
	let street	= document.getElementById('street').value;
	let plz		= document.getElementById('plz').value;
	let city	= document.getElementById('city').value;
	let country	= document.getElementById('country').value;
	let name	= document.getElementById('name').value;
	let gender	= document.getElementsByName('gender').value;
	let creditcard	= document.getElementById('creditcard').value;
	let color	= document.getElementById('color').value;
	let socsecnr	= document.getElementById('socsecnr').value;
	let agbcheck = document.getElementById('agbcheck').checked;
	
	if(agbcheck==true){
		fetch('/api/newsletter', {
		method:'POST',
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify({
			email:email, phone:phone,street:street, plz:plz,
		 	city:city, country:country, name:name,
		 	 dateofbirth:dateofbirth, creditcard:creditcard,
		 	  color:color, socsecnr:socsecnr, agbcheck:agbcheck})
		})	
	.then(res => res.json())
	.then(error => {
		document.getElementById('error').innerHTML = String(error.error)
	})
	} 
	else {
		document.getElementById('error').innerHTML = "AGB unchecked"
	}



	
}
