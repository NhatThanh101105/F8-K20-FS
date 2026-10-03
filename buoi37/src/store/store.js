import {create} from 'zustand'

 export const useTheme = create((set) => ({
 theme: 'light',
 user: {
    email: "user@example.com",
    Name: "John Doe",
    role: "admin",
 },
 toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));

},
updateUser: (newUser) => {
    set((state) => ({
      user: {
        ...state.user,
        ...newUser
      }
    }));
  } 

}));