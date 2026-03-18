export const ROLES = {
  MAIN_TEACHER: 'MAIN_TEACHER',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

export const getRoleHome = (role) => {
  switch (role) {
    case ROLES.MAIN_TEACHER: return '/admin/dashboard';
    case ROLES.TEACHER: return '/teacher/dashboard';
    case ROLES.STUDENT: return '/student/dashboard';
    default: return '/login';
  }
};
