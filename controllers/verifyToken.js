import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
    const {token} =req.headers
    jwt.verify(token,'SectectKey',async(err,decoded)=>{
        if(err) return res.status(401).json({message:'invalid Token'})
        req.user = decoded
        next()
})
}
