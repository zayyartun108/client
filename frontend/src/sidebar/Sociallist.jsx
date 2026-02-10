import { useEffect, useState } from "react";
import api from "../api";
import "./sidebarcss/Sociallist.css"

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
function Home() {
    const [plusing, setPlusing] = useState(true)
    const [form, setForm] = useState({ social_name: "", social_icon: null, social_link: "" })
    const [project, setProject] = useState([])
    const [editid, setEditid] = useState(null)
    const ok = async () => {
        const res = await api.get("/admin/sociallist/")
        setProject(res.data)
    }
    const token = localStorage.getItem('access')
    const create = async (e) => {
        e.preventDefault()
        if (editid) {
            const data = new FormData()
            data.append("social_name", form.social_name || "")

            if (form.social_icon instanceof File) {
                data.append("social_icon", form.social_icon);
            }

            data.append("social_link", form.social_link || "")
            const token = localStorage.getItem('access')
            console.log(editid)
            const res = await api.put(`/admin/sociallist/${editid}/`, data)
            setEditid(null)
            setForm({ social_name: "", social_icon: null, social_link: "" })

            ok()
            setPlusing(x => !x)

        } else {
            try {

                const data = new FormData()
                data.append("social_name", form.social_name,)
                data.append("social_icon", form.social_icon)
                data.append("social_link", form.social_link)
                const token = localStorage.getItem('access')
                const res = await api.post(`/admin/sociallist/`, data)
                console.log(res.data)
                setForm({ social_name: "", social_icon: "", social_link: "" })

                ok()
                setPlusing(x => !x)
            } catch {
                console.log("error")
            }
        }

    }
    const plus = () => {
        setPlusing(x => !x)
    }
    const edit = (x) => {
        setPlusing(x => !x)
        setEditid(x.id)
        setForm({ social_icon: x.social_icon, social_name: x.social_name, social_link: x.social_link })
    }
    const deleteitem = async (x) => {
        const token = localStorage.getItem('access')
        const res = await api.delete(`/admin/sociallist/${x.id}/`)
        console.log(x.id)
        ok()
    }
    useEffect(() => {
        ok()
    }, [])
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="projectlistcontainer">
                <div className="skillheader">

                    <h1 className="header">Skill List</h1>
                    <button className="create" onClick={plus}>Create New +</button>
                </div>                <div className="projectlist_table">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>social Name</th>
                                <th>Social Icon</th>
                                <th>social Link</th>

                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {project.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.social_name}</td>

                                    <td><img
                                        src={`https://server-4z8u.onrender.com/api${x.social_icon}`}
                                        alt=""
                                        width="60"
                                    />
                                        {x.social_icon}</td>
                                    <td>
                                        {x.social_link}
                                    </td>

                                    <td><button onClick={() => edit(x)}>Edit</button></td>
                                    <td><button onClick={() => deleteitem(x)}>Delete</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="homecontainers" style={plusing ? { display: "none" } : { display: "block" }}>


                <form className="homeadmin" onSubmit={create}>
                    <h1 className="header">Social Create</h1>


                    <div className="home_admin">
                        <p className="inputtitle">social Name</p>
                        <input className="inputhome" value={form?.social_name} type="text" onChange={e => setForm({ ...form, social_name: e.target.value })} />

                    </div>
                    <div className="home_admin">
                        <p className="inputtitle">social Icon</p>
                        <input className="inputhome" type="file" onChange={e => setForm({ ...form, social_icon: e.target.files[0] })} />

                    </div>
                    <div className="home_admin">
                        <p className="inputtitle">Social Link</p>
                        <input className="inputhome" value={form?.social_link} type="text" onChange={e => setForm({ ...form, social_link: e.target.value })} />

                    </div>

                    <div className="skill-u-e">
                        <button className="update-btn" type="submit">{editid ? "Update" : "Create"}</button>

                        <button className="update-btns" onClick={ok} type="submit">Cancel</button>
                    </div>

                </form>





            </div>

        </>
    )
}

export default Home;
