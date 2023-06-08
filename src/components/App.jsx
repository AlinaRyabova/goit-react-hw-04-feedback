import React, { useState } from 'react';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';

const options = ['good', 'bad', 'neutral'];

export default function App() {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);

  const countTotalFeedback = () => {
    return goodFeedback + neutralFeedback + badFeedback;
  };

  const countPositiveFeedbackPercentage = () => {
    let totalFeedback = countTotalFeedback();
    return totalFeedback ? Math.round((goodFeedback / totalFeedback) * 100) : 0;
  };

  const handleFeedback = option => {
    switch (option) {
      case 'good':
        setGoodFeedback(prevGoodFeedback => prevGoodFeedback + 1);
        break;
      case 'neutral':
        setNeutralFeedback(prevNeutralFeedback => prevNeutralFeedback + 1);
        break;
      case 'bad':
        setBadFeedback(prevBadFeedback => prevBadFeedback + 1);
        break;
      default:
        return;
    }
  };

  const totalFeedbackCount = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>
      {totalFeedbackCount ? (
        <Section title={'Statistics'}>
          <Statistics
            good={goodFeedback}
            neutral={neutralFeedback}
            bad={badFeedback}
            total={totalFeedbackCount}
            positiveFeedbackPercentage={positiveFeedback}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
}
