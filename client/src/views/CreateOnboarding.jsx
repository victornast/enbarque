import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findUsers } from '../services/organization';
import { createOnboarding } from '../services/onboarding';

function CreateOnboarding({ user, history }) {
  const location = useLocation();
  const onboardee = location.state?.onboardee;

  // console.log(onboardee);
  const today = new Date();
  const [startDate, setStartDate] = useState(
    today.toJSON().slice(0, 10)
  );
  const [amountOfDays, setAmountOfDays] = useState(5);
  //const [onboardee, setOnboardee] = useState(null);
  const [mentor, setMentor] = useState(user._id);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function getApi() {
      const users = await findUsers();
      setUsersList(users);
    }
    getApi();
  }, []);

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const data = {
      onboardee: onboardee,
      mentor,
      startDate,
      amountOfDays
    };
    const res = await createOnboarding(data);
    history.push(`/onboarding/${res.onboardee}`);
    console.log(res);
  };

  return (
    <>
      <h1>Create New Onboarding Plan</h1>
      {onboardee && (
        <h3>
          for {onboardee.firstName} {onboardee.lastName}
        </h3>
      )}

      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-mentor">Select Mentor:</label>
        <select
          name="onboardee"
          id="input-onboardee"
          value={mentor}
          onChange={(e) => setMentor(e.target.value)}
        >
          {usersList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName}
            </option>
          ))}
        </select>

        <label htmlFor="input-starting-date">Starting Date:</label>
        <input
          id="input-starting-date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="input-amount-days">Amount of Days:</label>
        <input
          id="input-amount-days"
          type="number"
          name="amountOfDays"
          value={amountOfDays}
          onChange={(e) => setAmountOfDays(e.target.value)}
        />

        <button>Create</button>
      </form>
    </>
  );
}

export default CreateOnboarding;
