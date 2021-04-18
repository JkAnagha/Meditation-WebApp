const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbarMenu');
const navlogo = document.querySelector('#navbarLogo');

//display mobile menu
const mobileMenu = () => {
	menu.classList.toggle('isActive');
	menuLinks.classList.toggle('active');
};
menu.addEventListener('click', mobileMenu);

//Slow active menu while scrolling




const song = document.querySelector(".song");
	const play = document.querySelector(".play");
	const outline = document.querySelector(".moving_outline circle");
	const video = document.querySelector(".bg_video video");
	//sounds
	const sounds = document.querySelectorAll(".sound_pick button");
	//time display
	const timeDisplay = document.querySelector(".time_display");
	const timeSelect = document.querySelectorAll(".select_time button");
	//get the length of outline
	const outlineLength = outline.getTotalLength();
	//duration
	let duration = 600;

	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	//select diff sound
	sounds.forEach(sound =>{
       sound.addEventListener("click", function(){
          song.src = this.getAttribute("data-sound");
          video.src = this.getAttribute("data-video");
          checkPlaying(song);
       });
	});
	//playsound
	play.addEventListener("click",() =>{
		checkPlaying(song);
	});

	//change duration
    timeSelect.forEach(option =>{
    	option.addEventListener("click", function(){
             duration = this.getAttribute("data-time");
             timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration%60)}`;
    	});
    });

	//stopa n play music feature
	const checkPlaying = song =>{
	if(song.paused){
		song.play();
		video.play();
		play.src = "./svg/pause.svg";
	} 
	else{
		song.pause();
		video.pause();
		play.src = "./svg/play.svg";
	}
  };

  //circle animation
song.ontimeupdate = function(){
    let currentTime = song.currentTime;
    let elapseTime = duration - currentTime;
    let seconds = Math.floor(elapseTime % 60);
    let minutes = Math.floor(elapseTime / 60);  
    
    let progress = outlineLength - (currentTime / duration)*outlineLength;
    outline.style.strokeDashoffset = progress;
    //txt animation
    timeDisplay.textContent = `${minutes}:${seconds}`; 

    if(currentTime >= duration){
    	song.pause();
    	song.currentTime = 0;
    	play.src = "./svg/play.svg";
    	video.pause();
    } 
  };