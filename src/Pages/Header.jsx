import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex flex-row px-10 justify-between border border-b-2'>
            <div className='py-3 md:w-1/3 '>
                <Link to="/">
                    <img src="/logo/logo1.png" className='h-10 md:h-12' />
                </Link>
                <p className='text-black pt-2 text-sm md:text-lg'>Department of Cyber Physical System</p>
            </div>
            <div className='flex flex-col pt-5 justify-between'>
                <ul className='flex flex-col md:flex-row pl-5 gap-x-5 text-primary text-sm md:text-lg'>
                    <Link to="https://bdu.ac.bd/">BDU Website</Link>
                    <Link to="https://moodle.bdu.ac.bd/login/" >Moodle</Link>
                    <Link to="https://ums.bdu.ac.bd/">UMS</Link>
                </ul>
                {/* <p className='hidden md:block text-lg'>Faculty of Software and Machine Intelligence</p> */}
            </div>
        </div>
    )
}

export default Header