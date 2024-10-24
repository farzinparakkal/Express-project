document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();

    caption=document.getElementById('caption').value
    description=document.getElementById('description').value
    
    
    
    console.log(caption,description,pic)

    const res=await fetch('http://localhost:3001/api/addpost',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({pic,caption,description})
    })
    console.log(res);
    
    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        window.location.href="../index.html"
    }
    else{
        alert(data.error)
    }
 })
 let pic

 async function picture() {
    const file=document.getElementById("profile").files[0]
      pic=await convertBase64(file)
    console.log(pic);
    document.getElementById('showprofile').src=pic
}

function convertBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();

        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result)

        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}