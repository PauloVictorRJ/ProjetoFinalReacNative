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

export const editMarkerFirebase = async (updatedMarker: Marker): Promise<boolean> => {
    try {
        if (!updatedMarker.id) {
            throw new Error('ID do marcador não fornecido para a atualização')
        }

        const response = await fetch(`${env.DB_URL}/markers/${updatedMarker.id}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: updatedMarker.nome,
                cor: updatedMarker.cor,
                latLng: {
                    latitude: updatedMarker.latLng.latitude,
                    longitude: updatedMarker.latLng.longitude,
                },
            }),
        })

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o marcador no Firebase: ${response.status}`)
        }

        console.log(`Marcador com ID ${updatedMarker.id} atualizado com sucesso`)
        return true
    } catch (error) {
        console.error("Erro ao atualizar o marcador no Firebase:", (error as Error).message)
        return false
    }
}
