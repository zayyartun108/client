import { useEffect, useState } from "react";
import api from "../api";
import "./sidebarcss/Skilllist.css"

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
function Home() {
    const [form, setForm] = useState({ skill_title: "", skill_icon_url: null, skill_percentage: "", skill_detail: "" })
    const [project, setProject] = useState([])
    const [plusing, setPlusing] = useState(true)
    const [editid, setEditid] = useState(null)
    const ok = async () => {
        const res = await api.get("/admin/skilllist/")
        setProject(res.data)
    }
    const token = localStorage.getItem('access')
    const create = async (e) => {
        e.preventDefault()
        if (editid) {
            const data = new FormData()
            data.append("skill_title", form.skill_title,)
            data.append("skill_icon_url", form.skill_icon_url)


            data.append("skill_percentage", form.skill_percentage)

            data.append("skill_detail", form.skill_detail)
            const token = localStorage.getItem('access')
            console.log(editid)
            const res = await api.put(`/admin/skilllist/${editid}/`, data)
            setEditid(null)
            setForm({ skill_title: "", skill_percentage: "", skill_detail: "" })
            ok()
            setPlusing(x => !x)

        } else {
            try {

                const data = new FormData()
                data.append("skill_title", form.skill_title,)
                data.append("skill_icon_url", form.skill_icon_url)

                data.append("skill_percentage", form.skill_percentage)

                data.append("skill_detail", form.skill_detail)
                const token = localStorage.getItem('access')
                const res = await api.post(`/admin/skilllist/`, data)
                console.log(res.data)
                setForm({ skill_title: "", skill_percentage: "", skill_detail: "" })

                ok()
                setPlusing(x => !x)
            } catch {
                console.log("error")
            }
        }

    }
    const edit = (x) => {
        setPlusing(x => !x)
        setEditid(x.id)
        setForm({ skill_title: x.skill_title,skill_icon_url:x.skill_icon_url, skill_percentage: x.skill_percentage, skill_detail: x.skill_detail })
    }
    const deleteitem = async (x) => {
        const token = localStorage.getItem('access')
        const res = await api.delete(`/admin/skilllist/${x.id}/`)
        console.log(x.id)
        ok()
    }
    const plus = () => {
        setPlusing(x => !x)
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
                </div>

                <div className="projectlist_table">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Image ICon</th>

                                <th>Percentage</th>
                                <th>Detail</th>

                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {project.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.skill_title}</td>
                                    <td>{x.skill_icon_url}</td>
                                    <td>{x.skill_percentage}</td>

                                    <td>{x.skill_detail}</td>
                                    <td><button onClick={() => edit(x)}>Edit</button></td>
                                    <td><button onClick={() => deleteitem(x)}>Delete</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="homecontainers" style={plusing ? { display: "none" } : { display: "block" }}>


                <form className="homeadmins" onSubmit={create}>
                    <h1 className="headers">Skill Create</h1>


                    <div className="home_admins">
                        <p className="inputtitles">Skill Title </p>
                        <input className="inputhomes" value={form?.skill_title} type="text" onChange={e => setForm({ ...form, skill_title: e.target.value })} />

                    </div>
                    <div className="home_admins">
                        <p className="inputtitles">Skill Icon Url</p>
                        <input className="inputhome" type="file" onChange={e => setForm({ ...form, skill_icon_url: e.target.files[0] })} />

                    </div>

                    <div className="home_admins">
                        <p className="inputtitles">Skill Percentage</p>
                        <input className="inputhomes" value={form?.skill_percentage} type="number" onChange={e => setForm({ ...form, skill_percentage: e.target.value })} />

                    </div>

                    <div className="home_admins">
                        <p className="inputtitles">Skill Detail</p>
                        <input className="inputhomes" value={form?.skill_detail} type="text" onChange={e => setForm({ ...form, skill_detail: e.target.value })} />

                    </div>
                    <div className="skill-u-e">
                        <button className="update-btns" type="submit">{editid ? "Update" : "Create"}</button>
                        <button className="update-btns" onClick={ok} type="submit">Cancel</button>
                    </div>

                </form>





            </div>

        </>
    )
}

export default Home;
