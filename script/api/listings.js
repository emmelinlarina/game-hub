const API_KEY = '6905c3cf-ac0a-4c54-83ab-5c1d5d6908df'; // Replace with your actual Noroff API key

export async function fetchListings() {
    const response = await fetch('https://api.noroff.dev/api/v2/auction/listings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY
      }
    });
    const data = await response.json();
    return data;
  }