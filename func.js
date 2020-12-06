// import {sin} from "Math";
// var x=4;
// var n= 8;
// var a=0;
// var b=5;
// var e=0.001;
// var f='sin(x)';
//
//
// function func(num,f){
//     var x=num;
//     return eval(f);
//
// }
// var r= func(4.5, f);
// console.log(r);
// function Newton(a,b,n,x,e,f) {
//     var xArr = [];
//     var yArr = [];
//     while (xArr.length < n) {
//         var r = a + Math.random() * (b - a);
//         if (xArr.indexOf(r) === -1) xArr.push(r);
//     }
//     xArr.sort();
//     //console.log(xArr);
//
//     for (i = 0; i < xArr.length; i++) {
//         yArr.push(func(xArr[i], f));
//     }
//     //console.log(yArr);
//     separationMatrix = [];
//
//     for (var i = 0; i < xArr.length; i++) {
//         separationMatrix[i] = [];
//         for (var j = 0; j < xArr.length; j++) {
//             separationMatrix[i][j] = 0
//         }
//     }
//     //console.log(separationMatrix);
//
//     for (let i = 1; i < xArr.length; i++) {
//         for (let j = 1; j < xArr.length - i + 1; j++) {
//             if (i == 1) {
//                 separationMatrix[j][i] = (yArr[j] - yArr[j - 1]) / (xArr[j] - xArr[j - 1]);
//             } else {
//                 separationMatrix[j][i] = (separationMatrix[j + 1][i - 1] - separationMatrix[j][i - 1]) / (xArr[j + i - 1] - xArr[j - 1]);
//             }
//         }
//     }
//     //console.log(separationMatrix)
//     let d = 1;
//     let result = yArr[xArr.length - 1];
//     //console.log(result);
//     for (let iter = 1; iter < xArr.length; iter++) {
//         d = d * (x - xArr[xArr.length - iter]);
//         let dod = separationMatrix[iter][xArr.length - iter] * d;
//
//         if (Math.abs(separationMatrix[iter][xArr.length - iter]) < e) {
//             result += dod;
//             break;
//         }
//         result += dod;
//     }
//     return  result;
// }
// var res=Newton(a,b,n,x,e,f);
// console.log(res);