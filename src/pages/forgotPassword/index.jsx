import React, { useState } from "react";
import LoadingSubmitBtn from "../../components/utility/LoadingSubmitBtn";
import { ForgotPasswordAPI } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter valid email");
    } else {
      //api
      ForgotPasswordAPI({ email })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="type email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingSubmitBtn
          handleLoadingBtnClick={handleSubmit}
          text="Send"
          loading={false}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
