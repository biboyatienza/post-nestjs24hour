import { v2 as cloudinary } from 'cloudinary';
import { env } from 'process';

const signUpload = async () => {
  const api_secret = '342277832733615';
  const timestamp = Math.round(Date.now()/1000);
  const params = {
    timestamp: timestamp
  };

  cloudinary.config({
    cloud_name: "dhcnbaqsl",
    api_key: "342277832733615",
    api_secret: "6U_Cj6KOnEqr-DqCoyl9UnQRnGk",
    secure: true
  })
    
const signature = cloudinary.utils.api_sign_request(params, api_secret);
return { 
    "api_key": env.CLOUDINARY_API_KEY,
    timestamp, 
    signature,
    "data": `file=https://www.example.com/sample.jpg&timestamp=${timestamp}&api_key=${api_secret}&signature=${signature}`  
  };
} 

console.log(signUpload());

// $ echo -n "timestamp=1611235683<API_SECRET>" | sha1sum
//  echo -n "timestamp=1653611314342277832733615" | sha1sum
