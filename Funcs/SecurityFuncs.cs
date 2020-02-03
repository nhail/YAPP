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
using nHail.YAPP.Funcs.Configurations;
using nHail.YAPP.Funcs.T4;


namespace NHail.PlanningPoker.Functions
{
    public class SecurityFuncs
    {

        private readonly ISettings settings;
        public SecurityFuncs(ISettings settings)
        {
            this.settings = settings;
        }

        [FunctionName("JWKS-Func")]
        public IActionResult JWKS(
            [HttpTrigger(AuthorizationLevel.Anonymous, HttpVerbs.Get, Route = "jwks.json")] HttpRequest req,
            ILogger log)
        {
            var xdoc = XDocument.Parse(settings.PublicKey);
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
                        kid = settings.FunctionId, 
                        e = exponent.Value,
                        m = modulus.Value
                    }
                }
            });
        }
    }
}
