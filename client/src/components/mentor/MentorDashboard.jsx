import React, { useState, useEffect } from "react";
import { getMenteeList } from "./../../services/onboarding";
import MenteeListItem from "./MenteeListItem";
import "./MentorDashboard.scss";
import Greeting from "./../dashboard/Greeting";

const MentorDashboard = ({ user }) => {
  const [menteeList, setMenteeList] = useState([]);

  useEffect(() => {
    const fetchMenteeList = async (userId) => {
      const mentoringProcesses = await getMenteeList(userId);
      const mentees = mentoringProcesses.map((process) => process.onboardee);
      console.log(mentees);
      setMenteeList(mentees);
    };
    fetchMenteeList(user._id);
  }, [user._id]);

  return (
    <>
      <Greeting user={user} />
      <div className="mentee-list">
        {!!menteeList &&
          menteeList.map((mentee) => (
            <MenteeListItem key={mentee._id} mentee={mentee} />
          ))}
      </div>
    </>
  );
};

export default MentorDashboard;
