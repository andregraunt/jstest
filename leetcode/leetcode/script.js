let twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
     if(i !== j){
			// if (nums[j]==target - nums[i]) {
			 	
			 
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
  }
}
console.log(twoSum([1,2,3,3], 6))
