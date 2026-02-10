import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import "../style/Admin.css"



function Admin() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchvalue, setSearchvalue] = useState("");

  useEffect(() => {

    fetchAdmin();
  }, []);
  const fetchAdmin = async (x = "") => {
    const token = localStorage.getItem("access");
    try {
      let res;
      let url = "/admin/"
      if (x) {
        url += `?search=${x}`
      }

      res = await api.get(url);
      setData(res.data);
      setError(""); // clear previous error
    } catch (err) {
      console.log(err);
      setError("Access denied or server not reachable");
      setData([]);
    }


  };
  const xing = () => {
    fetchAdmin(searchvalue)
    console.log(searchvalue)
  }
  const alling=()=>{
    fetchAdmin()
  }
  return (
    <>
      {/* 
    <h1>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {
        data.map(x => (
          <div key={x.id}>
            <p>{x.username}</p>
            <p>{x.email}</p>
          </div>

        ))
      }
    */}
      <Navbar />
      <Sidebar />
      <div className="admindashboard">



        <div className="admin-top">
          <div>User Table</div>
          <div className="search-box">
            <input type="search" value={searchvalue} onChange={e => setSearchvalue(e.target.value)} className="search" placeholder="Search ... ">
            </input>
            <button onClick={xing} >Search</button>
            <button onClick={alling}>Show All</button>
          </div>

        </div>



        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Active</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(x => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.username}</td>
                  <td>{x.email}</td>
                  <td>{x.first_name}</td>
                  <td>{x.last_name}</td>
                  <td>{x.is_active ? "Yes" : "No"}</td>
                  <td>{x.is_superuser ? "Yes" : "No"}</td>
                </tr>
              ))}
            
          </tbody>
        </table>

        {error && <p style={{ color: "red" }}>{error}</p>}








      </div>




    </>
  );
}

export default Admin;
