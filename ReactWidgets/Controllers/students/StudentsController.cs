using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainFramework.Core;
using DomainFramework.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactWidgets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private static readonly List<Student> _students = new List<Student>();

        private static int _nextId;

        public StudentsController()
        {
            if (!_students.Any())
            {
                _nextId = 0;

                var length = 100;

                for (int i = 0; i < length; ++i)
                {
                    _students.Add(new Student
                    {
                        Id = ++_nextId,
                        FullName = $"Student Name {_nextId}"
                    });
                }
            }
        }

        // GET: api/Tasks
        [HttpGet]
        public IEnumerable<Student> Get(CollectionQueryParameters queryParameters)
        {
            var students = _students
                .Filter(queryParameters.Filter);

            var count = students.Count();

            if (queryParameters.Skip.HasValue)
            {
                students = students.Skip(queryParameters.Skip.Value);
            }

            if (queryParameters.Top.HasValue)
            {
                students = students.Take(queryParameters.Top.Value);
            }

            Response.Headers.AddPaging(queryParameters, count);

            return students;
        }
    }
}