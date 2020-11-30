
function start(callback){
    setTimeo
    console.log('start');
    return callback();
}

function end(){
    console.log('end');
    return true;
}

var res = start(end);

console.log(res);
