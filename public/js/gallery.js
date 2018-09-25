fetch('data/gallery.json')
.then((res) => res.json())
.then((data) => {
	let output1 = "";
	let output2 = "";
	let carouseloverlay = 
		`<div id="prevDiv" onclick="event.stopPropagation(); previousPicture()"></div>
         <div id="exitDiv" onclick="event.stopPropagation(); closePicture()"></div>
         <div id="nextDiv" onclick="event.stopPropagation(); nextPicture()"></div>`
	let i=0;
	data.forEach(function(bild){
		output1 += `
			<figure class="pgallery" onclick="showPicture(${i})">
	        <img src="${bild.path}" alt="${bild.description}" />
	        <div class="caption">
	        <label class="figcap">${bild.description}</label>
	        </div>
	        </figure>

		`;
		output2 += `
			<img id="picture${i}" src="${bild.path}" alt="${bild.description}" style="display: none;">

		`;
		i++;
	})
	document.getElementById('pwrapper').innerHTML = output1;
	document.getElementById('bigPicture').innerHTML = output2 + carouseloverlay;
})
.catch((err) => console.log(err))
