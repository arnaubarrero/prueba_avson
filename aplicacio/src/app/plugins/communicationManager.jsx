const Host = process.env.NEXT_PUBLIC_CM_HOST;

// ========= POST =======================
export const getData = async (index) => {
    try {
        const response = await fetch(`/data.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};