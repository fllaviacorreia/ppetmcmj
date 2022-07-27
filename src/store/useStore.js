import create from 'zustand'

const useStore = create(set => ({
  isSignedIn: false,
  userID: null,
  type: null,
  login: (isLoggedIn, id, type) => set(() => ({ isSignedIn: isLoggedIn, userID: id, type: type})),
}))

export default useStore;