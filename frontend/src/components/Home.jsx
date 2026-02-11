
import Navbar from "./Navbar"
import "../style/Home.css"
import ZayarImg from "../assets/zay.png"
import New from "../assets/new.png"
import { useEffect, useRef, useState } from "react"
import api from "../api"
import emailjs from "@emailjs/browser";
import { FaTiktok, FaFacebook, FaViber, FaPhone } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
function Home() {
  const [skill, setSkill] = useState([])
  const [project, setProject] = useState([])
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [social, setSocial] = useState([]);
  const [service, setService] = useState([]);
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
    skill_icon_url: null,
    skill_header: "",
    project_title: "",
    project_name: "",

    project_button_url: null,

    service_header: "",
    contact_text: "",
    footer_h: "",
    footer_p: "",
    social_icon: null,
  });

  const slides = useRef(null);
  const prev = () => {
    slides.current.scrollBy({
      left: slides.current.clientWidth * -1,
      behavior: "smooth",
    });
  };
  const next = () => {
    slides.current.scrollBy({
      left: slides.current.clientWidth * 1,
      behavior: "smooth",
    })

  }

  const data = async () => {
    const res = await api.get("admin/homesection/")
    const res1 = await api.get("/admin/skilllist/")
    const res3 = await api.get("/admin/projectlist/")
    const res4 = await api.get("/admin/sociallist/")
    const res5 = await api.get("/admin/servicelist/")
    setProject(res3.data)
    setForm(res.data);
    setSkill(res1.data)
    setSocial(res4.data);
    setService(res5.data);
    console.log(res.data)
  }
  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 5;

      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
      }
    }, 100);
    data()

    return () => clearInterval(interval);
  }, []);

  const forming = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_i3cvsyv", // example: "service_xxxxx"
        "template_ekzz4cg", // example: "template_xxxxx"
        forming.current,
        "StG9flFO2Yx8LPAMy" // example: "user_xxxxx"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          forming.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("Something went wrong. Try again.");
        }
      );
  };

  const ok = async () => {


  }
  if (progress < 100) {
    return (
      <>
        <div className="test">
          <div className="scene">
            <div className="box">
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face left"></div>
              <div className="face right"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>




      </>
    )
  }

  return (
    <>

      <Navbar />
      <div className="section-container">

        {/* Home Page */}
        <section className="home" >
          <div className="home-left">
            <div className="portfolio-img-border">
              <img src={`https://server-4z8u.onrender.com/api${form.home_image_url}`} alt="Zayar Tun" className="portfolio-img" />
              <div></div>
            </div>

          </div>
          <div className="home-right">
            <div className="name-container">
              <h2 className="name" >{form?.home_name || "nothing"} </h2>
            </div>
            <h1 className="position">{form?.home_job}</h1>
            <p className="description">{form?.home_description}</p>
            <div className="home-buttons">
              <button className="home-project">{form?.home_buttontwo}</button>
              <button className="home-contact" ><a href="#contact">{form?.home_buttonone}</a></button>
            </div>

          </div>
        </section>


        {/* About Page */}
        <section className="about" ref={sectionRef} >
          <div className="about-left">
            <div className="img-border-circle">
              <img src={`https://server-4z8u.onrender.com/api${form.home_image_url}`} className="about-img" />

            </div>
            <div className="img-border">
              <img src={`https://server-4z8u.onrender.com/api${form.about_image_url}`} className="about-img" />

            </div>

            <div className="img-border-square">
              <img src={`https://server-4z8u.onrender.com/api${form.about_image_url1}`} className="about-img" />

            </div>

          </div>
          <div className="about-right">
            <div className="about-right-top">
              <h1 className="about-header">{form?.about_header}</h1>
            </div>
            <div className="about-right-bottom">
              <p className="about-text"> {form?.about_description}</p>
              <button className="about-read-btn">{form?.about_button}</button>
            </div>
          </div>
        </section>


        {/* Skill Page */}
        <section className="skill" >
          <div className="skill-left">



            {/* <div className="grid-container">
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">

                    </div>
                    <div className="grid-item">
                    </div>

                  </div>*/}





            <img src={`https://server-4z8u.onrender.com/api${form?.skill_image_url}`} alt="Zayar Tun" className="skill-img" />
          </div>
          <div className="skill-right">
            <h1 className="skill-header">{form?.skill_header}</h1>
            <div className="timescroll">
              <div className="timeline">



                {skill.map((x) => (
                  <div className="timeline-item rights" key={x.id}>
                    <div className="content">
                      <div className="icon-skill">
                        <img src={`https://server-4z8u.onrender.com/api${x?.skill_icon_url}`} className="icon-skill-photo" />

                        <h3 className="skill-title">{x.skill_title} . </h3>
                      </div>


                      <div className="progress-skill">
                        <div className="progress-containers">
                          <div className="progress-bars" style={{ width: `${x.skill_percentage}%` }}>{x.skill_percentage}%</div>
                        </div>
                      </div>

                      <p>Detail : {x.skill_detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>




            <button className="skill-see-more">See More</button>
          </div>

        </section>


        {/* Project Page */}
        <section className="project" >
          <h1 className="project-header">{form?.project_header}</h1>


          <div className="slider">
            <button className="prev" onClick={prev}>&#10094;</button>
            <div className="slides" ref={slides}>
              {project?.map((x) => (
                <div className="slide">
                  <img src={`https://server-4z8u.onrender.com/api${x.project_image_url}`} className="project-img" />
                  <div className="project_name_list">
                    <h2 className="project-name1">Project Name : </h2>
                    <h2 className="project-name">{x.project_title}</h2>
                  </div>

                  <button><a className="project-btn" href={x.project_button_url}>View Project</a></button>
                </div>
              ))}




            </div>
            <button className="next" onClick={next}>&#10095;</button>
          </div>
        </section>

        {/* Contact Page */}
        <section className="contact" >



          <form className="contact-lefts" ref={forming} onSubmit={sendEmail} >
            <h2 className="contact-header">Contact Me</h2>
            <div className="contact-inputs">
              <input className="
            contact-input" type="text" name="name" placeholder="Name" required />

              <input className="
            contact-input" type="Email" name="email" placeholder="Email" required />

              <input className="
            contact-input" type="text" name="message" placeholder="MESSAGE" required />
              <button className="contact-btn" type="submit"><BsFillSendFill /></button>

            </div>

           

           
          </form>




          <div className="contact-right" id="contact">
            <div className="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7643.347910108323!2d98.46271748579188!3d16.69319134569352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smm!4v1769782268969!5m2!1sen!2smm" className="googlemap" allowFullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">

              </iframe>
              <div className="contact-note">
                <p>{form.contact_text}</p>
              </div>
              <div className="social-link">
                {
                  social?.map((x) => (
                    <div className="icon">
                      <a href={x.social_link}>
                        <img src={`https://server-4z8u.onrender.com/api${x?.social_icon}`} className="social_icon_size" />
                      </a>


                    </div>
                  ))
                }






              </div>
            </div>
          </div>
        </section>

        {/* Footer section */}
        <section className="footer">
          <div className="footer-left">
            <h1 className="footer-header">Micro Z</h1>
            <h2 className="
            footer-header2">

              {form.footer_h}
            </h2>

            <p className="footer-p">{form.footer_p}</p>
          </div>
          <div className="footer-right">
            <div className="right1">
              <h2 className="right-no-header">Services</h2>
              {
                service?.map((x) => (
                  <a href="#">{x.service_title}</a>
                ))
              }


            </div>
            <div className="right2">
              <h2 className="right-no-header">Contact Me</h2>

              <div className="phone">

                {form?.phone}

              </div>
              <div className="email">{form?.gmail}</div>
              <div className="tiktoks">{form?.tiktok}</div>
            </div>

          </div>
        </section>






      </div>

    </>
  )
}

export default Home