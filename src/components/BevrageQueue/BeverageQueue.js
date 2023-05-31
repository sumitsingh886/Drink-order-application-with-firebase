import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./beverage-queue.css";
import Constant from "./Constant";

function BeverageQueue() {
  const [inQueue, setInQueue] = useState([]);
  const [beingMixed, setBeingMixed] = useState([]);
  const [readyToCollect, setReadyToCollect] = useState([]);

  useEffect(() => {
    db.collection("order").onSnapshot((snapshot) => {
      setInQueue(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    db.collection("mixed").onSnapshot((snapshot) => {
      setBeingMixed(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    db.collection("ready").onSnapshot((snapshot) => {
      setReadyToCollect(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);
  const moveFromQueueToBeingMixed = (item) => {
    Constant(inQueue,"order","mixed",item)
    // const mix = [...inQueue];
    // mix.splice(item, 1);
    // db.collection("mixed").add({
    //   beverage: item.data.beverage,
    //   name: item.data.name,
    // });
    // db.collection("order").doc(item.id).delete();
  };

  const moveFromBeingMixedToReadyToCollect = (item) => {
    Constant(beingMixed,"mixed","ready",item)
    // const ready = [...beingMixed];
    // ready.splice(item, 1);
    // db.collection("ready").add({
    //   beverage: item.data.beverage,
    //   name: item.data.name,
    
    // });
    // db.collection("mixed").doc(item.id).delete();
  };

  const removeFromReadyToCollect = (item) => {
    Constant(readyToCollect,"ready","collect",item)
    // const remove = [...readyToCollect];
    // remove.splice(item, 1);
    // db.collection("ready").doc(item.id).delete();
    // db.collection("collect").add({
    //   beverage: item.data.beverage,
    //   name: item.data.name,
    // });
  };

  const handleItemClick = (item) => {
    if (inQueue.includes(item)) {
      moveFromQueueToBeingMixed(item);
    } else if (beingMixed.includes(item)) {
      moveFromBeingMixedToReadyToCollect(item);
    } else if (readyToCollect.includes(item)) {
      removeFromReadyToCollect(item);
    }
  };

  return (
    <div className="queueStyle">
      <div className="sideBorder">
        <h2>BEVERAGE QUEUE</h2>
        <div className="queue-container">
          <div className="queue">
            <h3>IN THE QUEUE</h3>
            <div>
              {inQueue.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)}>
                  <div className="beverageStyle">{item.data.beverage}</div>
                  <div className="nameStyle">{item.data.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="queue">
            <h3>BEING MIXED</h3>
            <div>
              {beingMixed.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)}>
                  <div className="beverageStyle">{item.data.beverage}</div>
                  <div className="nameStyle">{item.data.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="queue">
            <h3>READY TO COLLECT</h3>
            <div>
              {readyToCollect.map((item, index) => (
                <div key={index} onClick={() => handleItemClick(item)}>
                  <div className="beverageStyle">{item.data.beverage}</div>
                  <div className="nameStyle">{item.data.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeverageQueue;
