function sum(args) {
    allArgs = Array.from(arguments)
    let sum = 0;
    for (i = 0; i < allArgs.length; i++) {
        sum += allArgs[i];
    }
    return sum;
}

// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));


// function sum2(...args) {
//     let sum = 0;
//     for (i = 0; i < args.length; i++) {
//         sum += args[i];
//     }
//     return sum;
// }

// console.log(sum2(1, 2, 3, 4));
// console.log(sum2(1, 2, 3, 4, 5));

Function.prototype.myBind = function(ctx) {
    const originalFunc = this;
    let bindArgs = Array.from(arguments).slice(1);
    return function() {
        let callArgs = Array.from(arguments);
        return originalFunc.apply(ctx, bindArgs.concat(callArgs));
    };
}


Function.prototype.myBind = function(ctx, ...bindArgs) {
    const originalFunc = this;
    return function(...callArgs) {
        return originalFunc.apply(ctx, bindArgs.concat(callArgs));
    };
}

class Cat {
    constructor(name) {
      this.name = name;
    }

    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }

  class Dog {
    constructor(name) {
      this.name = name;
    }
  }

  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");

  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true

  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true

  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true

  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true

  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true

// function curriedSum(numArgs) {
//     const nums = [];
//     return function _curriedSum(num) {
//         nums.push(num);
//         if (nums.length === numArgs) {
//             let sum = 0;
//             for (i = 0; i < nums.length; i++) {
//                 sum += nums[i];
//             };
//             return sum;
//         } else {
//             return _curriedSum;
//         }
//     }
// }


// function curriedSum(numArgs) {
//     const nums = [];
//     return function _curriedSum(num) {
//         nums.push(num);
//         if (nums.length === numArgs) {
//             return sum.apply(null, nums)
//         } else {
//             return _curriedSum;
//         }
//     }
// }


function curriedSum(numArgs) {
    const nums = [];
    return function _curriedSum(num) {
        nums.push(num);
        if (nums.length === numArgs) {
            return sum(...nums);
        } else {
            return _curriedSum;
        }
    }
}

function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
  }


//USING CALL AND SPREAD OPERATOR
Function.prototype.curry = function(numArgs) {
    debugger
    const originalFunc = this;
    const nums = [];
    return function _curried(num) {
        nums.push(num);
        debugger
        if(nums.length === numArgs) {
            return originalFunc.call(null, ...nums);
        }
        else{
            return _curried;
        }
    }
}

//USING APPLY 
Function.prototype.curry = function(numArgs) {
    debugger
    const originalFunc = this;
    const nums = [];
    return function _curried(num) {
        nums.push(num);
        debugger
        if(nums.length === numArgs) {
            return originalFunc.apply(null, nums);
        }
        else{
            return _curried;
        }
    }
}

//WITH CONTEXT PASSED IN 
Function.prototype.curry = function(context, numArgs) {
    debugger
    const originalFunc = this;
    const nums = [];
    return function _curried(num) {
        nums.push(num);
        debugger
        if(nums.length === numArgs) {
            return originalFunc.call(context, ...nums);
        }
        else{
            return _curried;
        }
    }
}
