import express from 'express'
import fs from 'fs-extra'

let app = express()

app.use(express.static('public'));
app.use(express.json())

app.get('/api/index',function(req,res){
    res.redirect('/index.html');
})

app.get('/api/blog',function(req,res){
    res.redirect('/blog.html');
})

app.get('/api/gallery', function(req, res) {
    res.redirect('/gallery.html');
})
app.get('/api/newsletter', function(req, res){
	res.redirect('/newsletter.html')
})

app.post('/api/newsletter', (req, res) => {


	let submitdata	= req.body;
	console.log(submitdata);		//gibt die gesamte formeingabe aus
	let agb 		= req.body.agbcheck;
	let email 		= req.body.email;
	let phone		= req.body.phone;
	let street		= req.body.street;
	let plz			= req.body.plz;
	let city		= req.body.city;
	let name		= req.body.name;
	let dateofbirth	= req.body.dateofbirth;
	let creditcard	= req.body.creditcard;
	let socsecnr	= req.body.socsecnr;

	let pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/
	
	//um daten aus dem json file zu holen
	let contents = fs.readFileSync("public/data/newsletter.json");	//bekomme das nicht async hin
	let jsonContent = JSON.parse(contents);
	let off=false;
	jsonContent.forEach(function(test){
		if(email == test.email){
			off = true;
		}
	})
	
	jsonContent.push({
	  "name": name,
	  "gender": gender,
	  "email":email,
	  "phone":phone,
	  "street": street,
	  "plz": plz,
	  "city": city,
	  "dateOfBirth": dateofbirth,
	  "creditcard": creditcard,
	  "socSecNr": socsecnr,
	  "agb": agb
	});

	if(off){
		console.log('Email is already registred');
		return res.status(400).send({error : "Email schon registriert"});
	}
	
	if(!agb){
		console.log('AGB not signed');
		return res.status(400).send({error : "Allgemeine Geschäftsbedingungen nicht akzeptiert"});
	}
	
	if (isNaN(dateofbirth) ||  pattern.test(dateofbirth)) {
		console.log('Falsches Alter');
    	return res.status(400).send({error: 'Ungültiges Geburtsdatum'});
  	}
	
  	if (!name || name.length < 2 || name.length > 50) {
		console.log('Name muss zwischen 2 und 50 Zeichen liegen');
		return res.status(400).send({error:'Name muss zwischen 2 und 50 Zeichen liegen'});
  	}	
  		fs.writeFile('public/data/newsletter.json', 
		 JSON.stringify(jsonContent, null, 2) , (err) => {		//null, 2 sorgt dafür, das dass json file gut aussieht
			if (err){
				console.error(err);
				return;
			};
			console.log("New Entry saved");
			
		})
	return res.status(200).send({error: "Akzeptiert"});
  	res.json(req.body);
		
  	
})



app.listen(3000, function(){
	console.log('Running on http://localhost:3000')
})	