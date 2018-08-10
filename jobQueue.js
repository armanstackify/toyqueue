'use strict'

function Queue() {
  this.jobs = []
}

function run(jobs) {
  while (jobs.length) {
    jobs.pop()()
  }
}

Queue.prototype.scheduleJob = function scheduleJob(job) {
  var queue = this
  process.nextTick(function() {
    if (queue.jobs.length === 0) {
      setTimeout(run, 1000, queue.jobs)
    }
    queue.jobs.push(job)
  })
}

module.exports = Queue
