using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReactWidgets.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // GET: api/categories
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return new List<Category>
            {
                new Category
                {
                    Id= 1,
                    Name = "Hot"
                },
                new Category
                {
                    Id= 2,
                    Name = "Warm"
                },
                new Category
                {
                    Id= 3,
                    Name = "Cool"
                },
                new Category
                {
                    Id= 4,
                    Name = "Cold"
                }
            };
        }

        // GET: api/categories/5
        [HttpGet("{id}", Name = "GetCategory")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/categories
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public class Category
        {
            public int Id { get; internal set; }
            public string Name { get; internal set; }
        }
    }
}
