// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyToken } from '@/utils/auth'
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import localhostBackend from '@/localhost';

type Data = {
  message?: string;
  id?: any;
  fullname?: any;
  email?: any;
  password?: any;
  phonenumber?: any;
  address?: any;
  role?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {    
  if (req.method === 'GET') {    
    const usersData = await axios.get(`${localhostBackend}/users`).then((res) => res.data);

    const { token } = req.cookies    
  
    if (!token) {
      return res.status(401).json({ message: 'You are not login !!' })
    }
  
    const tokenPyload = verifyToken(token)
  
    if (!tokenPyload) {
      return res.status(401).json({ message: 'You are not login !!' })  
    }
  
    const isUserExist = usersData.find((user:any) => user.email === tokenPyload.email);
    
    return res.status(200).json({ id:isUserExist.id, fullname:isUserExist.fullname, email:isUserExist.email, password:isUserExist.password, phonenumber:isUserExist.phonenumber, address:isUserExist.address, role:isUserExist.role})
  } else {
    const usersData = await axios.get(`${localhostBackend}/users`).then((res) => res.data);

    const { token } = req.body

    if (!token) {
      return res.status(401).json({ message: 'You are not login !!' })
    }
  
    const tokenPyload = verifyToken(token)
  
    if (!tokenPyload) {
      return res.status(401).json({ message: 'You are not login !!' })  
    }

    const isUserExist = usersData.find((user:any) => user.email === tokenPyload.email);
    
    return res.status(200).json({ id:isUserExist.id, fullname:isUserExist.fullname, email:isUserExist.email, password:isUserExist.password, phonenumber:isUserExist.phonenumber, address:isUserExist.address, role:isUserExist.role})
  }
}

