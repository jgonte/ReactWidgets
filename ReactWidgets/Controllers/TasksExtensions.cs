using DomainFramework.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactWidgets.Controllers
{
    // In memory filtering, sorting and paging to simulate server operations
    public static class TasksExtensions
    {
        public static IEnumerable<Task> Filter(this IEnumerable<Task> tasks, Queue<FilterNode> filter)
        {
            if (filter != null)
            {
                foreach (var filterNode in filter)
                {
                    if (filterNode is TwoParametersFunctionCallFilterNode)
                    {
                        var functionCall = (TwoParametersFunctionCallFilterNode)filterNode;

                        switch (functionCall.FieldName)
                        {
                            case "title":
                                {
                                    tasks = tasks.Where(
                                        t => t.Title.ToLowerInvariant().Contains(
                                            functionCall.FieldValue.ToString().ToLowerInvariant()
                                        )
                                    );
                                }
                                break;
                            default: throw new NotImplementedException();
                        }

                    }
                    else if (filterNode is SingleValueFieldFilterNode)
                    {
                        var singleValueField = (SingleValueFieldFilterNode)filterNode;

                        switch (singleValueField.FieldName)
                        {
                            case "taskId":
                                {
                                    var id = int.Parse(singleValueField.FieldValue.ToString());

                                    tasks = tasks.Where(t => t.Id == id);
                                }
                                break;
                            case "schedule":
                                {
                                    var date = DateTime.Parse(singleValueField.FieldValue.ToString());

                                    tasks = tasks.Where(t => t.Schedule.Date == date.Date);
                                }
                                break;
                            case "title":
                                {
                                    switch (singleValueField.Operator.Name)
                                    {
                                        case " = ":
                                            {
                                                tasks = tasks.Where(t => t.Title == singleValueField.FieldValue.ToString());
                                            }
                                            break;
                                        default: throw new NotImplementedException();
                                    }
                                }
                                break;
                            case "completed":
                                {
                                    switch (singleValueField.Operator.Name)
                                    {
                                        case " = ":
                                            {
                                                var completed = bool.Parse(singleValueField.FieldValue.ToString());

                                                tasks = tasks.Where(t => t.Completed == completed);
                                            }
                                            break;
                                        default: throw new NotImplementedException();
                                    }
                                }
                                break;
                            case "order":
                                {
                                    var order = int.Parse(singleValueField.FieldValue.ToString());

                                    tasks = tasks.Where(t => t.Order == order);
                                }
                                break;
                            default: throw new NotImplementedException();
                        }
                    }
                    else
                    {
                        // Ignore AND nodes
                    }
                }
            }

            return tasks;
        }

        public static IEnumerable<Task> Sort(this IEnumerable<Task> tasks, Queue<SorterNode> sorters)
        {
            if (sorters == null)
            {
                return tasks;
            }

            foreach (var sorter in sorters)
            {
                switch (sorter.FieldName)
                {
                    case "title":
                        {
                            if (sorter.SortingOrder == SorterNode.SortingOrders.Ascending)
                            {
                                tasks = tasks.OrderBy(t => t.Title);
                            }
                            else
                            {
                                tasks = tasks.OrderByDescending(t => t.Title);
                            }
                        }
                        break;
                    case "schedule":
                        {
                            if (sorter.SortingOrder == SorterNode.SortingOrders.Ascending)
                            {
                                tasks = tasks.OrderBy(t => t.Schedule);
                            }
                            else
                            {
                                tasks = tasks.OrderByDescending(t => t.Schedule);
                            }
                        }
                        break;
                    default: throw new NotImplementedException();
                }
            }

            return tasks;
        }

    }
}
