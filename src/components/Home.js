import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import MyCalendar from "./MyCalendar";

function Home() {
  const [startQuestDate, setStartQuestDate] = useState("");
  const [endQuestDate, setEndQuestDate] = useState("");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");
  const startCollectionRef = collection(db, "startdate");
  const endCollectionRef = collection(db, "enddate");

  const fetchStartDate = async () => {
    const data = await getDocs(startCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setStartDate(filteredData);
  };

  const fetchEndDate = async () => {
    const data = await getDocs(endCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setEndDate(filteredData);
  };

  const setStartDateInFirestore = async (date) => {
    if (date && startDate.length === 0) {
      await addDoc(startCollectionRef, {
        startQuestDate: date,
      });
      fetchStartDate();
    }
  };

  const setEndDateInFirestore = async (date) => {
    if (date && endDate.length === 0) {
      await addDoc(endCollectionRef, {
        endQuestDate: date,
      });
      fetchEndDate();
    }
  };

  const updateStartDate = async (id, newValue) => {
    if (newValue) {
      const docRef = doc(db, "startdate", id);
      await updateDoc(docRef, { startQuestDate: newValue });
      fetchStartDate();
    }
  };

  const updateEndDate = async (id, newValue) => {
    if (newValue) {
      const docRef = doc(db, "enddate", id);
      await updateDoc(docRef, { endQuestDate: newValue });
      fetchEndDate();
    }
  };

  useEffect(() => {
    fetchStartDate();
    fetchEndDate();
  }, []);
  const deleteDate = async (id, x) => {
    const text = doc(db, x, id);
    await deleteDoc(text);
    setStartDate([]);
    setEndDate([]);
  };
  const handleStartToggle = () => {
    startDate.length === 0
      ? setStartDateInFirestore(startQuestDate)
      : updateStartDate(startId, startQuestDate);
  };

  const handleEndToggle = () => {
    endDate.length === 0
      ? setEndDateInFirestore(endQuestDate)
      : updateEndDate(endId, endQuestDate);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <h1>ChallengeQuest</h1>
        <p className="px-5 text-center">
          Welcome to our challenge quest website, where you embark on exciting
          journeys towards your goals! Are you ready to take on a challenge and
          push your limits? Whether you're aiming to improve your fitness,
          develop new habits, or conquer personal milestones, our platform is
          here to support you every step of the way.
        </p>
        <p className="px-5 text-center">
          To begin your adventure, simply set the start date and end date of
          your challenge. Whether you're looking for a short-term sprint or a
          long-term commitment, our customizable challenges allow you to tailor
          your journey to fit your schedule and preferences.
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <label htmlFor="start-date">Start Date:</label>
          <input
            style={{ width: "150px", cursor: "pointer" }}
            type="date"
            className="form-control "
            placeholder="start date"
            onChange={(e) => setStartQuestDate(e.target.value)}
            value={startQuestDate}
          />

          <button onClick={handleStartToggle}>
            {startDate.length === 0 ? "Set" : "Edit"}
          </button>

          <label htmlFor="end-date" style={{ marginLeft: "50px" }}>
            End Date:
          </label>
          <input
            style={{ width: "150px", cursor: "pointer" }}
            type="date"
            className="form-control border-orange-600"
            placeholder="end date"
            onChange={(e) => setEndQuestDate(e.target.value)}
            value={endQuestDate}
          />

          <button onClick={handleEndToggle}>
            {endDate.length === 0 ? "Set" : "Edit"}
          </button>
        </div>
        <button
          onClick={() => {
            deleteDate(startId, "startdate");
            deleteDate(endId, "enddate");
          }}
        >
          Delete
        </button>
        {
            startDate.length!==0 && endDate.length!==0 && (
                <div>
          The start date of the challenge is{" "}
          {startDate.map((item) => {
            if (!startId) setStartId(item.id);
            return (
              <span style={{ color: "red" }} key={item.id}>
                {item.startQuestDate}
              </span>
            );
          })}{" "}
          and the end date of the challenge is{" "}
          {endDate.map((item) => {
            if (!endId) setEndId(item.id);
            return (
              <span style={{ color: "red" }} key={item.id}>
                {item.endQuestDate}
              </span>
            );
          })}
        </div>
            )
        }
        {startDate.length !== 0 && endDate.length !== 0 && (
          <Link to="/MyCalendar">
            <button>Go to Calendar</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
