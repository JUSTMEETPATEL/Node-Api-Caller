const axios = require('axios');


function createApiCaller(url, minutes = 15) {
    let timer = null;

    // Make a single API call
    async function callApi() {
        try {
            console.log(`Calling API: ${url}`);
            const result = await axios.get(url);
            console.log('Success:', result.data);
            return result.data;
        } catch (error) {
            console.log('Error:', error.message);
            return null;
        }
    }

    // Start making API calls
    async function start() {
        if (timer) {
            console.log('Already running');
            return;
        }

        // Initial call
        await callApi();
        
        timer = setInterval(callApi, minutes * 60 * 1000);
        console.log(`Started: calling every ${minutes} minutes`);
        
        // Keep the Node.js process running
        process.stdin.resume();
    }

    // Stop making API calls
    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            console.log('Stopped');
            // Allow the process to exit
            process.stdin.pause();
        }
    }

    return { start, stop };
}


const api = createApiCaller('https://jsonplaceholder.typicode.com/todos/1');
api.start().catch(console.error);
// To stop the API calls, uncomment the following line:
// setTimeout(() => api.stop(), 60000); // Stops after 1 minute
