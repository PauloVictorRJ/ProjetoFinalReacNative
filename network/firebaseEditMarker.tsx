import env from "../constants/env"

interface Marker {
    nome: string
    cor: string
    latLng: {
        latitude: number
        longitude: number
    }
    id: string
}

export const editMarkerFirebase = async (updatedMarker: Marker) => {
    try {
        const response = await fetch(`${env.DB_URL}/markers/${updatedMarker.id}.json`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify([
                updatedMarker.nome,
                updatedMarker.cor,
                updatedMarker.latLng.latitude,
                updatedMarker.latLng.longitude,
                updatedMarker.id,
            ]),
        })

        if (!response.ok) {
            throw new Error('Falha ao atualizar o marcador no Firebase')
        }

        return true
    } catch (error) {
        console.error("Erro ao atualizar no Firebase:", error)
        return false
    }
}
