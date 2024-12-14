import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InputCustomUserName from '@/components/InputCustomUserName'

describe('InputCustomUserName', () => {
    it('renders correctly with the provided placeholder', () => {
        const { getByPlaceholderText } = render(
            <InputCustomUserName
                placeholder="Nome de usuário"
                value=""
                setValue={() => { }}
                minLength={6}
                showError={false}
            />
        )
        expect(getByPlaceholderText('Nome de usuário')).toBeTruthy()
    })

    it('displays error message when showError is true and value is shorter than minLength', () => {
        const { getByText } = render(
            <InputCustomUserName
                placeholder="Nome de usuário"
                value="abc"
                setValue={() => { }}
                minLength={6}
                showError={true}
            />
        )
        expect(getByText('O nome de usuário deve ter no mínimo 6 caracteres')).toBeTruthy()
    })

    it('does not display error message when showError is false', () => {
        const { queryByText } = render(
            <InputCustomUserName
                placeholder="Nome de usuário"
                value="abc"
                setValue={() => { }}
                minLength={6}
                showError={false}
            />
        )
        expect(queryByText('O nome de usuário deve ter no mínimo 6 caracteres')).toBeNull()
    })

    it('disables the input when editable is false', () => {
        const { getByPlaceholderText } = render(
            <InputCustomUserName
                placeholder="Nome de usuário"
                value="abc"
                setValue={() => { }}
                minLength={6}
                showError={false}
                editable={false}
            />
        )
        const input = getByPlaceholderText('Nome de usuário')
        expect(input.props.editable).toBe(false)
    })

    it('allows typing when editable is true', () => {
        const setValue = jest.fn()
        const { getByPlaceholderText } = render(
            <InputCustomUserName
                placeholder="Nome de usuário"
                value=""
                setValue={setValue}
                minLength={6}
                showError={false}
                editable={true}
            />
        )
        const input = getByPlaceholderText('Nome de usuário')
        fireEvent.changeText(input, 'newUsername')
        expect(setValue).toHaveBeenCalledWith('newUsername')
    })
})
