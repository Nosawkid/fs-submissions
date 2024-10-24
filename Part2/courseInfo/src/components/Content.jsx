import Part from "./Part";

const Content = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>
        <b>total of {sum} exercises</b>
      </p>
    </div>
  );
};

export default Content;
