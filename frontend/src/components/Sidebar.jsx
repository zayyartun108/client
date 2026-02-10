import { NavLink } from 'react-router-dom';
import "../style/Sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebarlist">
        <h2 className="sidebarheader">Admin Dashboard</h2>

        <NavLink to="/admin" end>
          {({ isActive }) => <li className={isActive ? "active" : "li"} >User List</li>}
        </NavLink>

        <NavLink to="/admin/homesection">
          {({ isActive }) => <li className={isActive ? "active" : "li"}>Web Page</li>}
        </NavLink>

        <NavLink to="/admin/skilllist">
          {({ isActive }) => <li className={isActive ? "active" : "li"}>Skill</li>}
        </NavLink>

        <NavLink to="/admin/projectlist">
          {({ isActive }) => <li className={isActive ? "active" : "li"}>Project</li>}
        </NavLink>

        <NavLink to="/admin/servicelist">
          {({ isActive }) => <li className={isActive ? "active" : "li"}>Service</li>}
        </NavLink>
        <NavLink to="/admin/sociallist">
          {({ isActive }) => <li className={isActive ? "active" : "li"}>Social</li>}
        </NavLink>

        
      </ul>

      <button className="sidebarsetting">Setting</button>
    </div>
  );
}

export default Sidebar;
