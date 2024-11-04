import { FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogout, setCredentials, updateModal } from "../redux/features/authSlice";
import LoginIcon from "../assets/icons/LoginIcon";
import LoginRow from "./loginComponents/LoginRow";
import LoginForm from "./loginComponents/LoginForm";
import Logoutrow from "./loginComponents/Logoutrow";
import { useLoginMutation } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.auth.modalOpen);
  const [login] = useLoginMutation()

  const isLoggedIn = useAuth().user

  const submitForm = (e: FormEvent<HTMLFormElement>, data: { email: string; password: string; }) => {
    e.preventDefault();
    login(data).unwrap().then((user) => {
      dispatch(setCredentials({ username: data.email, token: user.access_token }))
    })
  };

  const onPressClose = () => dispatch(updateModal(false))
  const handleLogout = () => {
    dispatch(doLogout());
  };

  return open ? (
    <div className="absolute right-5 w-full flex items-center justify-end top-16">
      <div
        className="relative border shadow rounded-lg bg-white max-w-md w-full  dark:bg-variant4 dark:text-white"
        data-test="login-container"
      >
        {isLoggedIn ? <Logoutrow onPressLogout={handleLogout} /> :
          <>
            <LoginRow onPressClose={onPressClose} />
            <div className="pt-8 px-8">
              <LoginIcon />
              <LoginForm submitForm={submitForm} />
            </div>
          </>
        }

      </div>
    </div>
  ) : null

};

export default LoginModal;
