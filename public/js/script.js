    var stop = 1;
	var diaStart=0;
    var maxPictureNumber= 9;  //startet bei 1, Anzahl der Bilder
    var pictureNumber= 0; //startet bei 0
    
    async function startDia(){
      this.diaStart = this.pictureNumber;
	  if(this.stop === 0){
		  this.stop= 1;
	  }
	  else{
		  this.stop= 0;
		  do{
			this.nextPicture();
			await sleep(3000);
		  }
		  while((this.pictureNumber !== this.diaStart)&& (this.stop === 0));
	  }
    }
    
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	
	}
	
    function clearPicture(){
      let pictureId = "picture" + this.pictureNumber;
      document.getElementById(pictureId).style="display: none";
    }
    
    function callPicture(i){
      let pictureId = "picture" + i;
      document.getElementById(pictureId).style="display: block; width: 100%";
      document.getElementById("anzeige").innerHTML= (pictureNumber+1) + "/" + maxPictureNumber;
    }
    
    function closePicture(){
      this.clearPicture();
      document.getElementById("bigPictureBackground").style="display: none";
	  this.stop = 1;
    }
    
    function showPicture(i){
      this.clearPicture();
      this.pictureNumber=i;
      document.getElementById("bigPictureBackground").style="display: block";
      this.callPicture(i);
    }
    
    function nextPicture(){
	  this.clearPicture();
      this.pictureNumber+=1;
      if(pictureNumber >= maxPictureNumber){
        this.pictureNumber=0;
      }
      this.callPicture(this.pictureNumber);
    }
		     
    function previousPicture(){
      this.clearPicture();
      this.pictureNumber-=1;
      if(this.pictureNumber < 0){
        this.pictureNumber= maxPictureNumber -1;
      }
      this.callPicture(this.pictureNumber);
    }