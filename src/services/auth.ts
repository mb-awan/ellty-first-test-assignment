import { toast } from 'react-toastify';

import axiosInstance from '@/libs/axiosIntercepter';
import { SignInFormValues, SignUpFormValues } from '@/utils/forms/interfaces';
const tokenName = 'unify-posts-token';
const tokenEmail = 'unify-posts-email';

export const signUp = async (user: SignUpFormValues) => {
  try {
    const response = await axiosInstance.post('/api/auth/sign-up', user);
    setToken(response.data.token);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.res?.message || error.message || 'Something went wrong');
  }
};

export const signIn = async (credentials: SignInFormValues) => {
  try {
    const response = await axiosInstance.post('/api/auth/sign-in', credentials);
    setToken(response.data.token);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.res?.message || error.message || 'Something went wrong');
  }
};

export const requestForgotPasswordOTP = async (identifier: string) => {
  try {
    const response = await axiosInstance.put('/api/auth/request-forgot-password-otp', { identifier });
    return response.data;
  } catch (error) {}
};

export const verifyforgotPasswordOTP = async (code: string) => {
  try {
    const response = await axiosInstance.get('/api/auth/verify-forgot-password-otp', {
      params: { identifier: getEmail(), otp: code },
    });
    setToken(response.data.token);
    return response.data;
  } catch (error) {}
};

export const verifyEmail = async (code: string) => {
  try {
    const response = await axiosInstance.post('/api/users/verify-email', { otp: code });
    setToken(response.data.token);
    return response.data;
  } catch (error) {}
};

export const requestResendVerifyEmailCode = async () => {
  try {
    const response = await axiosInstance.post('/api/users/request-email-verification-otp');
    return response.data;
  } catch (error) {}
};

export const verifyTFA = async (otp: string, identifier: string) => {
  try {
    const response = await axiosInstance.post(`/api/auth/verify-tfa-otp?otp=${otp}&identifier=${identifier}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

export const resendTFA = async (identifier: string) => {
  try {
    const response = await axiosInstance.get(`/api/auth/resend-tfa-otp?identifier=${identifier}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to resend OTP');
  }
};
export const isAuthenticated = () => {
  return localStorage.getItem(tokenName) !== null;
};

export const isEmailVerified = () => {
  const token = getToken();
  if (token) {
    const decodedPayload = parseJwt(token);
    if (!decodedPayload) return false;

    return !!decodedPayload?.emailVerified;
  }
  return false;
};

export const isDescribedRole = () => {
  const token = getToken();
  if (token) {
    const decodedPayload = parseJwt(token);
    if (!decodedPayload) return false;

    return !!decodedPayload?.describedRole?.length;
  }
  return false;
};

export const signout = () => {
  localStorage.removeItem(tokenName);
  window.location.href = '/';
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
};

export const setEmail = (Email: string) => {
  localStorage.setItem(tokenEmail, Email);
};

export const getToken = () => {
  return localStorage.getItem(tokenName);
};

export const getEmail = () => {
  return localStorage.getItem(tokenEmail);
};

export const getUserId: () => string = () => {
  const token = getToken();
  if (token) {
    const decodedPayload = parseJwt(token);
    return decodedPayload.id;
  }
  return '';
};

export const getUserName: () => string = () => {
  const token = getToken();
  if (token) {
    const decodedPayload = parseJwt(token);
    return (decodedPayload?.firstName || '') + ' ' + (decodedPayload?.lastName || '');
  }
  return '';
};

export const getUserEmail: () => string = () => {
  const token = getToken();
  if (token) {
    const decodedPayload = parseJwt(token);
    return decodedPayload?.email || '';
  }
  return '';
};

export function parseJwt(token: string) {
  if (!token || typeof token !== 'string' || token === 'undefined') return null;
  var base64Url = token.split('.')[1];
  if (!base64Url) return null;
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
