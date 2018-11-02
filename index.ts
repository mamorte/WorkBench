import {
  Observable,
  timer,
  of,
  from,
  concat,
  fromEvent,
  merge,
  throwError,
  Subject,
  interval
} from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  mergeMap,
  filter,
  tap,
  catchError,
  take,
  multicast,
  refCount,
  publish,
  share,
  publishLast,
  publishBehavior,
  publishReplay
} from "rxjs/operators";
import { allBooks, allReaders } from "./data";

console.log("testing123456789");

const elem = document.getElementById("test123");
if (elem) {
  elem.innerHTML = "Hello World";
}

// RxJs

//#region OBSERVABLES

let allBooksObservable$ = new Observable(subscriber => {
  if (document.title != "RxBoooks") {
    subscriber.error("Incorrect page title");
  }

  for (let book of allBooks) {
    subscriber.next(book);
  }

  setTimeout(() => subscriber.complete(), 2000);

  return () => console.log("Teardown");
});

allBooksObservable$.subscribe(
  book => console.log(book),
  () => console.log("Error happened"),
  () => console.log("Completed")
);

/*
let source1$ = of(true, false, "Hei", 123, "Deg", allReaders[0].name);

// source1$.subscribe((k) => console.log(k));

let source2$ = from(allBooks);

//source2$.subscribe((k) => console.log(k));

concat(source1$, source2$)
    .subscribe((k) => console.log(k));
*/

/*
let button = document.getElementById("readerButton");

fromEvent(button, 'click')
    .subscribe(event => {
        console.log(event);
        let readerDiv = document.getElementById("readerList");

        for(let reader of allReaders) {
            readerDiv.innerHTML += reader.name + '<br>'
        }
     });
*/

/*
let button = document.getElementById("readerButton");

fromEvent(button, "click").subscribe(event => {
  let response = ajax("api/readers").subscribe(response => {
    console.log(response);
    let readers = response.response;
    let readersDiv = document.getElementById("readerList");

    for (let reader of readers) {
      readersDiv.innerHTML += reader.name + "<br>";
    }
  });
});
*/

//#endregion

//#region CatchError
/*
ajax('/api/errors/500')
.pipe(
    mergeMap(ajaxResponse => ajaxResponse.response),
    filter(response => response.publicationYear > 1950),
    tap(book => console.log(book.title)),
    //catchError((err, caught) => throw  `Error: ${err.message}` )
    //catchError((err, caught) => caught)
    catchError(err => of({title:'NewBook'}))
).subscribe(book => console.log(book));
*/
//#endregion

//#region Take
/*
ajax('/api/books')
.pipe(
    mergeMap(ajaxResponse => ajaxResponse.response),
    filter(response => response.publicationYear > 1950),
    take(2),
    tap(book => console.log(book.title)),
).subscribe(book => console.log(book));
*/
//#endregion

//#region Create Operator

/*
function grabClassics(year, log) {
    return source$ => {
        return new Observable(subscriber => {
            return source$.subscribe(
                book => {
                    if(book.publicationYear < year) {
                        subscriber.next(book);
                        if(log) {
                            console.log(`Classic title: ${book.title}`);
                        }
                    }
                },
                err => subscriber.error(err),
                () => subscriber.complete()
            );
        });
    }
}



ajax("api/books")
    .pipe(
        mergeMap(r => r.response),
        // take(5),
        grabClassics(1960, true)
    ).subscribe(
        (val) => console.log(`Title: ${ val.title }`),
        null,
        null
    )
*/
//#endregion

//#region Subjects
/*
let subject$ = new Subject();

subject$.subscribe(
    val => console.log(`Observer 1: ${val}`)
);

subject$.subscribe(
    val => console.log(`Observer 2: ${val}`)
);


subject$.next("hello");


let source$ = new Observable(subscriber => {
    subscriber.next("Greetings!");
});


source$.subscribe(subject$);
*/
//#endregion

//#region Hot Observable
/*
let source$ = interval(1000)
    .pipe(
        take(4)
    )

let subject$ = new Subject();

source$.subscribe(subject$);



subject$.subscribe(
    val => console.log(`Observer 1: ${val}`)
)

setTimeout(() => {
    subject$.subscribe(
        val => console.log(`Observer 2: ${val}`)
    )
}, 1000);

setTimeout(() => {
    subject$.subscribe(
        val => console.log(`Observer 3: ${val}`)
    )
}, 2000);
*/
//#endregion

//#region Multicast
/*
let source$ = interval(1000)
    .pipe(
        take(4),
        //multicast(new Subject()),
        // publish()
        share(),
        //refCount()
    )


source$.subscribe(
    val => console.log(`Observer 1: ${val}`)
)

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 2: ${val}`)
    )
}, 1000);

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 3: ${val}`)
    )
}, 2000);

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 4: ${val}`),
        null,
        () => console.log("Number 4 is complete")
    )
}, 5000);

//source$.connect();

*/
//#endregion

//#region Specialized multicasting
/*
let source$ = interval(1000)
    .pipe(
        take(4),
        //multicast(new Subject()),
        //publishLast()
        //publishBehavior(42),
        publishReplay(),
        //share(),
        refCount(),
    )


source$.subscribe(
    val => console.log(`Observer 1: ${val}`)
)

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 2: ${val}`)
    )
}, 1000);

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 3: ${val}`)
    )
}, 2000);

setTimeout(() => {
    source$.subscribe(
        val => console.log(`Observer 4: ${val}`),
        null,
        () => console.log("Number 4 is complete")
    )
}, 5000);

//source$.connect();

*/
//#endregion
