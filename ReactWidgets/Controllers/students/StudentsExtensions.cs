using DomainFramework.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactWidgets.Controllers
{
    // In memory filtering, sorting and paging to simulate server operations
    public static class StudentsExtensions
    {
        public static IEnumerable<Student> Filter(this IEnumerable<Student> students, Queue<FilterNode> filter)
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
                            //case "id":
                            //    {
                            //        students = students.Where(
                            //            t => t.Id.ToLowerInvariant().Contains(
                            //                functionCall.FieldValue.ToString().ToLowerInvariant()
                            //            )
                            //        );
                            //    }
                            //    break;
                            default: throw new NotImplementedException();
                        }

                    }
                    else if (filterNode is MultiValueOperatorFilterNode)
                    {
                        var multiValueOperator = (MultiValueOperatorFilterNode)filterNode;

                        switch (multiValueOperator.FieldName)
                        {
                            case "id":
                                {
                                    students = students.Where(
                                        t => !multiValueOperator.FieldValues.Contains(
                                            t.Id
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

                                    students = students.Where(t => t.Id == id);
                                }
                                break;
                            case "fullName":
                                {
                                    students = students.Where(t => t.FullName == singleValueField.FieldValue.ToString());
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

            return students;
        }

    }
}
