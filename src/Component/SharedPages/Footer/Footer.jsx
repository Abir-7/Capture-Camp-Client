import { Slide, Zoom } from "react-awesome-reveal";
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../../../assets/logo.png'
const Footer = () => {
  return (
    <>
      <Slide>
        <footer className=" text-black bg-slate-100 rounded-lg">

          <div className='footer p-10 pb-4 '>

            <div>
              <Zoom>
              <div className="grid gap-2">
                <img width={'200px'} src={logo} alt="" />
                <p className='mx-2'>Photography Course</p>
              </div>
              </Zoom>
            </div>

            <div>
              <Zoom>
              <div className="grid gap-2">
                <span className="font-extrabold text-xl">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
              </div>
              </Zoom>
            </div>


            <div>
              <Zoom>
              <div className="grid gap-2">
                <span className="font-extrabold text-x">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
              </div>
              </Zoom>
            </div>


            <div>
              <Zoom>
              <div className="grid gap-2">
                <span className="font-extrabold  flex text-xl ">Social Link</span>
                <a className="link link-hover  flex items-center"><FaFacebook className='mx-2'></FaFacebook> Facebook</a>
                <a className="link link-hover flex items-center"><FaInstagram className='mx-2'></FaInstagram> Instagram</a>
                <a className="link link-hover  flex items-center "><FaWhatsapp className='mx-2'></FaWhatsapp> WhatsApp</a>
              </div>
              </Zoom>
            </div>

          </div>
          <hr />

          <p className='text-black py-5 text-center mx-2' >©2023 Your Company/Organization Name. All rights reserved.</p>

        </footer>
      </Slide>
    </>
  );
};

export default Footer;