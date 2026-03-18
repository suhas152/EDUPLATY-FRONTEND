import UserTable from './UserTable';

const TeacherList = ({ teachers }) => (
  <UserTable users={teachers} showDelete={false} />
);

export default TeacherList;
