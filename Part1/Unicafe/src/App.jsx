import { useState } from "react";

const Button = (props) => {
  const { text, onClick } = props;
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, total } = props;
  const score = good * 1 + neutral * 0 + bad * -1;
  const average = score / total;
  const positive = (good / total) * 100;
  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <StatisticLine review="Good" reviewCount={good} />
          <StatisticLine review="Neutral" reviewCount={neutral} />
          <StatisticLine review="Bad" reviewCount={bad} />
          <StatisticLine review="All" reviewCount={total} />
          <StatisticLine
            review="Average"
            reviewCount={average ? average.toFixed(1) : 0}
          />
          <StatisticLine
            review="Positive"
            reviewCount={positive ? positive.toFixed(1) + "%" : 0}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  const { review, reviewCount } = props;
  return (
    <tr>
      <td>{review}</td>
      <td>{reviewCount}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{ display: "flex" }}>
        <Button onClick={handleGood} text={"good"} />
        <Button onClick={handleNeutral} text={"neutral"} />
        <Button onClick={handleBad} text="bad" />
      </div>
      <h2>Satistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
