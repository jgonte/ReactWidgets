using DomainFramework.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactWidgets.Controllers
{
    // In memory filtering, sorting and paging to simulate server operations
    public static class EnrollmentsExtensions
    {
        public static IEnumerable<Enrollment> Filter(this IEnumerable<Enrollment> enrollments, Queue<FilterNode> filter)
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
                    //else if (filterNode is MultiValueOperatorFilterNode)
                    //{
                    //    var multiValueOperator = (MultiValueOperatorFilterNode)filterNode;

                    //    switch (multiValueOperator.FieldName)
                    //    {
                    //        case "id":
                    //            {
                    //                enrollments = enrollments.Where(
                    //                    t => !multiValueOperator.FieldValues.Contains(
                    //                        t.Id
                    //                    )
                    //                );
                    //            }
                    //            break;
                    //        default: throw new NotImplementedException();
                    //    }

                    //}
                    else if (filterNode is SingleValueFieldFilterNode)
                    {
                        var singleValueField = (SingleValueFieldFilterNode)filterNode;

                        switch (singleValueField.FieldName)
                        {
                            case "organizationId":
                                {
                                    var id = int.Parse(singleValueField.FieldValue.ToString());

                                    enrollments = enrollments.Where(t => t.OrganizationId == id);
                                }
                                break;
                            case "fullName":
                                {
                                    enrollments = enrollments.Where(t => t.FullName == singleValueField.FieldValue.ToString());
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

            return enrollments;
        }

    }
}
