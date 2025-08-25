import jwt from 'jsonwebtoken';
export function checkAccessToken(accessToken){
    
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return NextResponse.next();
        } catch (e) {
            url.pathname = "/frontend/publicUser/loginUser";
            return NextResponse.redirect(url);
        }
}