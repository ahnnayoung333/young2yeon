const manuBar = document.querySelectorAll(".manuBar li");
const boxs = document.querySelectorAll("section article");

manuBar.forEach((el, index) => {
    el.addEventListener("click", () => {
        if(el.classList.contains("on")) return;

        document.querySelector(".manuBar li.on").classList.remove("on")
        document.querySelector("section article.on").classList.remove("on")
        manuBar[index].classList.add("on");
        boxs[index].classList.add("on");
    })
})