import env from '../constants/env'

export const firebaseDelMarkerById = async (id: string) => {
    try {
        console.log('Deletando marcador com ID:', id)

        const deleteResponse = await fetch(`${env.DB_URL}/markers/${id}.json`, {
            method: 'DELETE',
        })

        if (!deleteResponse.ok) {
            throw new Error(`Erro ao deletar o marcador: ${deleteResponse.status}`)
        }

        console.log(`Marcador com ID ${id} deletado com sucesso`)
        return true
    } catch (error) {
        console.error('Erro ao deletar o marcador:', (error as Error).message)
        return false
    }
}
