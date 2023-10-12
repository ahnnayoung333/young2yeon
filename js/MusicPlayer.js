const MusicPlayer = document.querySelector(".MusicPlayer");
const Music_lis = MusicPlayer.querySelectorAll("ul li");
const backButn = MusicPlayer.querySelector("ul .musicUi .backMusic")
const playStopButn = MusicPlayer.querySelector("ul .musicUi .playStop")
const nextButn = MusicPlayer.querySelector("ul .musicUi .nextMusic")
const musicTimeBar = MusicPlayer.querySelector("ul .musicTimeBar")

let eventCon = true
let MusicIndex = 0;
let HeMusicIndex = 0;

function classListAdd(index, slider) {
    Music_lis[index].classList.add(slider);
}

function sliderEvent(i) {
    eventCon = false
    MusicIndex += i;

    if(MusicIndex < 0) {
        MusicIndex = Music_lis.length - 1;
    }else if(MusicIndex > Music_lis.length - 1) {
        MusicIndex = 0
    }

    if(i > 0){
        classListAdd(MusicIndex, "next");
        classListAdd(HeMusicIndex, "next");
    }else if(i < 0) {
        classListAdd(MusicIndex, "back");
        classListAdd(HeMusicIndex, "back");
    }

    Music_lis[HeMusicIndex].classList.remove("on");

    setTimeout(() => {
        Music_lis[MusicIndex].classList.add("on")
        for(let el of Music_lis) el.classList.remove("next");
        for(let el of Music_lis) el.classList.remove("back");
    }, 300);

    setTimeout(() => {
        HeMusicIndex = MusicIndex;
        eventCon = true
    }, 1500);
}

backButn.addEventListener("click", () => { 
    if(eventCon) sliderEvent(1);
});

nextButn.addEventListener("click", () => { 
    if(eventCon) sliderEvent(-1)
});

playStopButn.addEventListener("click", () => {
    playStopButn.classList.toggle("on");
    musicTimeBar.classList.toggle("on");
})