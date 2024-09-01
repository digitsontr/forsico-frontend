const config  = require("../../config")

class Login{
    login = async (username, password) => {
        let status = 0
        let res;

        await fetch(config.baseUrl + "/api/Auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
          })
          .then((response) => {
            status = (response || {}).status; 
            return (response || {}).json() || {}})
          .then((result) => {
            res = result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };
}
export default Login;