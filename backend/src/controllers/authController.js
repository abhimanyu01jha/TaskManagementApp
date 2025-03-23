import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../models/user.js';

export const registerUser = async(req,res)=>{
 try{
    const { name, email, password } = req.body;
    console.log("req body :" + req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

 }  catch(error){
    res.status(400).json({ error: error.message });
 } 
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        res.json({ token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:"1h"});
}