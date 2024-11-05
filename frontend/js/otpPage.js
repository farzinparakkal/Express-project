document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    getotp=document.getElementById('getotp').value

    console.log(getotp)
    const res=await fetch('http://localhost:3001/api/checkOtp',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({getotp})
    })
    console.log(res);
    
    
    const data=await res.json()
    if(res.status==200){
        alert(data.msg)
        window.location.href="../pages/editPassword.html"
    }
    else{
        alert(data.msg)
    }
 })