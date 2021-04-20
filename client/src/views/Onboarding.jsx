import React, { useState, useEffect } from 'react';

import { loadUser } from './../services/user';

import OnboardeeDashboard from './../components/onboardee/OnboardeeDashboard';

function Onboarding(props) {
  const [onboardee, setOnboardee] = useState(null);

  const userId = props.match.params.id;

  useEffect(() => {
    async function getUser(id) {
      const onboardee = await loadUser(id);
      setOnboardee(onboardee);
    }
    getUser(userId);
  }, [userId]);

  return <>{onboardee && <OnboardeeDashboard user={onboardee} />}</>;
}

export default Onboarding;
