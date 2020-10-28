import React, { useState } from "react";
import GuestLanding from "../../../pages/guest-landing";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selector";
import { login } from "../../../redux/user/user.action";
import LoadingSubmitBtn from "../../utility/LoadingSubmitBtn";

const Login = ({ login, user }) => {
  const { loginLoading } = user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!validateEmail() || !password) {
      alert("Invalid credentials!");
    } else {
      login({ email, password });
    }
  };

  const validateEmail = () => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  return (
    <GuestLanding>
      <div className="login">
        <div className="login__head my-5">
          <p className="t_heading-lg t-text">Welcome</p>
          <p className="t_desc-base t-desc">Please Login to your account</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="t__form-fields-wrap mb-4">
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
          </div>
          <LoadingSubmitBtn
            handleLoadingBtnClick={onSubmitHandler}
            text="Login"
            loading={loginLoading}
            fullWidth={true}
          />
          {/* <button className="t__btn t__btn-lg mt-5" type="submit">
            LOGIN
          </button> */}
          {/* <Link to="/forgotPassword">
            <p className="t_desc-base t-desc my-4">
              Forgot your <span>password?</span>
            </p>
          </Link> */}
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
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
