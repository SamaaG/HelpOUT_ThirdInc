using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MongoDB.Driver;
using HelpOUT.Data;

namespace HelpOUT.Api
{
    [Authorize]
    public class TaskController : ApiController
    {
        private readonly IDataClient _dataClient;
        private readonly IMongoDatabase _mongoDatabase;

        public TaskController()
        {
            _mongoDatabase = RetreiveMongohqDb();
            _dataClient = new DataClient(_mongoDatabase);
        }

        [HttpGet]
        public HttpResponseMessage Get(bool archivedTasks = false)
        {
            // query the database
            // if result returns error, return CreateErrorResponse and pass along message

            // map results to a view model object

            // temporary stub data
            if (!archivedTasks)
            {
                return Request.CreateResponse(HttpStatusCode.OK,
                    new[]
                    {
                        new {taskId = 4, title = "My first task", date = "2016-01-15T14:30:00.000Z", isComplete = false},
                        new {taskId = 5, title = "My second task", date = "2016-01-24T17:00:00.000Z", isComplete = false},
                        new {taskId = 6, title = "My third task", date = "2016-02-01T12:00:00.000Z", isComplete = false}
                    }
                );
            }
            return Request.CreateResponse(HttpStatusCode.OK,
                new[]
                {
                    new {taskId = 1, title = "My first archived task", date = "2015-10-05T14:30:00.000Z", isComplete = true},
                    new {taskId = 2, title = "My second archived task", date = "2015-10-07T17:00:00.000Z", isComplete = true},
                    new {taskId = 3, title = "My third archived task", date = "2015-10-10T12:00:00.000Z", isComplete = true}
                }
            );
        }

        [HttpPost]
        public HttpResponseMessage Post(string task)
        {
            // add user id 
            try
            {
                _dataClient.InsertDocument("task", task);

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        public HttpResponseMessage Delete(string id)
        {
            // get user id and verify row belongs to user
            try
            {
                _dataClient.DeleteDocument("task", id);
                
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        private IMongoDatabase RetreiveMongohqDb()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["MongoDB"].ConnectionString;
            var mongoClient = new MongoClient(new MongoUrl(connectionString));
            return mongoClient.GetDatabase("helpout");
        }
    }
}
