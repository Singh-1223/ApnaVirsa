const jwt = require("jsonwebtoken"); // json web token , signing data with secret , make cookei
const JWT_SECRET = "whatadayboy";

const adminauthenticate = (req,res,next)=>{
 
    const token = req.header('auth-token');
    // console.log(token);
  if(!token){
      return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = { _id: data.user.id }; // Extract the user ID
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
   
}

module.exports = adminauthenticate;

