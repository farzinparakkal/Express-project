document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    email=document.getElementById('email').value

    console.log(email)
    const res=await fetch('http://localhost:3001/api/otp',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({email})
    })
    console.log(res);
    
    
    const data=await res.json()
    if(res.status==200){
        alert(data.msg)
        localStorage.setItem('email',email)
        window.location.href="../pages/otpPage.html"
    }
    else{
        alert(data.msg)
    }
 })