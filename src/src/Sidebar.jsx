import React from 'react'
import { BsArchiveFill, BsCart, BsCart3, BsFillGearFill, BsFillGrid3X3GapFill, BsFillMenuButtonWideFill, BsGrid1X2Fill, BsListCheck, BsPeopleFill } from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
             <BsCart3 className='icon_header'/>SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsArchiveFill className='icon'/> Products
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Users
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillMenuButtonWideFill className='icon'/> Reports
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Settings
                </a>

            </li>
        </ul>
    </aside>
  )
}

export default Sidebar