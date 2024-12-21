import env from '../constants/env'

export const firebaseLoadMarkerById = async (id: string) => {
    try {
        console.log('Buscando marcador com ID:', id)

        const response = await fetch(`${env.DB_URL}/markers/${id}.json`)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const markerData = await response.json()

        if (!markerData) {
            console.log(`Marcador com ID ${id} não encontrado`)
            return null
        }

        return {
            id,
            nome: markerData.nome,
            cor: markerData.cor,
            latLng: {
                latitude: markerData.latLng.latitude,
                longitude: markerData.latLng.longitude,
            },
        }
    } catch (error) {
        console.error('Erro ao obter o marcador:', (error as Error).message)
        return null
    }
}
