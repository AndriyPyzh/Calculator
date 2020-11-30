var sleep = require('system-sleep');
require('coffee-register');
var {Thread} = require('thread');


t1 = new Thread(function a(){
                    for(let i=0;i< 10;i++){
                        sleep(1000); // sleep for 10 seconds

                        console.log('hello');
                    }
                    sleep(10*1000); // sleep for 10 seconds
                });

t2 = new Thread(function b(){
                    for(let i=0;i< 10;i++){
                        sleep(1000); // sleep for 10 seconds

                        console.log('bye');
                    }
                    sleep(10*1000); // sleep for 10 seconds
                });



t1.run()
t2.run()




