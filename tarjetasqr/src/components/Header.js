import React from "react";

const Header = () => {
  return (
    <header className="header">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5324/5324000.png"
        alt="Profile"
      />
      <h2>Lida Fernanda Soler</h2>
      <p>Gerente HSEQ</p>
      <div className="header-buttons">
        <button className="call-button">Call</button>
        <button className="email-button">Email</button>
      </div>
    </header>
  );
};

export default Header;
