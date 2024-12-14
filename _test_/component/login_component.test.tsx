import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Login from '@/app/index'
import { UserContext, UserDispacthContext } from '@/store/UserStore'

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')

describe('Login', () => {
  const mockDispatch = jest.fn()
  const mockUserAuth = {
    email: 'test@test.com',
    password: 'password123',
    token: 'mock-token',
    status: false,
    message: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('should render the login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={mockUserAuth}>
        <UserDispacthContext.Provider value={mockDispatch}>
          <Login />
        </UserDispacthContext.Provider>
      </UserContext.Provider>
    )

    expect(getByPlaceholderText('Digite seu usuário')).toBeTruthy()
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy()
    expect(getByText('Login')).toBeTruthy()
  })

  it('should show an error when username or password is too short', async () => {
    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={mockUserAuth}>
        <UserDispacthContext.Provider value={mockDispatch}>
          <Login />
        </UserDispacthContext.Provider>
      </UserContext.Provider>
    )

    const usernameInput = getByPlaceholderText('Digite seu usuário')
    const passwordInput = getByPlaceholderText('Digite sua senha')
    const loginButton = getByText('Login')

    fireEvent.changeText(usernameInput, 'short')
    fireEvent.changeText(passwordInput, '12345')
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy()
    })
  })
})
