import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken"

    const hashPassword = async (password) => {
        const hashedPassword = await hash(password, 12);
        return hashedPassword
    }

const generateToken = (data) => {
    const token = sign({ ...data }, process.env.privateKey)    
    return token
}

const verifyPassword = async (password, hashedPassword) => {
   const isValid = await compare(password, hashedPassword)
   return isValid
}

const verifyToken = (token) => {
    try {
        const validaionResult = verify(token, process.env.privateKey)
        return validaionResult            
    } catch (error) {
        return false
    }
}

export { hashPassword, generateToken, verifyPassword, verifyToken }
