import env from "../constants/env"

interface Marker {
    nome: string
    cor: string
    latLng: {
        latitude: number
        longitude: number
    }
    id?: string
}

export const saveMarkerFirebase = async (newMarker: Marker) => {
    try {
        const response = await fetch(`${env.DB_URL}/markers.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: newMarker.nome,
                cor: newMarker.cor,
                latLng: {
                    latitude: newMarker.latLng.latitude,
                    longitude: newMarker.latLng.longitude,
                },
            }),
        })

        if (!response.ok) {
            throw new Error('Falha ao salvar o marcador no Firebase')
        }

        const result = await response.json()
        const id = result.name

        const updateResponse = await fetch(`${env.DB_URL}/markers/${id}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })

        if (!updateResponse.ok) {
            throw new Error('Falha ao atualizar o marcador com o ID no Firebase')
        }

        return true
    } catch (error) {
        console.error('Erro ao salvar no Firebase:', error)
        return false
    }
}