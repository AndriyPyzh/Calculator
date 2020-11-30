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

    let {matrix, vector} = task;

    async function diagonalize(M) {
        const m = M.length;
        const n = M[0].length;
        let i_max;
        for (let k = 0; k < Math.min(m, n); ++k) {
            await sleep(timeToSleep);

            i_max = findPivot(M, k);
            if (matrix[i_max][k] === 0)
                await swap_rows(M, k, i_max);
            for (let i = k + 1; i < m; ++i) {

                await task.save();
                const c = matrix[i][k] / matrix[k][k];
                for (let j = k + 1; j < n; ++j) {
                    matrix[i][j] = matrix[i][j] - matrix[k][j] * c;
                }
                M[i][k] = 0;
            }

            task.progress += 100 / (Math.min(m, n));
            if (task.progress >= 100) {
                task.status = 'finished';
            }
            if (task.isStopped) {
                task.status = 'finished';
                error = true;
                await task.save();
                return;
            }
            console.log(task.name + task.progress);
            await task.save();

            task = await Tasks.findOne({name: task.name, user: creator});
        }
    }

    function findPivot(M, k) {
        let i_max = k;
        for (let i = k + 1; i < M.length; ++i) {
            if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
                i_max = i;
            }
        }
        return i_max;
    }

    async function swap_rows(M, i_max, k) {
        if (i_max !== k) {
            const temp = M[i_max];
            M[i_max] = M[k];
            M[k] = temp;
        }
    }

    async function makeM(A, b) {
        for (let i = 0; i < A.length; ++i) {
            A[i].push(b[i]);
        }
    }

    async function substitute(M) {
        const m = M.length;
        for (let i = m - 1; i >= 0; --i) {
            const x = M[i][m] / M[i][i];
            for (let j = i - 1; j >= 0; --j) {
                M[j][m] -= x * M[j][i];
                M[j][i] = 0;
            }
            M[i][m] = x;
            M[i][i] = 1;
        }
    }

    async function extractX(M) {
        const x = [];
        const m = M.length;
        const n = M[0].length;
        for (let i = 0; i < m; ++i) {
            x.push(M[i][n - 1]);
        }
        if (error) {
            return;
        }
        return x;
    }

    async function solve(A, b) {
        await makeM(A, b);

        await diagonalize(A);

        if (error) {
            return;
        }

        await substitute(A);
        if (error) {
            return;
        }

        return extractX(A);

    }

    const res = await solve(matrix, vector);
    if (error) {
        return;
    }
    task.result = res;
    await task.save();
};

module.exports = {runTask};
