import React, { useEffect, useState } from 'react';

import { findUsers } from '../services/user';

function CreateOnboarding({ user }) {
  const today = new Date();
  const [startDate, setStartDate] = useState(
    today.toJSON().slice(0, 10)
  );
  const [amountOfDays, setAmountOfDays] = useState(5);
  const [onboardee, setOnboardee] = useState('');
  const [mentor, setMentor] = useState(user._id);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    async function getApi() {
      const users = await findUsers();
      await setUsersList(users);
      console.log(usersList);
    }
    getApi();
  }, []);

  const handleFormSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Create New Onboarding Plan</h1>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-onboardee">Select Onboardee:</label>
        <select
          name="onboardee"
          id="input-onboardee"
          value={onboardee}
          onChange={(e) => setOnboardee(e.target.value)}
        >
          {usersList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName}
            </option>
          ))}
        </select>

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
