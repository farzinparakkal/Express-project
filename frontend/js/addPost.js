const token = localStorage.getItem("token")
document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();

    const res=await fetch(`http://localhost:3001/api/getUserDetails/`,{
        headers: { authorization: `Bearer ${token}` },
      })
    const data=await res.json();
    console.log(data.usr._id);
    
    

    caption=document.getElementById('caption').value
    description=document.getElementById('description').value

    console.log(data.usr._id,pic,caption,description)

    if(token){
    const res2=await fetch('http://localhost:3001/api/addpost',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({id:data.usr._id,pic,caption,description})
    })
    console.log(res2);
    
    const data2=await res2.json()
    if(res.status==201){
        alert(data2.msg)
        window.location.href="../index.html"
    }
    else{
        alert(data2.error)
    }
    }
    else{
        alert("Please login first")
        window.location.href='../pages/signIn.html'
    }
 })
//  const pic = []
let pic

 async function picture() {
    const file=document.getElementById("post-picture").files[0]
      pic=await convertBase64(file)
    console.log(pic);
    document.getElementById("picture1").src=pic

    // document.getElementById("post-picture").files.map((picture)=>{
    //     pic.push(convertBase64(picture))
    // })
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

// async function picture() {
//     const files = Array.from(document.getElementById("post-picture").files); // Convert FileList to Array
//     const pic = []; // Initialize an array to store base64 strings

//     // Loop through each file and convert it to base64
//     for (const file of files) {
//         try {
//             const base64 = await convertBase64(file);
//             pic.push(base64); // Add the converted base64 string to the array
//         } catch (error) {
//             console.error("Error converting file to base64:", error);
//         }
//     }

//     console.log(pic); // Check the base64 strings in the console
//     // You can now use the 'pic' array as needed, e.g., send it to the server
// }

// function convertBase64(file) {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();

//         fileReader.readAsDataURL(file); // Start reading the file as a data URL
//         fileReader.onload = () => resolve(fileReader.result); // Resolve the promise with the base64 string
//         fileReader.onerror = (error) => reject(error); // Reject the promise on error
//     });
// }


