import EmptyState from '../common/EmptyState';

const TemplateDetails = ({ template, criteria }) => {
  if (!template) return <EmptyState message="No template selected." />;
  return (
    <div className="card">
      <h3>Template for: {template.projectTitle}</h3>
      <p>Project: {template.project?.title || template.project?.name || '—'}</p>
      <h4>Criteria</h4>
      {criteria?.length ? (
        <table className="data-table">
          <thead><tr><th>Name</th><th>Max Marks</th></tr></thead>
          <tbody>
            {criteria.map((c) => (
              <tr key={c.id}><td>{c.criteriaName}</td><td>{c.maxMarks}</td></tr>
            ))}
          </tbody>
        </table>
      ) : <EmptyState message="No criteria added yet." />}
    </div>
  );
};

export default TemplateDetails;
