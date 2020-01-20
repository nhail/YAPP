using System;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using NHail.PlanningPoker.Functions.Security;
using NHail.PlanningPoker.Functions.T4;


namespace NHail.PlanningPoker.Functions
{
    public static class SecurityFuncs
    {

        [FunctionName("JWKS-Func")]
        public static IActionResult JWKS(
            [HttpTrigger(AuthorizationLevel.Anonymous, HttpVerbs.Get, Route = "jwks.json")] HttpRequest req,
            ILogger log)
        {
            var xdoc = XDocument.Parse(Settings.PublicKey);
            var exponent = xdoc.Descendants().First(x => x.Name == "Exponent");
            var modulus = xdoc.Descendants().First(x => x.Name == "Modulus");

            return new OkObjectResult(new
            {
                Keys = new[]
                {
                    new
                    {
                        kty = "RSA", 
                        use = "sig",
                        alg = "RSA256",
                        kid = Settings.FunctionId, 
                        e = exponent.Value,
                        m = exponent.Value
                    }
                }
            });
        }

        [FunctionName("CreateSession-Func")]
        public static Task<IActionResult> CreateSession(
            [HttpTrigger(AuthorizationLevel.Anonymous, HttpVerbs.Get, Route = null)] HttpRequest req,
            ILogger log)
        {
            string name = req.Query["name"];
            var jwttest = AuthorizationService.CreateJWT(new User()
            {
                Id = Guid.NewGuid(),
                Name = name
            });

            log.Log(LogLevel.Information, $"Is Valid: {ValidationService.Validate(req)}");

            return Task.FromResult<IActionResult>(name != null
                ? (ActionResult)new OkObjectResult(new {jwttest})
                : new BadRequestObjectResult("Please pass a name on the query string"));
        }
    }
}
