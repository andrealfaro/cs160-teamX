import { account } from '../appwrite';

async function loginWithGoogle() {

    await account.createOAuth2Session(
        'google',
        'http://localhost:3000/',    
    )
 
}

export default loginWithGoogle;