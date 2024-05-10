let bookmarkNameInput = document.getElementById("BookmarkName");
let websiteUrlInput = document.getElementById("WebsiteUrl");
let BookmarksContainer;
let bId = 0;
if (localStorage.getItem("bookmarks", BookmarksContainer)) {
  BookmarksContainer = JSON.parse(
    localStorage.getItem("bookmarks", BookmarksContainer)
  );
  display(BookmarksContainer);
} else {
  BookmarksContainer = [];
}

function bookUrlValidator(element) {
  let regex = {
    WebsiteUrl:
      /^(https:\/\/|http:\/\/)(www.)[0-9]{0,}[a-z]{3,}(.com|.net|.org)$/,
    BookmarkName: /^\w{5,10}$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else if (element.value === "") {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
  return regex[element.id].test(element.value);
}
function adding() {
  if (
    bookUrlValidator(websiteUrlInput) &&
    bookUrlValidator(bookmarkNameInput)
  ) {
    let book = {
      bname: bookmarkNameInput.value,
      wurl: websiteUrlInput.value,
    };
    BookmarksContainer.push(book);
    localStorage.setItem("bookmarks", JSON.stringify(BookmarksContainer));
    display(BookmarksContainer);
    clear();
  } else {
    document.getElementById("alerting").classList.replace("d-none", "d-block");
  }
}
function clear() {
  bookmarkNameInput.value = null;
  websiteUrlInput.value = null;
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  websiteUrlInput.classList.remove("is-valid");
  websiteUrlInput.classList.remove("is-invalid");
}
function display(arr) {
  let box = "";
  for (i = 0; i < arr.length; i++) {
    box += `
    <div class="row bg-white p-2 mb-3">
    <div class="col-2 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center align-items-center">
        <span>${i + 1}</span>
      </div>
      
    </div>
    <div class="col-4 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center align-items-center">
        <span>${arr[i].bname}</span>
      </div>
      
    </div>
    <div class="col-2 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center align-items-center">
        <a class="btn btn-success text-white btn-visit" href="${
          arr[i].wurl
        }" target="_blank"><i class="fa-solid fa-eye me-1"></i>Visit</a>
      </div>
      
    </div>
    <div class="col-2 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-success text-white" id='btn-upt' onclick="updateP1(${i})"><i class="fa-solid fa-pen-to-square"></i> Update</button>
    </div>
  </div>
    <div class="col-2 d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger text-white" id='btn-delete' onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
    </div>
  </div>
</div>
        `;
  }
  document.getElementById("url-box").innerHTML = box;
}
function deleteItem(index) {
  BookmarksContainer.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(BookmarksContainer));
  display(BookmarksContainer);
}

document.getElementById("alerting-close").onclick = function () {
  document.getElementById("alerting").classList.replace("d-block", "d-none");
};

function updateP1(index) {
  bId = index;
  bookmarkNameInput.value = BookmarksContainer[index].bname;
  websiteUrlInput.value = BookmarksContainer[index].wurl;
  document.getElementById("btn-submit").classList.replace("d-block", "d-none");
  document.getElementById("btn-update").classList.replace("d-none", "d-block");
}
function updateP2() {
  if (
    bookUrlValidator(websiteUrlInput) &&
    bookUrlValidator(bookmarkNameInput)
  ) {
    BookmarksContainer[bId].bname = bookmarkNameInput.value;
    BookmarksContainer[bId].wurl = websiteUrlInput.value;
    localStorage.setItem("bookmarks", JSON.stringify(BookmarksContainer));
    display(BookmarksContainer);
    clear();
    document
      .getElementById("btn-update")
      .classList.replace("d-block", "d-none");
    document
      .getElementById("btn-submit")
      .classList.replace("d-none", "d-block");
  } else {
    document.getElementById("alerting").classList.replace("d-none", "d-block");
  }
}
function search(key) {
  let searchArr = [];
  for (i = 0; i < BookmarksContainer.length; i++) {
    if (BookmarksContainer[i].bname.toLowerCase().includes(key.toLowerCase())) {
      searchArr.push(BookmarksContainer[i]);
    }
  }
  if (searchArr.length == 0) {
    errorMessage.classList.replace("d-none", "d-block");
    display(searchArr);
  } else if (searchArr.length > 0) {
    errorMessage.classList.replace("d-block", "d-none");
    display(searchArr);
  } else if (searchBar.value.length == ``) {
    errorMessage.classList.replace("d-block", "d-none");

    display(BookmarksContainer);
  }
}

