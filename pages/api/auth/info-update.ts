import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/utils/auth'
import localhostBackend from '@/localhost';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {

    const { fullname, email, password, phoneNumber, address, role } = req.body;

    console.log(phoneNumber,address);
    
    if (!fullname.trim() || !email.trim() || !phoneNumber.trim() || !address.trim()) {
      return res.status(400).json({ message: "Data is not valid  !!"})
    }

    const usersData = await axios.get(`${localhostBackend}/users`).then((res) => res.data);
    const userToUpdate = usersData.find((user) => user.email === email);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found!' });
    }


    userToUpdate.fullname = fullname;
    userToUpdate.email = email;
    if (password !== '') {
      const hashedPassword = await hashPassword(password)
        userToUpdate.password = hashedPassword;
    }
    userToUpdate.phonenumber = phoneNumber;
    userToUpdate.address = address;
    userToUpdate.role = role;


    axios.put(`${localhostBackend}/users/${userToUpdate.id}`, userToUpdate)

    return res.status(200).json({ message: 'User information updated successfully!' });
  } catch (error) {
    console.error('Error updating user information:', error);
    return res.status(500).json({ message: 'Internal server error!' });
  }
}
