import env from '@/constants/env';

export default async function signInWithPassword(email: string, password: string) {
    const apiKey = env.API_KEY;
    const apiURL = env.API_URL;

    try {
        const response = await fetch(`${apiURL}/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const body = await response.json();
        return { status: response.status, data: body };
    } catch (error: any) {
        throw new Error(error.message);
    }
}