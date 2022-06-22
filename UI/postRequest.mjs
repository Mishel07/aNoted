var postRequest = async(url,obj)=>{
    console.log(obj)
    let body = JSON.stringify(obj)
    let result = await fetch(url, {
        method: 'POST',
        body:body,
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        });
        let res = await result.json()
        return res
}

export default postRequest 