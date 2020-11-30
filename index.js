var sleep = require('system-sleep');

for(let i=0;i< 10;i++){
    sleep(1000); // sleep for 10 seconds

    console.log('hello');
}
sleep(10*1000); // sleep for 10 seconds
