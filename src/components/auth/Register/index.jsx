import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import GuestLanding from "../../../pages/guest-landing";
import { register } from "../../../redux/user/user.action";
import { selectCurrentUser } from "../../../redux/user/user.selector";
import SocialLogins from "../../common/SocialLogins";
import LoadingSubmitBtn from "../../utility/LoadingSubmitBtn";

const Register = ({ register, user }) => {
  const { registerLoading } = user;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, username, password, passwordCheck);
    const isEmailValid = validateEmail();
    const isUsernameValid = username ? true : false;
    const isPasswordValid = password ? true : false;
    const isPasswordCheckValid = passwordCheck ? true : false;
    const verifyPasswordValid = password === passwordCheck;

    if (
      isEmailValid &&
      isUsernameValid &&
      isPasswordValid &&
      isPasswordCheckValid &&
      verifyPasswordValid
    ) {
      register({
        name: username,
        email: email,
        password: password,
      });
    } else {
      alert("invalid credentials");
    }
  };

  const validateEmail = () => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  return (
    <GuestLanding>
      <div>
        <div className=" my-5">
          <p className="t-text t_heading-lg">
            Free up your
            <span className="t-text-lead"> mental</span> space
          </p>
          <p className="t-desc t_desc-base">
            Organize it all with Todoist. A task manager you can trust for life
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="t__form-fields-wrap">
            <div className="t__form-group">
              <label htmlFor="username" className="t__label">
                username
              </label>
              <input
                id="username"
                className="t__input t-text"
                placeholder=""
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <span className="t__grow"></span>
            </div>
            <div className="t__form-group">
              <label htmlFor="email" className="t__label">
                email address
              </label>
              <input
                id="email"
                className="t__input t-text"
                placeholder=""
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="t__grow"></span>
            </div>
            <div className="t__form-group">
              <label htmlFor="password" className="t__label">
                password
              </label>
              <input
                id="password"
                className="t__input t-text"
                placeholder=""
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span className="t__grow"></span>
            </div>
            <div className="t__form-group">
              <label htmlFor="passwordCheck" className="t__label">
                verify password
              </label>
              <input
                id="passwordCheck"
                className="t__input t-text"
                placeholder=""
                type="password"
                name="password2"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
              />
              <span className="t__grow"></span>
            </div>
          </div>

          <p className="t_desc-base t-desc my-4 text-center">
            By signing up, you agree to our{" "}
            <span className="t-text-lead">Terms of Service</span> and{" "}
            <span className="t-text-lead">Privacy Policy</span>
          </p>
          <LoadingSubmitBtn
            handleLoadingBtnClick={onSubmitHandler}
            text="Register"
            loading={registerLoading}
            fullWidth={true}
          />
          {/* <button className="t__btn t__btn-lg mt-5" type="submit">
            REGISTER
          </button> */}
        </form>
        {/* <SocialLogins /> */}
      </div>
    </GuestLanding>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
