import React, { Component } from 'react';
export default function AdminDash(params) {
    function onLogout(){
        window.localStorage.removeItem('sessAdmin');
        window.location.href = 'http://localhost:3000/';
    }
    return (
        <div>
            <button onClick={onLogout}>Log Out</button>
        </div>
    );
};
