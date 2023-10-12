const body = document.querySelector(".comments");
const addBox = document.querySelector(".add_box");
const popupBox = document.querySelector(".popup_box");
const popupTitle = popupBox.querySelector(".header p");
const closeIcon = popupBox.querySelector(".header i");
const titleTag = popupBox.querySelector("select");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
    popupTitle.textContent = "느낀 점 쓰기";
    addBtn.textContent = "글쓰기";
    popupBox.classList.add("show");
    // document.querySelector("body").style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if (!notes) return;
    const note = document.querySelectorAll(".note");
    note.forEach((el) => {
        el.remove();
    });

    notes.forEach((el, index) => {
        let filterDesc = el.description.replaceAll("\n", '<br/>');
        let lis = `
            <li class="note">
                <div class="details">
                    <p>${el.title}</p>
                    <span>${filterDesc}</span>
                </div>
                <div class="bottom_content">
                    <span>${el.date}</span>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis-vertical"></i>
                        <ul class="menu">
                            <li onclick="updateNote(${index},'${el.title}','${filterDesc}')"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
        `;
        // addBox.insertAdjacentHTML("afterend", lis);
        document.querySelector(".comments").insertAdjacentHTML("beforebegin", lis)
        // document.querySelector(".comments").innerHTML = lis;
        // document.querySelector(".comments").appendChild(lis);
    });
}

function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll("<br/>", '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.textContent = "수정";
    addBtn.textContent = "수정";
}

function deleteNote(noteId) {
    let confirmDel = confirm("정말로 삭제하시겠습니까?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function showMenu(el) {
    el.parentElement.classList.add("show");
    document.addEventListener("click", (e) => {
        if (e.target.tagName != "I" || e.target != el) {
            el.parentElement.classList.remove("show");
        }
    });
}

addBtn.addEventListener("click", () => {
    let title = titleTag.value.trim();
    let description = descTag.value.trim();

    if (title || description) {
        let currentData = new Date();
        let year = currentData.getFullYear();
        let month = currentData.getMonth() + 1;
        let day = currentData.getDate();

        let noteInfo = {
            title,
            description,
            date: `${year}.${month}.${day}`
        };

        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});
