import React, { useState, useEffect } from "react";
import { getMenteeList } from "./../../services/onboarding";
import MenteeListItem from "./MenteeListItem";

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
    <div>
      {!!menteeList &&
        menteeList.map((mentee) => (
          <MenteeListItem key={mentee._id} mentee={mentee} />
        ))}
    </div>
  );
};

export default MentorDashboard;
