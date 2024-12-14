import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import MarkerComponent from '@/components/markerComponent'

describe('MarkerComponent', () => {
    const mockOnPress = jest.fn()

    const defaultProps = {
        nome: 'Ponto turístico',
        latLng: {
            latitude: 10.0,
            longitude: 20.0
        },
        cor: 'red',
        onPress: mockOnPress,
    }

    it('should render correctly with the provided props', () => {
        const { getByText, getByTestId } = render(<MarkerComponent {...defaultProps} />)

        expect(getByText('Ponto turístico')).toBeTruthy()
        expect(getByText('Latitude: 10')).toBeTruthy()
        expect(getByText('Longitude: 20')).toBeTruthy()

        const container = getByTestId('marker-container')
        expect(container.props.style[0].backgroundColor).toBe('red')
    })

    it('should call onPress when the TouchableOpacity is pressed', () => {
        const { getByTestId } = render(<MarkerComponent {...defaultProps} />)

        const touchable = getByTestId('marker-touchable')
        fireEvent.press(touchable)

        expect(mockOnPress).toHaveBeenCalledTimes(1)
    })
})
