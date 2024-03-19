import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';

export default function Charts({ width, usersData, darkMode }) {

    const allMonths = moment.months();
    const currentMonthIndex = moment().month();
    const months = allMonths.slice(0, currentMonthIndex + 1);
    
    const userDataByDay = months.flatMap(month => {
        const daysInMonth = moment().month(month).daysInMonth();
        const monthData = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const usersRegisteredOnDay = usersData.filter(user => {
                const userDay = moment(user.createdAt).date();
                const userMonth = moment(user.createdAt).format('MMMM');
                return userMonth === month && userDay === day;
            });
            if (usersRegisteredOnDay.length > 0) {
                monthData.push({ name: `${day} ${month}`, users: usersRegisteredOnDay.length });
            }
        }
        return monthData;
    })

  return (
    <>
    <div className="w-full mt-[5rem]">
        <LineChart width={width} height={400} data={userDataByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" name='User Signup' stroke={darkMode?'white':'black'}  />
        </LineChart>
    </div>
    </>
  )
}
