export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };
  
