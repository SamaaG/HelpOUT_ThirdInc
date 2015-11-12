using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HelpOUT.Api
{
    public class TripController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get(bool archivedTrips = false)
        {
            // query the database
            // if result returns error, return CreateErrorResponse and pass along message

            // map results to a view model object

            // temporary stub data
            var model = new[] {
                new { title = "My first trip", date = "January 2016" }
            };

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }
}
