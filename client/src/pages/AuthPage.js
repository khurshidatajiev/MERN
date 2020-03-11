import React, {useContext, useEffect, useState} from "react";
import useHttp from "../hooks/http.hook";
import useToast from "../hooks/toast.hook";
import AuthContext from "../context/AuthContext";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: null,
    password: null
  });

  useEffect(() => {
    toast(error);
    clearError();
  }, [error, toast, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      const { message } = data;
      toast(message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      const { token, userId, message } = data;
      toast(message);
      auth.login(token, userId);
    } catch (e) {}
  };

  return (
    <div className={'row'}>
      <div className={'col s6 offset-s3'}>
        <div className={'card'}>
          <div className={'card-content'}>
            <span className={'card-title'}>Авторизация</span>
            <div>
              <div className={'input-field'}>
                <input
                  id={'email'}
                  name={'email'}
                  type={'text'}
                  value={form.email}
                  placeholder={'Введите email'}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className={'input-field'}>
                <input
                  id={'password'}
                  name={'password'}
                  type={'password'}
                  value={form.password}
                  placeholder={'Введите пароль'}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Пароль</label>
              </div>
            </div>
          </div>
          <div className={'card-action'}>
            <button
              className={'btn teal lighten-1'}
              type={'button'}
              style={{marginRight: 8}}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className={'btn cyan lighten-2'}
              type={'button'}
              disabled={loading}
              onClick={registerHandler}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AuthPage;
