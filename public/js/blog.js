fetch('data/blog.json')
.then((res) => res.json())
.then((data) => {
	let header = "";
	let body = "";

	data.forEach(function(eintrag){
		header += `
		<h2>${eintrag.h2} </h2>
		`;
		for(let i in eintrag.paragraphs){
			body += `<p>
			${eintrag.paragraphs[i]}</p>
		`}
		
	})
	document.getElementById('blog').innerHTML = header + body;

})
.catch((err) => console.log(err))



