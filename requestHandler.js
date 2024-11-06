import postSchema from './models/post.model.js'
import userSchema from './models/user.model.js'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import pkg from 'jsonwebtoken'
const {sign} =pkg


const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // secure: false, // true for port 465, false for other ports
    auth: {
    //   user: "be62be778e6abf",
    //   pass: "54c947f7805c93",
    user: "farzinparakkal135@gmail.com",
    pass: "bpmi whpr zwkz wfdq",
    },
  })


export async function adduser(req,res) {
    const {profile,name,email,phone,pass,cpass}=req.body
    if(!(name&&email&&pass&&cpass))
        return res.status(500).send({msg:"empty input"})
    else if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})

    const check=await userSchema.find({email})
    if(check)
        return res.status(500).send({msg:"email already exist"})


    bcrypt.hash(pass,10).then((hpwd)=>{
        // console.log(hpwd)
        // console.log("data added");
        userSchema.create({profile,name,email,phone,pass:hpwd}).then(()=>{
            res.status(201).send({msg:"Successfull"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        })  
    }).catch((error)=>{
        console.log(error)
    }) 
}



export async function login(req,res) {
    const {email,pass}=req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"empty input"})

    const user= await userSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"not exist"})

    const success=await bcrypt.compare(pass,user.pass)

    if(success!=true)
        return res.status(500).send({msg:"Incorrect Password"})

    const token=await sign({UserID:user._id},process.env.jwt_key,{expiresIn:"24h"})
    res.status(200).send({token})
}



export async function getUser(req, res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    // console.log(usr);
    const data=await postSchema.find()
    // console.log(data);
    res.status(200).send({usr,data}); 
}

export async function getUserDetails(req,res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const post=await postSchema.find({id:req.user.UserID})
    res.status(200).send({usr,post}); 
}



export async function addPost(req,res) {
    const{...datas}=req.body
    await postSchema.create({id:req.user.UserID,...datas}).then(()=>{
        res.status(201).send({msg:"Successfull"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })  
}



export async function showPost(req,res) {
    // console.log(req.params.id);
    const id=req.params.id
    const post=await postSchema.findOne({_id:id})
    // console.log(post);
    res.status(200).send({post})
}



export async function update(req,res) {
    // console.log(req.user.UserID);
    // console.log(req.body);
    const {...data}=req.body
    await postSchema.updateOne({_id:req.params.id},{$set:{id:req.user.UserID,...data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})  
    })  
}




export async function deleteUser(req, res) {
    // console.log(req.params); 
    const { id } = req.params;  
    const data = await userSchema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}

export async function deletePost(req, res) {
    // console.log(req.params); 
    const { id } = req.params;  
    const data = await postSchema.deleteOne({ _id: id })
        .then(() => {
            res.status(201).send({ msg: "Deleted" });
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
}




export async function generateOtp(req,res) {
    const {email}=req.body

    const check = await userSchema.findOne({email})
    if(check){
    let otp=Math.floor(Math.random()*10000)
    console.log(otp);
    userSchema.updateOne({email:email},{$set:{otp:otp}}).then(()=>{
        // console.log("otp added");
    })
    
    
    const info = await transporter.sendMail({
        from: 'farzinparakkal135@gmail.com',
        to: email,
        subject: "OTP ",
        text: "Verify",
        html: `<b>Hacked! otp is ${otp}</b>`,
        
      })
      console.log("Message sent: %s", info.messageId)
      res.status(200).send({msg:"OTP sent"})
    }
    else{
        res.status(404).send({msg:"This Email has not created user"})
    }  
}


export async function checkOtp(req,res) {
    const {otp,email}=req.body
    // console.log(otp,email);
    const check = await userSchema.findOne({email})
    if(check){
        if(check.otp==otp){
            res.status(200).send({msg:"OTP is correct"})
        }
        else{
            res.status(404).send({msg:"OTP is incorrect"})
        }
    }
    else{
        res.status(404).send({msg:"This Email has not created user"})
    }
}



export async function updatePassword(req,res){
    const {pass,cpass,email}=req.body
    // console.log(req.body);
    if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})
    
    bcrypt.hash(pass,10).then((hpwd)=>{
        // console.log(hpwd)
        userSchema.updateOne({ email }, { $set: { pass: hpwd, otp: 0 } }).then(()=>{
            // console.log("password changed"); 
            res.status(201).send({msg:"Password changed successfully"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        })  
    }).catch((error)=>{
        console.log(error)
    }) 
}

