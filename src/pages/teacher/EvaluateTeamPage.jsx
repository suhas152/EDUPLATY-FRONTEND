import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getTeamById } from '../../api/teamApi';
import { getTemplateByProject, getCriteriaByTemplate } from '../../api/templateApi';
import { createEvaluation } from '../../api/evaluationApi';
import EvaluationForm from '../../components/evaluations/EvaluationForm';
import Loader from '../../components/common/Loader';

const EvaluateTeamPage = () => {
  const { teamId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getTeamById(teamId)
      .then(async (res) => {
        const t = res.data;
        setTeam(t);
        if (t.projectId) {
          try {
            // TeamDTO is flat: projectId, not project.id
            const tmpl = await getTemplateByProject(t.projectId);
            const tmplData = tmpl.data;
            if (tmplData?.id) {
              const cr = await getCriteriaByTemplate(tmplData.id);
              setCriteria(cr.data);
            }
          } catch {
            setCriteria([]);
          }
        }
      })
      .catch(() => setMsg('Failed to load team'))
      .finally(() => setLoading(false));
  }, [teamId]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createEvaluation(data);
      setMsg('Evaluation submitted!');
      setTimeout(() => navigate('/teacher/evaluations'), 1500);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Evaluate Team</h1>
      {msg && <p className="success-msg">{msg}</p>}
      {team && criteria.length > 0 ? (
        <EvaluationForm
          team={team}
          criteria={criteria}
          teacherId={user.id}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      ) : (
        <p className="error-msg">No evaluation template found for this project.</p>
      )}
    </div>
  );
};

export default EvaluateTeamPage;
