// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateToken, hashPassword } from '@/utils/auth'
import { serialize } from 'cookie'
import axios from 'axios';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const usersData = await axios.get('http://localhost:4000/users').then((res) => res.data);

    const { fullname, email, password, role } = req.body
    
    // Validation
    if (!fullname.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Data is not valid  !!"})
    }

    const isUserExist = usersData.find((user) => user.email === email);
    
    if (isUserExist) {
        return res.status(422).json({ message: "This email exist already !!" })
    }
    
    const hashedPassword = await hashPassword(password)
    
    const user = { fullname, email, password:hashedPassword, phonenumber:'', address:'', role }

    const token = generateToken({ email })

    axios.post('http://localhost:4000/users', user)

    return(
      res
      .setHeader('Set-Cookie', serialize('token', token,{
        httpOnly: true,
        path: '/',
      }))
      .status(201).json({ message: "User created successfully :))", token })
    ) 
}