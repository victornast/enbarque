import React, { useState, useEffect } from 'react';

import { sendFeedback, getFeedback } from './../../services/onboarding';

import './OnboardingFeedback.scss';

function OnboardingFeedback({ seniorRole, user, process }) {
  const [feedback, setFeedback] = useState('');
  const [feedbackPosts, setFeedbackPosts] = useState([]);

  useEffect(() => {
    const fetchFeedback = async (id) => {
      const feedbackList = await getFeedback(id);
      setFeedbackPosts(feedbackList);
    };
    fetchFeedback(process._id);
  }, [process._id]);

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmission = async (event) => {
    event.preventDefault();
    const data = {
      content: feedback,
      user: seniorRole || user,
      process: process
    };
    const res = await sendFeedback(data);
    setFeedback('');
    setFeedbackPosts([...feedbackPosts, res]);
  };

  return (
    <section className="onboardee-dashboard__section onboardee-dashboard-section">
      <h2 className="onboardee-dashboard-section__headline">
        Feedback Notes
      </h2>
      {!seniorRole && (
        <p className="onboardee-dashboard-section__intro">
          Help us improve the onboarding process by adding here feedback
          notes and optimization suggestions:
        </p>
      )}
      <div className="onboardee-dashboard-section__body">
        {!!feedbackPosts.length && (
          <ul className="eb-onboardee-dashboard__feedback eb-feedback-comment">
            {feedbackPosts.map((post) => (
              <li
                className="eb-feedback-comment-item eb-feedback-comment__item"
                key={post._id}
              >
                <img
                  src={post.userId.avatar}
                  alt={
                    post.userId.firstName + ' ' + post.userId.lastName
                  }
                  className="eb-feedback-comment-item__avatar"
                />
                <p className="eb-feedback-comment-item__name">
                  {post.userId.firstName + ' ' + post.userId.lastName}
                </p>
                <p className="eb-feedback-comment-item__message">
                  {post.content}
                </p>
              </li>
            ))}
          </ul>
        )}
        <form className="eb-form" onSubmit={handleFeedbackSubmission}>
          <label className="eb-form__label" htmlFor="input-feedback">
            Give your feedback:
          </label>
          <textarea
            id="input-feedback"
            placeholder="Write your feedback here..."
            name="content"
            required
            value={feedback}
            onChange={handleInputChange}
            className="eb-form__textarea"
            rows="3"
          />
          <button className="eb-form__action eb-button eb-button--primary">
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default OnboardingFeedback;
