import React, { useState } from 'react';
import { BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';
import {
  BsArchiveFill, BsCart3, BsFillGearFill, BsFillGrid3X3GapFill,
  BsFillMenuButtonWideFill, BsGrid1X2Fill, BsListCheck, BsPeopleFill
} from 'react-icons/bs';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart, Bar, Rectangle
} from 'recharts';

const AdminPage = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="grid-container">

      {/* Header */}
      <header className="header">
        <div className="menu-icon">
          <BsJustify className="icon" onClick={OpenSidebar} />
        </div>
        <div className="header-left">
          <BsSearch className="icon" />
        </div>
        <div className="header-right">
          <BsFillBellFill className="icon" />
          <BsFillEnvelopeFill className="icon" />
          <BsPersonCircle className="icon" />
        </div>
      </header>

      {/* Sidebar */}
      <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <BsCart3 className="icon_header" />SHOP
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>X</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item"><a href=""><BsGrid1X2Fill className="icon" /> Dashboard</a></li>
          <li className="sidebar-list-item"><a href=""><BsArchiveFill className="icon" /> Products</a></li>
          <li className="sidebar-list-item"><a href=""><BsFillGrid3X3GapFill className="icon" /> Categories</a></li>
          <li className="sidebar-list-item"><a href=""><BsPeopleFill className="icon" /> Users</a></li>
          <li className="sidebar-list-item"><a href=""><BsListCheck className="icon" /> Inventory</a></li>
          <li className="sidebar-list-item"><a href=""><BsFillMenuButtonWideFill className="icon" /> Reports</a></li>
          <li className="sidebar-list-item"><a href=""><BsFillGearFill className="icon" /> Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner"><h3>PRODUCTS</h3><BsArchiveFill className="card_icon" /></div>
            <h1>100</h1>
          </div>
          <div className="card">
            <div className="card-inner"><h3>CATEGORIES</h3><BsFillGrid3X3GapFill className="card_icon" /></div>
            <h1>5</h1>
          </div>
          <div className="card">
            <div className="card-inner"><h3>USERS</h3><BsPeopleFill className="card_icon" /></div>
            <h1>16</h1>
          </div>
          <div className="card">
            <div className="card-inner"><h3>ALERTS</h3><BsFillBellFill className="card_icon" /></div>
            <h1>2</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
