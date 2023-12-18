
		function doSort(items, fst, lst) { 
if (fst >= lst)
return;
let i
=
lst;
let j
=
lst;
let X
= items [Math.floor ((fst +
lst) / 2)];
while (i < i) {
while (items[i] < x) itt;
while (items[i] > x) j
if (i
<= 1)
{
let tmp
= items [i];
items[i]
= items [j];
items[j] = tmp;
i++;
j--;
 }
}
doSort(items,fst, j);
doSort(items, i,lst);
}
		function sort(arr) {
let items = arr.slice();
doSort(items, 0, items. length - 1) ;
return items;
}
let items =[14, 1, 5,3, 21];
let sortItems
sort(items) ;
// sortItems is 11, 2,3, 4, 5]
console. log (sortItems);
		// *** simplified speed test ***
let i = 0;
items = Array
    .apply(null, Array(20))
    .map(() => ++i);
let tmp = items[5];
items[5] = items[6];
items[6] = tmp;
let count = 100;
let start = new Date();

for (i = 0; i < count; i++)
    sort(items);

let milliseconds = (new Date()) - start;

console.log(milliseconds);
// about 143 milliseconds

		