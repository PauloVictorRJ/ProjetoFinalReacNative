import env from '../constants/env';

export const loadMarkersListFromFirebase = async () => {
    try {
        const response = await fetch(`${env.DB_URL}/markers.json`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        if (data == null) {
            console.log('Dados nulos no Firebase');
            return [];
        }

        return Object.keys(data).map(key => {
            const markerData = data[key];
            return {
                nome: markerData[0],
                cor: markerData[1],
                latLng: {
                    latitude: markerData[2],
                    longitude: markerData[3],
                },
                id: markerData[4],
            };
        });
    } catch (error) {
        console.error("Erro ao obter marcadores:", (error as Error).message);
        return [];
    }
};
