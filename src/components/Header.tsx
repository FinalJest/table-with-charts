import React from "react";
import "./Header.css";

export default function Header(props: { children: React.ReactNode }) {
    return (
        <div className="Header">
            {props.children}
        </div>
    );
}
