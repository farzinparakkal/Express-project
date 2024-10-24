async function getUser() {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await fetch("http://localhost:3001/api/getUser", {
      headers: { authorization: `Bearer ${token}` },
    });
    const movie = await res.json();
    console.log(movie);
    console.log(movie.user);
    console.log(movie.pic);

    document.getElementById("nav-sign").style.display = "none";
    document.getElementById("nav-sec-2").innerHTML = `
        <div class="nav-dropdown" id="uname">${movie.user}</div>
            <div id="profilep" class="profilep">
                <img src="${movie.pic}" alt="" id="profile-pic" class="profile-pic" width="40" height="40">
            </div>
            <div class="dropdown" id="dropdown">
                <button onclick="myFunction()" class="dropbtn">▼</button>
                <div id="myDropdown" class="dropdown-content">
                  <a href="../pages/profile.html?id=${movie.id}">Profile</a>
                  <a onclick="logoutacc()">Logout</a>
                </div>
            </div>
    `;
  }
  else{
    alert("You are not logined")
  }
}
getUser();

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function logoutacc() {
  localStorage.removeItem("token")
  alert("Logout Successfully")
  getUser()
}
