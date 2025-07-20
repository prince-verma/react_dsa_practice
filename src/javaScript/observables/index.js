import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next("Hello");
  subscriber.next("World");
  subscriber.next("World1");
  subscriber.complete();
});

// Observer
observable.subscribe({
  next(x) {
    console.log("Received:", x);
  },
  error(err) {
    console.error("Error:", err);
  },
  complete(s) {
    console.log("Done", s);
  },
});
