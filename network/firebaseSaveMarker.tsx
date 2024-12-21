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
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify([
                newMarker.nome,
                newMarker.cor,
                newMarker.latLng.latitude,
                newMarker.latLng.longitude,
                newMarker.id,
            ]),
        })

        if (!response.ok) {
            throw new Error('Falha ao salvar o marcador no Firebase')
        }

        return true
    } catch (error) {
        console.error("Erro ao salvar no Firebase:", error)
        return false
    }
}
