AccountStatement => walletId
Banking => walletId
createWallet=> userId, walletId

//=================================================

const req = async () => {
let username = 'test';
let password = 'test';
let authString = `${username}:${password}`
const res = await fetch("http://localhost:8080/user", {
method: 'GET', headers: {
'Authorization': 'Basic ' + btoa(authString)
}
});
return res.data;
};

const axiosInstance = axios.create({
baseURL: "http://localhost:8080/",
withCredentials: true,
auth: {
username: 'test',
password: 'test'
},
})
