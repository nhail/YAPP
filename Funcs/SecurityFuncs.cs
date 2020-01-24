using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using nHail.YAPP.Funcs.T4;
using System.Xml.Linq;
using nHail.YAPP.Funcs.Configurations;
using System.Linq;

namespace nHail.YAPP.Funcs
{
    public static class SecurityFuncs
    {
        [FunctionName("JWKS-Func")]
        public static IActionResult JWKS(
                [HttpTrigger(AuthorizationLevel.Function, HttpVerbs.Get, Route = "jwks.json")] HttpRequest req,
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
                        m = modulus.Value
                    }
                }
            });
        }


    }
}