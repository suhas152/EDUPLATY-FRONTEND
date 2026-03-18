import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEvaluationsByTeacher } from '../../api/evaluationApi';
import EvaluationList from '../../components/evaluations/EvaluationList';
import EvaluationDetails from '../../components/evaluations/EvaluationDetails';
import Loader from '../../components/common/Loader';

const TeacherEvaluationsPage = () => {
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvaluationsByTeacher(user.id)
      .then((res) => setEvaluations(res.data))
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">My Evaluations</h1>
      <EvaluationList evaluations={evaluations} onSelect={setSelected} />
      {selected && (
        <EvaluationDetails
          evaluation={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default TeacherEvaluationsPage;
