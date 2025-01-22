const READ_ALONG = ({ question }) => {
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="read-along-container p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Read Along</h2>
      <p className="text-gray-700">{question.title}</p>
    </div>
  );
};

export default READ_ALONG;
