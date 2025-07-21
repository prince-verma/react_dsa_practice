// https://leetcode.com/problems/search-in-rotated-sorted-array/description/
// O(n)
function search(nums: number[], target: number): number {
    let mid = nums.length -1
    for(let i=0; i< nums.length-1; i++){
        if(nums[i] > nums[i+1]){
            mid = i+1
        }
    }
    if(target === nums[mid]) return mid
    let left = 0, right = nums.length-1
    if(target >= nums[mid] && target <= nums[nums.length-1]){
        left = mid
        right = nums.length -1
    }
    if(target >= nums[0] && target <= nums[mid -1]){
        left = 0
        right = mid-1
    }

    while (left <= right){
        mid = Math.floor((left+right)/2)
        if(target === nums[mid]) return mid
        if( target > nums[mid]){
            left = mid+1
        } else {
            right = mid-1
        }
    }
    return -1
};

// O(log n)
function search1(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}