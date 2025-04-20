const API_KEY = '6905c3cf-ac0a-4c54-83ab-5c1d5d6908df';


const API_URL = 'https://v2.api.noroff.dev/gamehub';

export async function fetchListings() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();

    
    return json.data;
  } catch (error) {
    console.error('Error fetching GameHub listings:', error);
    return [];
  }
}


