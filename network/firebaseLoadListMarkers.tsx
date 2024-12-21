import env from '../constants/env'

export const loadMarkersListFromFirebase = async () => {
    try {
        const response = await fetch(`${env.DB_URL}/markers.json`)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const data = await response.json()

        if (!data) {
            console.log('Nenhum marcador encontrado no Firebase')
            return []
        }

        return Object.keys(data).map(key => {
            const markerData = data[key]
            return {
                id: key,
                nome: markerData.nome,
                cor: markerData.cor,
                latLng: {
                    latitude: markerData.latLng.latitude,
                    longitude: markerData.latLng.longitude,
                },
            }
        })
    } catch (error) {
        console.error('Erro ao obter marcadores:', (error as Error).message)
        return []
    }
}