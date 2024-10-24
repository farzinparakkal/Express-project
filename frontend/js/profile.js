const url = window.location.href;
const urlParams = new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function getUserDetails() {
    const res=await fetch(`http://localhost:3001/api/getUserDetails/${id}`)
    const data=await res.json();
    console.log(data);
    document.getElementById('main-class-1').innerHTML=`
    <div><img src="${data.profile}" alt="" height="50" width="50"></div>
            <div>Username: ${data.name}</div>
            <div>Email: ${data.email}</div>
            <div>Phone: ${data.phone}</div>
            <button onclick="logoutacc()">Logout account</button>
            <button onclick="deletedata()">Delete</button>
    `

}
getUserDetails()

function deletedata() {
    fetch(`http://localhost:3001/api/deleteUser/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
        console.log(res);
        if(res.status == 201) {
            alert("success");
            localStorage.removeItem("token")
            window.location.href="../index.html"
        }
        else{
            alert("error");
        }
    });
}

function postpage(){
    window.location.href=`../pages/addPost.html?id=${id}`
}

function logoutacc() {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    window.location.href="../index.html"
  }