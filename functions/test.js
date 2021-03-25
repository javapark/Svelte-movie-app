exports.handler = async function(event, context) {
    return {
        statusCode:200,
        body:JSON.stringify({
            name: 'JAVAPARK',
            age: 30,
            email: 'javaparknet@gmail.com'
        })
    }
}
