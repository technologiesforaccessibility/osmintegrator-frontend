import React, {useState, useEffect} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';

import {noTokenHeaders} from '../../config/apiConfig';
import {unsafeLoginApiError} from '../../utilities/utilities';
import client from '../../api/apiInstance';

import '../../stylesheets/login.scss';
import colors from '../../stylesheets/colors.module.scss';
import FooterContact from "../FooterContact";

const Login = () => {
    const {t} = useTranslation();

    const [message, setMessage] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const formik = useFormik({
        initialValues: {
            loginEmail: '',
            loginPassword: '',
        },
        onSubmit: ({loginEmail, loginPassword}) => {
            runLogin(loginEmail, loginPassword);
        },
    });

    const showMessage = msg => {
        setMessage(msg);
    };

    const hideMessage = () => {
        if (message) {
            setMessage(null);
        }
    };

    const runLogin = async (email, password) => {
        try {
            const response = await client.api.accountLoginCreate(
                {
                    email,
                    password,
                },
                {headers: noTokenHeaders()},
            );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tokenRefresh', response.data.refreshToken);
            setShouldRedirect(true);
        } catch (error) {
            showMessage(unsafeLoginApiError(error));
        }
    };

    return shouldRedirect ? (
        <Redirect to="/" />
    ) : (
        <React.Fragment>
            <h1 className="auth-title">{t('login.title')}</h1>

            <form name="login-form" onSubmit={formik.handleSubmit}>
                <div className="inputbox-spacer">
                    <input
                        type="text"
                        id="loginEmail"
                        placeholder="E-mail"
                        onChange={formik.handleChange}
                        value={formik.values.loginEmail}
                        onClick={hideMessage}
                    />
                </div>
                <div className="inputbox-spacer">
                    <input
                        type="password"
                        id="loginPassword"
                        placeholder={t('login.password')}
                        onChange={formik.handleChange}
                        value={formik.values.loginPassword}
                        onClick={hideMessage}
                    />
                </div>
                <div className="login-button-area">
                    <button type="submit" id="button-login">
                        {t('login.loginText')}
                    </button>
                </div>
            </form>

            <div className="link">
                <NavLink to="/auth/recover">{t('login.forgotPassword')}</NavLink>
            </div>
            <div className="auth-info-placeholder centered">
                {message && (
                    <span style={{color: colors['colorMessageFail']}}>
                        {message}
                    </span>
                )}
            </div>
            {/*<FooterContact/>*/}
        </React.Fragment>
    );
};

export default Login;
