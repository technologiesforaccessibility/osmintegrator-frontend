import {object, string, ref} from 'yup';

export const RegisterSchema = object().shape({
  username: string().min(3, 'Nazwa użytkownika musi mieć minimalnie 3 znaki').required('Wpisz nazwę użytkownika'),
  email: string().email('Email nieprawidłowy').required('Wpisz adres email'),
  password1: string().min(8, 'Hasło musi mieć minimalnie 8 znaków').required('Wpisz hasło'),
  password2: string()
    .oneOf([ref('password1')], 'Wprowadzone hasła nie są takie same')
    .required('Powtórz hasło'),
});

export const LoginSchema = object().shape({
  email: string().email('Email nieprawidłowy').required('Wpisz adres email'),
  password: string().min(8, 'Hasło musi mieć minimalnie 8 znaków').required('Wpisz hasło'),
});
