import React, { Component } from 'react';
export default function UserDash(params) {
    function onLogout(){
        window.localStorage.removeItem('sessUser');
        window.location.href = 'http://localhost:3000/';
    }
    return (
        <div>
            <button onClick={onLogout}>Log Out</button>
        </div>
    );
};
