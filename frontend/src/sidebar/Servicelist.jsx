import { useEffect, useState } from "react";
import api from "../api";
import "./sidebarcss/Servicelist.css"

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
function Home() {
    const [plusing, setPlusing] = useState(true)
    const [form, setForm] = useState({ service_title: "", service_image_url: null, service_description: "", service_price: "", service_price_unit: "" })
    const [project, setProject] = useState([])
    const [editid, setEditid] = useState(null)

    const ok = async () => {
        const res = await api.get("/admin/servicelist/")
        setProject(res.data)
    }
    const token = localStorage.getItem('access')
    const create = async (e) => {
        e.preventDefault()
        if (editid) {
            const data = new FormData()
            data.append("service_title", form.service_title,)

            if (form.service_image_url) {
                data.append("service_image_url", form.service_image_url);
            }
            data.append("service_description", form.service_description)
            data.append("service_price", form.service_price)
            data.append("service_price_unit", form.service_price_unit)
            const token = localStorage.getItem('access')
            console.log(editid)
            const res = await api.put(`/admin/servicelist/${editid}/`, data)
            setEditid(null)
            setForm({ service_title: "", service_image_url: null, service_description: "", service_price: "", service_price_unit: "" })
            ok()
            setPlusing(x => !x)


        } else {
            try {

                const data = new FormData()
                data.append("service_title", form.service_title,)
                data.append("service_image_url", form.service_image_url)
                data.append("service_description", form.service_description)
                data.append("service_price", form.service_price)
                data.append("service_price_unit", form.service_price_unit)
                const token = localStorage.getItem('access')
                const res = await api.post(`/admin/servicelist/`, data)
                console.log(res.data)
                setForm({ service_title: "", service_image_url: null, service_description: "", service_price: "", service_price_unit: "" })

                ok()
                setPlusing(x => !x)

            } catch {
                console.log("error")
            }
        }

    }
    const edit = (x) => {
        setEditid(x.id)
        setPlusing(false);
        setForm({ service_title: x.service_title, service_image_url: null, service_description: x.service_description, service_price: x.service_price, service_price_unit: x.service_price_unit })
    }
    const deleteitem = async (x) => {
        const token = localStorage.getItem('access')
        const res = await api.delete(`/admin/servicelist/${x.id}/`)
        console.log(x.id)
        ok()
    }
    useEffect(() => {
        ok()
    }, [])
    const plus = () => {
        setPlusing(x => !x)
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="projectlistcontainer">
                <div className="skillheader">

                    <h1 className="header">Service List</h1>
                    <button className="create" onClick={plus}>Create New +</button>
                </div>

                <div className="projectlist_table">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Image</th>

                                <th>Description</th>
                                <th>Price</th>
                                <th>Unit</th>

                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>

                        </thead>
                        <tbody>
                            {project.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.service_title}</td>
                                    <td>{x.service_image_url}</td>
                                    <td>{x.service_description}</td>
                                    <td>{x.service_price}</td>
                                    <td>{x.service_price_unit}</td>
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
                    <h1 className="headers">service Create</h1>


                    <div className="home_admins">
                        <p className="inputtitles">service Title </p>
                        <input className="inputhomes" value={form?.service_title} type="text" onChange={e => setForm({ ...form, service_title: e.target.value })} />

                    </div>
                    <div className="home_admins">
                        <p className="inputtitles">service Image Url</p>
                        <input className="inputhome" type="file" onChange={e => setForm({ ...form, service_image_url: e.target.files[0] })} />

                    </div>

                    <div className="home_admins">
                        <p className="inputtitles">service Description</p>
                        <input className="inputhomes" value={form?.service_description} type="text" onChange={e => setForm({ ...form, service_description: e.target.value })} />

                    </div>

                    <div className="home_admins">
                        <p className="inputtitles">service pirce</p>
                        <input className="inputhomes" value={form?.service_price} type="number" onChange={e => setForm({ ...form, service_price: e.target.value })} />

                    </div>
                    <div className="home_admins">
                        <p className="inputtitles">service price unit</p>
                        <input className="inputhomes" value={form?.service_price_unit} type="text" onChange={e => setForm({ ...form, service_price_unit: e.target.value })} />

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
