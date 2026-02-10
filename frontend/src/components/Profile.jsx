import { useEffect, useState } from "react"
import api from "../api"
import Navbar from "./Navbar"
import "../style/Profile.css"
import ZayarImg from "../assets/zay.png"
function Profile() {
    const [profile, setProfile] = useState({     
        first_name: "",
        last_name: "",
        username: "",
        email: "",
    });

    const [form, setForm] = useState({
        first_name: "",
        last_name: ""
    })
    const [editid, setEditid] = useState(false);
    const ok = async () => {
        try {
            const res = await api.get("/profile/");


            if (!res.data.username) {
                window.location.href = "/login"
            } else {
                setProfile(res.data)
                console.log(res.data)
            }
        } catch {
            window.location.href = "/login"
        }



    }


    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"
    }
    const edit = (x) => {
        setEditid(true);
        setForm({ first_name: x.first_name, last_name: x.last_name });

    }
    const update = async () => {

        const res = await api.put("/profile/", form);
        ok();
        setEditid(false)
    }


    useEffect(() => {
        ok();
    }, [])

    return (
        <>
            <Navbar />
            <section className="profile section-container">
                <div className="profile-top">
                    <div className="profile-top-photo">
                        <img src={ZayarImg} alt="profile" className="profile-img" />
                    </div>

                    <div className="profile-top-view">
                        <div className="profile-user">Username : </div>
                        <div className="profile-username"> {profile?.username}</div>
                    </div>

                </div>
                <div className="profile-bottom">
                    <div className="detail">
                        <div className="profile-title">First Name :</div>
                        <div className="profile-detail">{profile?.first_name}</div>
                    </div>
                    <div className="detail">
                        <div className="profile-title">Last Name :</div>
                        <div className="profile-detail">{profile?.last_name}</div>
                    </div>
                    <div className="detail">
                        <div className="profile-title">Email :</div>
                        <div className="profile-detail">{profile?.email}</div>
                    </div>
                    <div className="detail">
                        <button className="edit-profile" onClick={() => edit(profile)}>Edit Profile</button>
                    </div>
                    <div className="detail">
                        <button className="logout-btn" onClick={logout}>Logout</button>
                    </div>







                </div>
                {!editid ? (
                    <>


                    </>
                ) : (

                    <>
                        <input className="editinput" placeholder="First Name " value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                        <input className="editinput" placeholder="last Name " value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                        <button onClick={update}>Update</button>
                    </>

                )}


            </section>

        </>
    )
}

export default Profile;
