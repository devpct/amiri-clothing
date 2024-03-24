// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateToken, verifyPassword } from '@/utils/auth'
import { serialize } from 'cookie'
import axios from 'axios';
import localhostBackend from '@/localhost';

type Data = {
  message: string;
  token?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const usersData = await axios.get(`${localhostBackend}/users`).then((res) => res.data);

    const { email, password } = req.body

    // Validation
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ message: "Data is not valid  !!"})
    }

    const isUserExist = usersData.find((user:any) => user.email === email);
    
    console.log(password, isUserExist.password);

    if (!isUserExist) {
      return res.status(404).json({ message: "User not found !!"})
    }

    const isValidPassword = await verifyPassword(password, isUserExist.password)

    
    if (!isValidPassword) {
      return res.status(422).json({ message: "username or password is not correct !!"})
    }

    const token = generateToken({ email: isUserExist.email })

    return(
      res
      .setHeader('Set-Cookie', serialize('token', token,{
        httpOnly: true,
        path: '/',
      }))
      .status(200).json({ message: "User Logged In successfully :))", token })
    ) 
}
