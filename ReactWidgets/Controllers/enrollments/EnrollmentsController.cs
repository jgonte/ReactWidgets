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
    public class EnrollmentsController : ControllerBase
    {
        private static readonly List<Enrollment> _enrollments = new List<Enrollment>();

        public EnrollmentsController()
        {
            if (!_enrollments.Any())
            {
                var length = 100;

                for (int i = 0; i < length; ++i)
                {
                    _enrollments.Add(new Enrollment
                    {
                        OrganizationId = (i % 10) + 1,
                        StudentId = i + 1,
                        FullName = $"Student Name {i + 1}"
                    });
                }
            }
        }

        // GET: api/enrollments
        [HttpGet]
        public IEnumerable<Enrollment> Get(CollectionQueryParameters queryParameters)
        {
            var students = _enrollments
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

        // POST: api/enrollments
        [HttpPost]
        public IActionResult Post([FromBody] IEnumerable<Enrollment> enrollments)
        {
            return NoContent();
        }

        // DELETE: api/enrollments
        [HttpDelete]
        public IActionResult Delete([FromBody] IEnumerable<Enrollment> enrollments)
        {
            return NoContent();
        }
    }
}