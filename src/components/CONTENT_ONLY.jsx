const CONTENT_ONLY = ({ question }) => {
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-only-container p-4 border rounded-lg shadow-lg bg-sky-400">
      <h2 className="text-lg font-bold mb-4">Content Only</h2>
      <p className="text-gray-700">{question.title}</p>
    </div>
  );
};

export default CONTENT_ONLY;
