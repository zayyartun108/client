import { useEffect, useState } from "react";
import api from "../api";
import "./sidebarcss/Projectlist.css"

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
function Home() {
    const [plusing, setPlusing] = useState(true)
    const [form, setForm] = useState({ project_title: "", project_image_url: null, project_detail: "", project_button_url: "" })
    const [project, setProject] = useState([])
    const [editid, setEditid] = useState(null)
    const ok = async () => {
        const res = await api.get("/admin/projectlist/")
        setProject(res.data)
    }
    const token = localStorage.getItem('access')
    const create = async (e) => {
        e.preventDefault()
        if (editid) {
            const data = new FormData()
            data.append("project_title", form.project_title,)

            data.append("project_image_url", form.project_image_url);

            data.append("project_detail", form.project_detail)
            data.append("project_button_url", form.project_button_url)
            const token = localStorage.getItem('access')
            console.log(editid)
            const res = await api.put(`/admin/projectlist/${editid}/`, data)
            setEditid(null)
            setForm({ project_title: "", project_image_url: null, project_detail: "", project_button_url: "" })
            ok()
            setPlusing(x => !x)

        } else {
            try {

                const data = new FormData()
                data.append("project_title", form.project_title,)
                data.append("project_image_url", form.project_image_url)
                data.append("project_detail", form.project_detail)
                data.append("project_button_url", form.project_button_url)
                const token = localStorage.getItem('access')
                const res = await api.post(`/admin/projectlist/`, data)
                console.log(res.data)
                setForm({ project_title: "", project_image_url: null, project_detail: "", project_button_url: "" })

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
        setForm({ project_title: x.project_title, project_image_url: null, project_detail: x.project_detail, project_button_url: x.project_button_url })
    }
    const deleteitem = async (x) => {
        const token = localStorage.getItem('access')
        const res = await api.delete(`/admin/projectlist/${x.id}/`)
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
                                <th>Title</th>
                                <th>Image Url</th>
                                <th>Image</th>
                                <th>Detail</th>
                                <th>button name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {project.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.project_title}</td>
                                    <td>{x.project_image_url}</td>
                                    <td><img
                                        src={`s://server-4z8u.onrender.com/api${x.project_image_url}`}
                                        alt=""
                                        width="60"
                                    /></td>
                                    <td>{x.project_detail}</td>
                                    <td>{x.project_button_url}</td>
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
                    <h1 className="header">Project Create</h1>


                    <div className="home_admin">
                        <p className="inputtitle">Project Title </p>
                        <input className="inputhome" value={form?.project_title} type="text" onChange={e => setForm({ ...form, project_title: e.target.value })} />

                    </div>
                    <div className="home_admin">
                        <p className="inputtitle">Project Image Url</p>
                        <input className="inputhome" type="file" onChange={e => setForm({ ...form, project_image_url: e.target.files[0] })} />

                    </div>
                    <div className="home_admin">
                        <p className="inputtitle">Project Detail</p>
                        <input className="inputhome" value={form?.project_detail} type="text" onChange={e => setForm({ ...form, project_detail: e.target.value })} />

                    </div>
                    <div className="home_admin">
                        <p className="inputtitle">Project button url</p>
                        <input className="inputhome" value={form?.project_button_url} type="text" onChange={e => setForm({ ...form, project_button_url: e.target.value })} />

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
