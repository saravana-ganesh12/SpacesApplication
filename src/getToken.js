import axios from 'axios';
import Cookie from 'universal-cookie';
export async function getToken(){
    const cookie = new Cookie();
    const cookieToken = cookie.get('SpeechAPIToken');
    if(cookieToken === undefined)
    {
        try{
            const response = await axios.get('http://127.0.0.1:3001/spacesapplication/speechapi/token');
            const token = response.data.token;
            const region = response.data.region;
            cookie.set('SpeechAPIToken', region + ':' + token, {maxAge: 540, path:'/'});

            return {appServiceToken: token, appServiceRegion: region};
        }catch(err){
            return {appServiceToken: null, appServiceRegion: null, error: err.response.data};
        }
    }else{
        const index = cookieToken.indexOf(":");
        return {appServiceToken: cookieToken.slice(index+1), appServiceRegion: cookieToken.slice(0, index)};
    }
}