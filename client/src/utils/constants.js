export const supportUs = {
    'email': 'moviewiz@test.com',
    'phoneNo': '+91 9876 543 210'
}

export const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
};