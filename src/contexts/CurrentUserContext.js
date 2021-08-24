import { createContext } from 'react';

export const CurrentUserContext = createContext();
export const initialUser = {
  name: '',
  about: '',
  avatar: ''
}
