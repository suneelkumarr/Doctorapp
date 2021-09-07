import jwt_decode from 'jwt-decode'

export const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const user = jwt_decode(token);
        if (user.role === 'doctor' || 'patient' || 'super_admin' || 'admin' || 'manager') {
            return ({ role: user.role })
        }
        return false
    }
    return false;
};