import './NavBar.css';
import React, { useEffect, useState } from 'react';

export default function NavBar() {
    const [show,handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 70){
                handleShow(true);
            }else handleShow(false);
        });
        return ()=>{
            window.removeEventListener("scroll",()=>{
                if(window.scrollY > 70){
                    handleShow(true);
                }else handleShow(false);
            });
        }
    },[])
    return (
        <div className={`nav ${show &&"nav-black"}`}>
            <img
                className="nav-logo" 
                src="../picture/logo.svg"
                alt="Netflix Logo"
            />
            <img
                className="nav-avatar" 
                src="../picture/avatar.png"
                alt="Netflix Avatar"
            />
        </div>
    )
}
