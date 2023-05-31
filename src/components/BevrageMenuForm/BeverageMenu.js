import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./beverage-menu-form.css";
import db from "../firebase";

function BeverageMenu() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  const [selectedBeverage, setSelectedBeverage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("order").add({
      beverage: selectedBeverage,
      name: customerName,
    });
    navigate("/queue");
  };
  useEffect(() => {
    db.collection("drink").onSnapshot((snapshot) => {
      setMenu(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="bodyStyle">
      <div className="menuFormStyle">
        <div>
          <h2>BEVERAGE MENU</h2>
          {menu.length > 0 ? (
            <div className="menuStyle">
              {menu.map((item) => (
                <div className="menuItemStyle" key={item.id}>
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="menuStyle">
              <p className="menuItemStyle">Loading menu...</p>
            </div>
          )}
        </div>
        <div>
          <h2>ORDER YOUR BEVERAGE</h2>
          <div className="formStyle">
            <form onSubmit={handleSubmit}>
              <div className="fieldStyle">
                <label className="label">NAME</label>
                <input
                  type="text"
                  className="inputStyle"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="fieldStyle">
                <label className="label">BEVERAGE</label>
                <select
                  className="selectStyle"
                  id="beverage-select"
                  value={selectedBeverage}
                  onChange={(event) => setSelectedBeverage(event.target.value)}
                >
                  <option value="">-- Please Select --</option>
                  {menu.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button className="button" type="submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeverageMenu;
