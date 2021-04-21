import React from "react";
import { Link } from "react-router-dom";

const MenteeListItem = ({ mentee }) => {
  return (
    <div>
      <Link className="eb-link" to={`/onboarding/${mentee._id}`}>
        {mentee.firstName} {mentee.lastName}
      </Link>
    </div>
  );
};

export default MenteeListItem;
