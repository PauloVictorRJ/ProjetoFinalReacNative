import env from '../constants/env'

export const firebaseDelMarkerById = async (id: string) => {
    try {
        console.log("Deletando marcador com ID:", id);
        const response = await fetch(`${env.DB_URL}/markers.json`)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }
        const data = await response.json()
        if (data == null) {
            console.log('Dados nulos no Firebase')
            return false
        }

        const markerKey = Object.keys(data).find(key => data[key][4] === id)
        if (!markerKey) {
            console.log(`Marcador com ID ${id} não encontrado`)
            return false
        }

        const deleteResponse = await fetch(`${env.DB_URL}/markers/${markerKey}.json`, {
            method: 'DELETE',
        })

        if (!deleteResponse.ok) {
            throw new Error(`Erro ao deletar o marcador: ${deleteResponse.status}`)
        }

        console.log(`Marcador com ID ${id} deletado com sucesso`)
        return true
    } catch (error) {
        console.error("Erro ao deletar o marcador:", (error as Error).message)
        return false
    }
}
