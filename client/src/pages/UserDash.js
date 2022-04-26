import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
export default function UserDash(params) {
    const u = window.localStorage.getItem('sessUser');
    if(!u){
        window.location.href = 'http://localhost:3000/';
    }
    function onLogout(){
        window.localStorage.removeItem('sessUser');
        window.location.href = 'http://localhost:3000/';
    }
    function favLinks(){
        const favs = (JSON.parse(u)).favs;
        return favs.map(x=>{
            const {fid,dname} = x
            return (
                <Link key={fid} to={`/${fid}`}>{dname}</Link>
            )
        })
    }
    return (
        <div>
            <button onClick={onLogout}>Log Out</button>
            <div className='column'>
                {favLinks()}
            </div>
        </div>
    );
};
