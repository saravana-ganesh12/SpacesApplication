import axios from 'axios';

export async function getSpaces(query){
    try{
        const response = await axios.get('http://127.0.0.1:3001/spacesapplication/searchspaces/'+query);
        if(response.status === 404){
            return {error:response, status:404};            
        }
        return response;
    }catch(err){
        return {error:err, status:404}
    }
}

