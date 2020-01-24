using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using nHail.YAPP.Funcs.Configurations;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;


[assembly: FunctionsStartup(typeof(nHail.YAPP.Funcs.Startup))]
namespace nHail.YAPP.Funcs
{

    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var services = builder.Services;

            


            File.WriteAllLines(@"c:\temp\services.txt", builder.Services
                .Select(x => $"Service Type: {x.ServiceType} Implementation Type {x.ImplementationType}"));
        }
    }
}