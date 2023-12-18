let a = [1, 2, 3, 4];

let sum = 0;
for (let i = 0; i < a.length; i++) {
    sum = sum + a[i];
}
console.log(sum);

// prev - вычисляемое значение
// prev = a[0] !!!!

let b = a.reduce((prev, item, index) => {
    return prev + item;
}, 0);

console.log(b);

a = [3, 1, 2, 5, 1, 22, 4];

let max = a[0];
for (let i = 0; i < a.length; i++) {
    if (a[i] > max) {
        max = a[i];
    }
}

console.log(max);

let c = a.reduce((prev, item) => {
    if (prev < item) {
        return item;
    }
    else {
        return prev;
    }
}, a[0]);
console.log(c);

// индекс максимального элемента
max = a[0];
let index = 0;
for (let i = 0; i < a.length; i++) {
    if (a[i] > max) {
        max = a[i];
        index = i;
    }
}

console.log(index);

let d = a.reduce((prev, item, index) => {
    if (item > prev[1]) {
        return [index, item];
    }
    else {
        return prev;
    }
}, [0, a[0]]);

console.log(d);

const data = [[1, 2, 3], [3, 4, 5], [5, 6, 7]];
const flat = data.reduce((prev, item) => {
    return prev.concat(item);
}, []);
console.log(flat);