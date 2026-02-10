import { useEffect, useState } from "react";
import api from "../api";
import "./sidebarcss/Homeadmin.css"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
function Home() {

  const token = localStorage.getItem('access')
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: "",
    home_image_url: null,
    home_name: "",
    home_job: "",
    home_description: "",
    home_buttonone: "",
    home_buttontwo: "",
    about_image_url: null,
    about_image_url1: null,
    about_header: "",
    about_description: "",
    about_button: "",
    about_button_url: "",
    skill_image_url: null,
    skill_header: "",
    skill_list: [],
    project_header: "",

    service_header: "",
    contact_text: "",
    footer_h: "",
    footer_p: "",
    gmail: "",
    phone: "",
    tiktok: "",
  });


  const x = async (e) => {

    try {
      const token = localStorage.getItem("access");

      const res = await api.get("/admin/homesection/")
      const section = Array.isArray(res.data) ? res.data[0] : res.data;

      setForm({
        home_image_url: null,
        home_name: section.home_name || "",
        home_job: section.home_job || "",
        home_description: section.home_description || "",
        home_buttonone: section.home_buttonone || "",
        home_buttontwo: section.home_buttontwo || "",
        about_image_url: null,
        about_image_url1: null,
        about_header: section.about_header || "",
        about_description: section.about_description || "",
        about_button: section.about_button || "",
        about_button_url: section.about_button_url || "",
        skill_image_url: null,
        skill_header: section.skill_header || "",
        skill_list: section.skill_list || [],
        project_header: section.project_header || "",

        service_header: section.service_header || "",
        contact_text: section.contact_text,
        footer_h: section.footer_h || "",
        footer_p: section.footer_p || "",
        phone: section.phone || "",
        gmail: section.gmail || "",
        tiktok: section.tiktok || "",

      });



      console.log(section.home_image_url)


    }
    catch {
      console.log("error")
    }

  }
  const update = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      if (form.home_image_url) {
        data.append("home_image_url", form.home_image_url)

      }
      data.append("home_name", form.home_name)
      data.append("home_job", form.home_job)
      data.append("home_description", form.home_description)
      data.append("home_buttonone", form.home_buttonone)
      data.append("home_buttontwo", form.home_buttontwo)
      if (form.about_image_url) {
        data.append("about_image_url", form.about_image_url)

      }
      if (form.about_image_url1) {
        data.append("about_image_url1", form.about_image_url1)

      }

      data.append("about_header", form.about_header)
      data.append("about_description", form.about_description)
      data.append("about_button", form.about_button)
      data.append("about_button_url", form.about_button_url)

      if (form.skill_image_url) {
        data.append("skill_image_url", form.skill_image_url)

      }
      data.append("skill_header", form.skill_header)
      data.append("project_header", form.project_header)
      data.append("service_header", form.service_header)

      data.append("contact_text", form.contact_text)
      data.append("footer_p", form.footer_p)
      data.append("footer_h", form.footer_h)
      data.append("phone", form.phone)
      data.append("gmail", form.gmail)
      data.append("tiktok", form.tiktok)
      const token = localStorage.getItem("access");
      const res = await api.put("/admin/homesection/", data)
      console.log(res.data)

      await x();
    } catch {
      console.log("error")
      
    }
  }
  useEffect(() => {

    x();
  }, [])



  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="adminhomecontainer">
        <h1 className="header">Web Page</h1>
        <form onSubmit={update}>
          <div className="homeadmin">
            <p >{form?.id}</p>
            <div className="section-admin">
              <p className="sectionheader">Home Section</p>
            </div>
            <div className="home_admin">
              <p className="inputtitle">Home Image :</p>              <p className="nowvalue"></p>



              <input className="inputhomes" type="file" onChange={e => setForm({ ...form, home_image_url: e.target.files[0] })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Name </p>
              <p className="nowvalue">{form?.home_name}</p>
              <input className="inputhomes" value={form?.home_name} type="text" onChange={e => setForm({ ...form, home_name: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Job</p>
              <p className="nowvalue">{form?.home_job}</p>
              <input className="inputhomes" value={form?.home_job} type="text" onChange={e => setForm({ ...form, home_job: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Description</p>
              <p className="nowvalue">{form?.home_description}</p>
              <input className="inputhomes" value={form?.home_description} type="text" onChange={e => setForm({ ...form, home_description: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Button 1 name :</p>
              <p className="nowvalue">{form?.home_buttonone}</p>
              <input className="inputhomes" value={form?.home_buttonone} type="text" onChange={e => setForm({ ...form, home_buttonone: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Button 2 name :</p>
              <p className="nowvalue">{form?.home_buttontwo}</p>
              <input className="inputhomes" value={form?.home_buttontwo} type="text" onChange={e => setForm({ ...form, home_buttontwo: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About Image Url : </p>
              <p className="nowvalue"></p>
              <input className="inputhomes" type="file" onChange={e => setForm({ ...form, about_image_url: e.target.files[0] })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About Image Url1 : </p>
              <p className="nowvalue"></p>
              <input className="inputhomes" type="file" onChange={e => setForm({ ...form, about_image_url1: e.target.files[0] })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About Header </p>
              <p className="nowvalue">{form?.about_header}</p>
              <input className="inputhomes" value={form?.about_header} type="text" onChange={e => setForm({ ...form, about_header: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About Description</p>
              <p className="nowvalue">{form?.about_description}</p>
              <input className="inputhomes" value={form?.about_description} type="text" onChange={e => setForm({ ...form, about_description: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About button</p>
              <p className="nowvalue">{form?.about_button}</p>
              <input className="inputhomes" value={form?.about_button} type="text" onChange={e => setForm({ ...form, about_button: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">About Button Url</p>
              <p className="nowvalue">{form?.about_button_url}</p>
              <input className="inputhomes" value={form?.about_button_url} type="text" onChange={e => setForm({ ...form, about_button_url: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Skill Header</p>
              <p className="nowvalue">{form?.skill_header}</p>
              <input className="inputhomes" value={form?.skill_header} type="text" onChange={e => setForm({ ...form, skill_header: e.target.value })} />

            </div><div className="home_admin">
              <p className="inputtitle">Skill Image Url : </p>
              <p className="nowvalue"></p>
              <input className="inputhomes" type="file" onChange={e => setForm({ ...form, skill_image_url: e.target.files[0] })} />

            </div>





            
             <div className="home_admin">
              <p className="inputtitle">Service Header</p>
              <p className="nowvalue">{form?.service_header}</p>
              <input className="inputhomes" value={form?.service_header} type="text" onChange={e => setForm({ ...form, service_header: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Contact Text</p>
              <p className="nowvalue">{form?.contact_text}</p>
              <input className="inputhomes" value={form?.contact_text} type="text" onChange={e => setForm({ ...form, contact_text: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Footer Header</p>
              <p className="nowvalue">{form?.footer_h}</p>
              <input className="inputhomes" value={form?.footer_h} type="text" onChange={e => setForm({ ...form, footer_h: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Footer P</p>
              <p className="nowvalue">{form?.footer_p}</p>
              <input className="inputhomes" value={form?.footer_p} type="text" onChange={e => setForm({ ...form, footer_p: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Email </p>
              <p className="nowvalue">{form?.gmail}</p>
              <input className="inputhomes" value={form?.gmail} type="text" onChange={e => setForm({ ...form, gmail: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">Phone</p>
              <p className="nowvalue">{form?.phone}</p>
              <input className="inputhomes" value={form?.phone} type="text" onChange={e => setForm({ ...form, phone: e.target.value })} />

            </div>
            <div className="home_admin">
              <p className="inputtitle">tiktok</p>
              <p className="nowvalue">{form?.tiktok}</p>
              <input className="inputhomes" value={form?.tiktok} type="text" onChange={e => setForm({ ...form, tiktok: e.target.value })} />

            </div>


            <button className="home-update-btn" type="submit">Update</button>
          </div>
        </form>

      </div>

    </>
  )
}

export default Home;
