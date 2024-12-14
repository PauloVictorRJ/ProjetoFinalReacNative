import { render, fireEvent } from '@testing-library/react-native'
import Login from '@/app/index'

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')

describe('handleUserNameChange', () => {
    it('should update the user state with the correct value', () => {
        const { getByPlaceholderText } = render(<Login />)

        const inputUserName = getByPlaceholderText('Digite seu usuário')

        fireEvent.changeText(inputUserName, 'newuser@example.com')

        expect(inputUserName.props.value).toBe('newuser@example.com')
    })

    it('should hide the username error when the username changes', () => {
        const { getByPlaceholderText } = render(<Login />)

        const inputUserName = getByPlaceholderText('Digite seu usuário')

        fireEvent.changeText(inputUserName, 'short')

        expect(getByPlaceholderText('Digite seu usuário').props.value).toBe('short')

        fireEvent.changeText(inputUserName, 'validuser@example.com')

        expect(getByPlaceholderText('Digite seu usuário').props.value).toBe('validuser@example.com')
    })
})
