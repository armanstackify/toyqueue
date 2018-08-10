var nr = require('newrelic')

var Queue = require('./jobQueue')
var queue = new Queue()
var i = 0

/*
nr.instrument(
  'jobQueue',
  function onRequire(shim, jobQueue) {
    shim.wrap(
      jobQueue.prototype,
      'scheduleJob',
      function wrapJob(shim, original){
        return function wrappedScheduleJob(job) {
          return original.call(this, shim.bindSegment(job))
        }
      }
    )
  }
)

nr.startBackgroundTransaction('A10 firstTransaction', function first() {
  var transaction = nr.getTransaction()
  queue.scheduleJob(function firstJob() {
    // Do some work
    console.log('this prints first')
    transaction.end()
  })
})

nr.startBackgroundTransaction('A10 secondTransaction', function second() {
  var transaction = nr.getTransaction()
  var i = 0
  queue.scheduleJob(function secondJob() {
    // Do some work
    console.log(i++)
    queue.scheduleJob(secondJob)
    // Transaction state will be lost here because 'firstTransaction' will have
    // already ended the transaction
    transaction.end()
  })
})
*/

// WITHOUT INSTRUMENTATION
queue.scheduleJob(function firstJob() {
  console.log('this prints first')
});

queue.scheduleJob(function secondJob() {
  console.log(i++)
  queue.scheduleJob(secondJob)
  // Transaction state will be lost here because 'firstTransaction' will have
  // already ended the transaction
  // transaction.end()
});


// WITH INSTRUMENTATION - brroken
/*
nr.startBackgroundTransaction('A10 firstTransaction', function first() {
  var transaction = nr.getTransaction()
  queue.scheduleJob(function firstJob() {
    console.log('this prints first')
    transaction.end()
  })
})

nr.startBackgroundTransaction('A10 secondTransaction', function second() {
  var transaction = nr.getTransaction()
  var i = 0
  queue.scheduleJob(function secondJob() {
    // Do some work
    console.log(i++)
    queue.scheduleJob(secondJob)
    // Transaction state will be lost here because 'firstTransaction' will have
    // already ended the transaction
    transaction.end()
  })
})
*/
