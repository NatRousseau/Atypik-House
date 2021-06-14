export async function connecte(mail: string, password: string) {
    const requestOptions = {
        method: "GET"
     
    };
    const response = await fetch("http://localhost:450/connection/"+ mail + "/" + password, requestOptions);
    const user = await response.json();
    return user;
}