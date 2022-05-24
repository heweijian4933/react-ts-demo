declare interface User {
  username: string
  password: string
}

declare interface AuthContextType {
  user: User
  signin: (user: User, callback?: VoidFunction) => void
  signout: (callback?: VoidFunction) => void
}
