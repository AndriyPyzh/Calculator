const runTask = async (task) => {
    task.status = 'running';
    task.startedAt = Date.now();

    await task.save();

    calculate(task);
};

const calculate = async (task) => {
    const timeToSleep = 10000;

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    let {matrix, vector} = task;

    async function diagonalize(M) {
        const m = M.length;
        const n = M[0].length;
        let i_max;
        for (let k = 0; k < Math.min(m, n); ++k) {

            sleep(timeToSleep);

            i_max = findPivot(M, k);
            if (matrix[i_max][k] === 0)
                await swap_rows(M, k, i_max);
            for (let i = k + 1; i < m; ++i) {
                const c = matrix[i][k] / matrix[k][k];
                for (let j = k + 1; j < n; ++j) {
                    matrix[i][j] = matrix[i][j] - matrix[k][j] * c;
                }
                M[i][k] = 0;
            }

            task.progress += 100 / Math.min(m, n);
            if (task.progress >= 100) {
                task.status = 'finished';
            }
            console.log(task.name);

            await task.save();
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
        return x;
    }

    async function solve(A, b) {
        await makeM(A, b);

        await diagonalize(A);

        await substitute(A);

        return extractX(A);
    }

    task.result = await solve(matrix, vector);
    console.log(task.result);
    await task.save();
};

module.exports = {runTask};
