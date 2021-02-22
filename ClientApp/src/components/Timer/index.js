import React, { useEffect, useState } from 'react';

//Credit: https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default function Timer(props) {
  const [minutes, setMinutes] = useState(props.quizStartTime);
  const [seconds, setSeconds] = useState(59);

  //Handles the quiz timer
  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        if (minutes == 0) {
          props.handleQuizTimeUp();
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {minutes === 0 && seconds === 0 ? null : (
        <div>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      )}
    </>
  );
}
