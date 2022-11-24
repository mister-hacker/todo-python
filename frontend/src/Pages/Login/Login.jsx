import React, { useState, useEffect } from "react";
import LoginImg from "../../assets/images/Login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification, {
  successNotify,
  errorNotify,
} from "../../Services/Notification.js";

import AuthUser from "../../Services/AuthUser";

function Login() {


  const { setToken } = AuthUser();

  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLoginInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setloginCredentials({ ...loginCredentials, [name]: value });
  };

  const login = async (url) => {
    await axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + url,
      data: {
        email: loginCredentials.email,
        password: loginCredentials.password,
      },
    })
      .then(async (response) => {
        if (response.data.code == 200) {
          let user = response.data.user;
          let token = response.data.token;
          setToken(user, token);
          successNotify('Login Successfully')
        } else {
          errorNotify(response.data.message);
          
        }
      })
      .catch((error) => {
        errorNotify(error);
      });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if(loginCredentials.email =='' && loginCredentials.password ==''){
        errorNotify('Please Fill All Fields Carefully')
    }else{

        login("login");
    }
  
  };

  const [passwordEye, setPasswordEye] = useState(true);
  const handlePasswordEye = (e) => {
    setPasswordEye(!passwordEye);
  };

  const navigate = useNavigate();
  const { getToken } = AuthUser();

  const token = getToken();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
            <input
            autoComplete="false"
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              name="email"
              value={loginCredentials.email}
              onChange={handleLoginInput}
            />
            <div className="relative">
              <input
              autoComplete="false"
                className="p-2 rounded-xl border w-full"
                type={passwordEye ? "password" : "text"}
                name="password"
                value={loginCredentials.password}
                onChange={handleLoginInput}
                placeholder="Password"
              />

              {passwordEye ? (
                <svg
                  onClick={handlePasswordEye}
                  width="16"
                  height="16"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  onClick={handlePasswordEye}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  height="16"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                </svg>
              )}
            </div>

            <p className="text-[#002D74] text-xs cursor-pointer " onClick={() =>  navigate("/register")}>Don't have  account</p>

            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
            
          </form>
        </div>
        <div className="md:block hidden w-1/2 min-h-full">
          <img className="rounded-2xl" src={LoginImg} />
        </div>
      </div>


      <Notification></Notification>
    </section>
  );
}

export default Login;
