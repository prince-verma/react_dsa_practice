// https://leetcode.com/problems/combination-sum/description/

function combinationSum(candidates: number[], target: number): number[][] {

  const res: number[][] = []

  const createCombination = (index: number, combArr: number[], total: number) => {
    if(total === target) {
        res.push([...combArr])
        return
    }
    if(total > target || index >= candidates.length) return

    combArr.push(candidates[index])
    createCombination(index, combArr, total+candidates[index])
    combArr.pop()
    createCombination(index+1, combArr, total)
  }
  createCombination(0, [], 0)
  return res
};

function combinationSum1(candidates: number[], target: number): number[][] {

  const res: number[][] = []

  const createCombination = (index: number, combArr: number[], total: number) => {
    if(total === target) {
        res.push([...combArr])
        return
    }
    if(total > target) return

    for(let i = index ; i< candidates.length ; i++){
        combArr.push(candidates[i])
        createCombination(i, combArr, total+candidates[i])
        combArr.pop()
    }
    // createCombination(index+1, combArr, total)
  }
  createCombination(0, [], 0)
  return res
};