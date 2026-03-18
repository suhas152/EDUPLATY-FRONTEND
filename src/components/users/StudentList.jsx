import UserTable from './UserTable';

const StudentList = ({ students, onDelete, showDelete }) => (
  <UserTable users={students} onDelete={onDelete} showDelete={showDelete} />
);

export default StudentList;
