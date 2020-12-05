import {Tasks} from "../models/Task";

require('dotenv').config();


const runTask = async (task, creator) => {
    task.status = 'running';
    task.startedAt = Date.now();

    await task.save();
    calculate(task, creator);
};

const calculate = async (task, creator) => {
    let error = false;
    const timeToSleep = process.env.SLEEP_TIME;

    task = await Tasks.findOne({name: task.name, user: creator});

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var x = task.x;
    var n = 20;
    var a = task.a;
    var b = task.b;
    var e = task.e;
    var f = task.f;


    function func(num, f) {
        var x = num;
        return eval(f);

    }

    async function Newton(a, b, n, x, e, f) {
        var xArr = [];
        var yArr = [];
        while (xArr.length < n) {
            var r = a + Math.random() * (b - a);
            if (xArr.indexOf(r) === -1) xArr.push(r);

            await sleep(timeToSleep);
            task.progress += 100 / n;
            if (task.progress >= 100) {
                task.status = 'finished';
            }
            if (task.isStopped) {
                task.status = 'finished';
                error = true;
                await task.save();
                return;
            }
            console.log(task.name + '    ' + task.progress);
            await task.save();

            task = await Tasks.findOne({name: task.name, user: creator});

        }
        xArr.sort();

        for (i = 0; i < xArr.length; i++) {
            yArr.push(func(xArr[i], f));
        }
        let separationMatrix = [];

        for (var i = 0; i < xArr.length; i++) {
            separationMatrix[i] = [];
            for (var j = 0; j < xArr.length; j++) {
                separationMatrix[i][j] = 0
            }
        }

        for (let i = 1; i < xArr.length; i++) {
            for (let j = 1; j < xArr.length - i + 1; j++) {
                if (i === 1) {
                    separationMatrix[j][i] = (yArr[j] - yArr[j - 1]) / (xArr[j] - xArr[j - 1]);
                } else {
                    separationMatrix[j][i] = (separationMatrix[j + 1][i - 1] - separationMatrix[j][i - 1]) / (xArr[j + i - 1] - xArr[j - 1]);
                }
            }
        }

        let d = 1;
        let result = yArr[xArr.length - 1];

        for (let iter = 1; iter < xArr.length; iter++) {

            d = d * (x - xArr[xArr.length - iter]);
            let dod = separationMatrix[iter][xArr.length - iter] * d;

            if (Math.abs(separationMatrix[iter][xArr.length - iter]) < e) {
                result += dod;
                break;
            }
            result += dod;

        }
        return result;
    }

    let res = await Newton(a, b, n, x, e, f);
    if (error) {
        return;
    }
    task.result = res;
    task.status = 'finished';
    await task.save();
    console.log(task.result);
};

module.exports = {runTask};
