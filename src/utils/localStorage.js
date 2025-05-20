// Local Storage Keys
const STORAGE_KEYS = {
    USERS: 'student_management_users',
    STUDENTS: 'student_management_students',
};

// User related storage functions
export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUsers = () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
};

export const findUser = (email, password) => {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
};

// Student related storage functions
export const saveStudent = (student) => {
    const students = getStudents();
    students.push({ ...student, id: Date.now() });
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
};

export const getStudents = () => {
    const students = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return students ? JSON.parse(students) : [];
};

export const updateStudent = (updatedStudent) => {
    const students = getStudents();
    const index = students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
        students[index] = updatedStudent;
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
        return true;
    }
    return false;
};

export const deleteStudent = (studentId) => {
    const students = getStudents();
    const filteredStudents = students.filter(student => student.id !== studentId);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(filteredStudents));
};
