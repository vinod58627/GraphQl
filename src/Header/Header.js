import React from 'react'
import { NavLink, } from 'react-router-dom';
import * as HERBUI from "react-bootstrap";

const Header = () => {
    return (
        <div className='navigation'>
            <HERBUI.Navbar collapseOnSelect expand="lg" fixed="top" className="HERB-Top-Nav" style={{ posistion: "fixed", top: "0px" }} >
                <ul className='p-3 d-flex bg-dark w-100'>
                    <NavLink style={({ isActive, isPending }) => { return { color: isActive ? "red" : "white" } }} to="/home">Home</NavLink>
                    <NavLink style={({ isActive, isPending }) => { return { color: isActive ? "red" : "white" } }} to="/about">About</NavLink>
                    <NavLink style={({ isActive, isPending }) => { return { color: isActive ? "red" : "white" } }} to="/messages">Messages</NavLink>
                    <NavLink style={({ isActive, isPending }) => { return { color: isActive ? "red" : "white" } }} to="/formPost">Add Form</NavLink>
                    <NavLink style={({ isActive, isPending }) => { return { color: isActive ? "red" : "white" } }} to="/latest">SWR</NavLink>
                
                </ul>
            </HERBUI.Navbar>
        </div>
    )
}

export default Header