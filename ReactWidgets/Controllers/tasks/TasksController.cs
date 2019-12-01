using System;
using System.Collections.Generic;
using System.Linq;
using DomainFramework.DataAccess;
using DomainFramework.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactWidgets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static readonly List<Task> _tasks = new List<Task>();

        private static int _nextId;

        public TasksController()
        {
            if (!_tasks.Any())
            {
                _nextId = 0;

                var length = 100;

                for (int i = 0; i < length; ++i)
                {
                    _tasks.Add(new Task
                    {
                        Id = ++_nextId,
                        Title = $"Task title {_nextId}",
                        Completed = i % 2 == 0,
                        Schedule = DateTime.Now.AddDays(i),
                        Order = _nextId
                    });
                }
            }
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<Task> Get(CollectionQueryParameters queryParameters)
        {
            var tasks = _tasks
                .Filter(queryParameters.Filter)
                .Sort(queryParameters.OrderBy);

            var count = tasks.Count();

            if (queryParameters.Skip.HasValue)
            {
                tasks = tasks.Skip(queryParameters.Skip.Value);
            }

            if (queryParameters.Top.HasValue)
            {
                tasks = tasks.Take(queryParameters.Top.Value);
            }

            Response.Headers.AddPaging(queryParameters, count);

            return tasks;
        }

        // GET: api/tasks/5
        [HttpGet("{id}", Name = "TaskGetById")]
        public IActionResult Get(int id)
        {
            var task = _tasks.SingleOrDefault(t => t.Id == id);

            return task == null ?
                (IActionResult)NotFound() :
                Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public IActionResult Post([FromBody] Task task)
        {
            task.Id = ++_nextId;

            _tasks.Add(task);

            return CreatedAtRoute("TaskGetById", new
            {
                id = task.Id
            }, new
            {
                id = task.Id
            });
        }

        // PUT: api/tasks
        [HttpPut()]
        public IActionResult Put([FromBody] Task task)
        {
            var tsk = _tasks.SingleOrDefault(t => t.Id == task.Id);

            if (tsk == null)
            {
                return NotFound();
            }

            _tasks.Remove(tsk);

            _tasks.Insert(task.Id, task);

            return NoContent();
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = _tasks.SingleOrDefault(t => t.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            _tasks.Remove(task);

            return NoContent();
        }
    }
}
