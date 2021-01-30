let apiurl = ''; 

if (window.location.hostname === 'localhost' || window.location.hostname === "127.0.0.1") {
    apiurl = "http://localhost:3001"
} else {
    apiurl = 'https://ballrserver.herokuapp.com'
}

export default apiurl; 

