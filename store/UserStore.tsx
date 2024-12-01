import { createContext, ReactElement, useReducer } from 'react'

export enum UserActionType { LOGAR, DESLOGAR }

interface User {
    email: string,
    password: string,
    token: string,
    status: boolean,
    message: string
}
interface UserReducerAction {
    type: UserActionType,
    user: User
}

export const UserContext = createContext<User | null>(null)
export const UserDispacthContext = createContext<any>(null)
const initialUser: User = {
    email: '',
    password: '',
    token: '',
    status: false,
    message: ''
}

export default function UserProvider({ children }: { children: ReactElement }) {
    const [user, dispatch] = useReducer(UserReducer, initialUser)

    return (
        <UserContext.Provider value={user}>
            <UserDispacthContext.Provider value={dispatch}>
                {children}
            </UserDispacthContext.Provider>
        </UserContext.Provider>
    )

    function UserReducer(user: User, { type, user: userAuth }: UserReducerAction) {
        switch (type) {
            case UserActionType.LOGAR: {
                return {
                    ...userAuth,
                    status: true,
                    message: 'Autenticado com sucesso.'
                }
            }
            case UserActionType.DESLOGAR: {
                return {
                    ...user,
                    token: null,
                    status: false,
                    message: null
                }
            }
            default: {
                throw Error('Operação desconhecida.')
            }
        }
    }
}