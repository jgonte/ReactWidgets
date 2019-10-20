using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainFramework.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactWidgets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static List<Task> _tasks = new List<Task>();

        public TasksController()
        {
            var key = 0;

            var length = 100;

            for (int i = 0; i < length; ++i)
            {
                _tasks.Add(new Task
                {
                    Id = ++key,
                    Title = $"Task title {key}",
                    Completed = i % 2 == 0,
                    Schedule = DateTime.Now.AddDays(i),
                    Order = key
                });
            }
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<Task> Get(CollectionQueryParameters queryParameters)
        {
            return _tasks;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}", Name = "GetTask")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Tasks
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public class Task
        {
            public int Id { get; set; }

            public string Title { get; set; }

            public bool Completed { get; set; }

            public DateTime Schedule { get; set; }

            public int Order { get; set; }
        }
    }
}
