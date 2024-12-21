import env from '../constants/env'

export const firebaseLoadMarkerById = async (id: string) => {
    try {
        console.log("Buscando marcador com ID:", id);
        const response = await fetch(`${env.DB_URL}/markers.json`)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        const data = await response.json()
        if (data == null) {
            console.log('Dados nulos no Firebase');
            return null
        }

        const markerKey = Object.keys(data).find(key => data[key][4] === id)
        if (!markerKey) {
            console.log(`Marcador com ID ${id} não encontrado`)
            return null
        }

        const markerData = data[markerKey]

        return {
            nome: markerData[0],
            cor: markerData[1],
            latLng: {
                latitude: markerData[2],
                longitude: markerData[3],
            },
            id: markerData[4],
        }
    } catch (error) {
        console.error("Erro ao obter o marcador:", (error as Error).message)
        return null
    }
};
