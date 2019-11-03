using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactWidgets.Controllers
{
    public class Task
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool Completed { get; set; }

        public DateTime Schedule { get; set; }

        public int Order { get; set; }
    }
}
