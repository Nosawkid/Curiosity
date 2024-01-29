import React from 'react'
import './table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Tables = () => {
    const rows = [
        {
            id: 234455,
            product: "HP Omen 16",
            customer: "Yaseen Sidhik",
            date: "5 Jan 2024",
            img: "https://i.pcmag.com/imagery/reviews/05JHsHDnyjCSyz7jeBR5FDn-1..v1678896640.jpg",
            amount: 115000,
            method: "COD",
            status: "Approved"
        },
        {
            id: 2323455,
            product: "Lenovo Legion",
            customer: "Abhi Mohan",
            date: "12 Jan 2024",
            img: "https://images.hindustantimes.com/tech/img/2021/11/10/1600x900/Lenovo_Legion_5_Pro_lid_1636514346379_1636514355410.jpg",
            amount: 125000,
            method: "COD",
            status: "Approved"
        },
        {
            id: 46674,
            product: "Asus TUF F15",
            customer: "Shiva Prasad",
            date: "4 Dec 2023",
            img: "https://sm.ign.com/ign_in/screenshot/default/asus-tuf-15-featured_kgq2.jpg",
            amount: 155000,
            method: "COD",
            status: "Approved"
        },
        {
            id: 23455655,
            product: "Acer Nitro",
            customer: "Dan Shiju",
            date: "15 Jan 2024",
            img: "https://i.pcmag.com/imagery/reviews/05JHsHDnyjCSyz7jeBR5FDn-1..v1678896640.jpg",
            amount: 115000,
            method: "COD",
            status: "Rejected"
        },
        {
            id: 223455,
            product: "MI 23",
            customer: "Trishal",
            date: "5 Jan 2024",
            img: "https://i.pcmag.com/imagery/reviews/05JHsHDnyjCSyz7jeBR5FDn-1..v1678896640.jpg",
            amount: 115000,
            method: "COD",
            status: "Pending"
        },
    ]
    return (
        <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className='tableCell'>Tracking ID</TableCell>
                    <TableCell className='tableCell' >Product</TableCell>
                    <TableCell className='tableCell' >Customer</TableCell>
                    <TableCell className='tableCell' >Purchase Date</TableCell>
                    <TableCell className='tableCell' >Amount</TableCell>
                    <TableCell className='tableCell' >Method</TableCell>
                    <TableCell className='tableCell' >Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                      
                    >
                         <TableCell className='tableCell' >{row.id}</TableCell>
                        <TableCell className='tableCell'>
                            <div className="cellWrapper">
                                <img src={row.img} alt="" />
                                {row.product}
                            </div>
                        </TableCell>
                        <TableCell className='tableCell' >{row.customer}</TableCell>
                        <TableCell className='tableCell' >{row.date}</TableCell>
                        <TableCell className='tableCell' >{row.amount}</TableCell>
                        <TableCell className='tableCell' >{row.method}</TableCell>
                        <TableCell className='tableCell' ><span className={`status ${row.status}`}>{row.status}</span></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default Tables