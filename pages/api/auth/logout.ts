// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return(
    res
    .setHeader('Set-Cookie', serialize('token', "",{
      path: '/',
      maxAge: 0
    }))
    .status(200).json({ message: "User Logged Out successfully :))" })
  ) 
}
