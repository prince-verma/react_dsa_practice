/* eslint-disable no-loop-func */
const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  #onSuccessBind = this.#onSuccess.bind(this);
  #onRejectBind = this.#onReject.bind(this);
  #value;
  #state = STATE.PENDING;
  #thenCbs = [];
  #catchCbs = [];

  constructor(cb) {
    try{
      cb(this.#onSuccessBind, this.#onRejectBind);
    } catch (error){
      this.#onRejectBind(error)
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#thenCbs = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  #onSuccess(val) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if( val instanceof MyPromise){
        val.then(this.#onSuccessBind, this.#onRejectBind)
        return
      }

      this.#value = val;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }

  #onReject(val) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;
      
      if( val instanceof MyPromise){
        val.then(this.#onSuccessBind, this.#onRejectBind)
        return
      }

      this.#value = val;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (!thenCb) {
          resolve(result);
          return;
        }
        try {
          const returned = thenCb(result)
          if( returned instanceof MyPromise){
            returned.then(resolve, reject)
          }else{
            resolve(returned);
          }
        } catch (error) {
          reject(error);
        }
      });
      this.#catchCbs.push((result) => {
        if (!catchCb) {
          reject(result);
          return;
        }
        try {
          const returned = catchCb(result)
          if( returned instanceof MyPromise){
            returned.then(resolve, reject)
          }else{
            resolve(returned);
          }
        } catch (error) {
          reject(error);
        }
      });
      this.#runCallbacks();
    });
  }
  catch(cb) {
    return this.then(null, cb);
  }
  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (reason) => {
        cb();
        throw reason;
      }
    );
  }

  static resolve(val) {
    return new MyPromise((res) => res(val));
  }
  static reject(val) {
    return new MyPromise((res, rej) => rej(val));
  }
  static all(promises = []) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let results = [];
      if (promises.length === 0) {
        resolve(results);
        return;
      }
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        MyPromise.resolve(promise)
          .then((result) => {
            count++;
            results[i] = result;
            if (count === promises.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      }
    });
  }
  static allSettled(promises) {
     return new MyPromise((resolve) => {
      let count = 0;
      let results = [];
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        MyPromise.resolve(promise)
          .then((result) => {
            results[i] = {status: STATE.FULFILLED, value: result};
          })
          .catch((reason) => {
            results[i] = {status: STATE.REJECTED, reason};
          }).finally(() => {
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          });
      }
    });
  }

  static race(promises) {
     return new MyPromise((resolve) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        MyPromise.resolve(promise)
          .then(resolve)
          .catch(resolve)
      }
    });
  }
  static any(promises) {
     return new MyPromise((resolve, reject) => {
      let errorCount = 0;
      let errors = [];
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        MyPromise.resolve(promise)
          .then((result) => {
            resolve(result)
          })
          .catch((reason) => {
            errorCount++
            errors[i] = {status: STATE.REJECTED, reason};
            if (errorCount === promises.length) {
              reject(errors);
            }
          })
      }
    });
  }
}

export default MyPromise;
// module.exports = MyPromise;
