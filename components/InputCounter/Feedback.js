// components/Feedback.js
const Feedback = ({ feedback, onAccept, onDecline }) => {
    return (
      <div>
        <h2>Feedback</h2>
        <ul>
          {feedback.map((item, index) => (
            <li key={index}>
              Line {item.line}: {item.feedback}
              <button onClick={() => onAccept(item.line)}>Accept</button>
              <button onClick={() => onDecline(item.line)}>Decline</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Feedback;
  