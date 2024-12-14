import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Login from '../../app/index'
import { UserContext, UserDispacthContext } from '@/store/UserStore'

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')

const mockDispatch = jest.fn()

const userAuth = { email: '', password: '' }
const userAuthDispatch = mockDispatch

describe('Login Screen', () => {
  it('should show error messages when inputs are invalid', async () => {
    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={userAuth}>
        <UserDispacthContext.Provider value={userAuthDispatch}>
          <Login />
        </UserDispacthContext.Provider>
      </UserContext.Provider>
    )

    const usernameInput = getByPlaceholderText('Digite seu usuário')
    const passwordInput = getByPlaceholderText('Digite sua senha')
    const loginButton = getByText('Login')

    fireEvent.changeText(usernameInput, 'short')
    fireEvent.changeText(passwordInput, '123')

    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(getByText('O nome de usuário deve ter no mínimo 8 caracteres')).toBeTruthy()
      expect(getByText('A senha deve ter no mínimo 6 caracteres')).toBeTruthy()
    })
  })
})
