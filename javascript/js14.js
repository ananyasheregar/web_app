//1.ASYNC/AWAIT ARROW FUNCTION
const fetchUserData = async(userId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        console.log(`User Name: ${data.name}`);
        console.log(`Email: ${data.email}`);
    } catch (error) {
        console.error("Error fetching data:",error);
    }
};

//Calling the function
fetchUserData(1);