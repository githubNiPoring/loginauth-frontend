import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }

      console.log(cookies);
      try {
        const { data } = await axios.post(
          "http://localhost:4000/v1",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
            })
          : (removeCookie("token"), navigate("/login"));
      } catch (err) {
        console.error("Error in verification:", err);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/v1/logout",
        {},
        { withCredentials: true }
      );
      removeCookie("token", {
        path: "/",
        sameSite: "Lax",
        secure: false,
      });
      setUsername(""); // Clear frontend state
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="d-flex flex-column justify-content-center">
            <div className="card">
              <div className="container my-2 d-flex flex-column align-items-center justify-content-center">
                <h4 className="fs-1 fw-bold text-center text-uppercase">
                  {" "}
                  Welcome <span>{username}</span>
                </h4>
                <button className="btn btn-danger w-50" onClick={Logout}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
