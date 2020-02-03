using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using nHail.YAPP.Funcs.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace nHail.YAPP.Funcs.Security
{
    public class AuthenticationService
    {
        private const string AuthenticationScheme = "Bearer";
        private readonly ISettings settings;
        public AuthenticationService(ISettings settings)
        {
            this.settings = settings;
        }

        public ClaimsIdentity Validate(HttpRequest request)
        {
            var authentications = GetAuthenticationHeaders(request)
                .Where(x => x.Scheme == AuthenticationScheme)
                .ToArray();
            if (authentications.Any())
            {
                var rsaSecurityKey = new RsaSecurityKey(RSA.Create(2048));
                rsaSecurityKey.Rsa.FromXmlString(settings.PublicKey);
                var tokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = settings.Issuer,
                    ValidAudience = settings.Audience,
                    RequireExpirationTime = true,
                    IssuerSigningKey = rsaSecurityKey
                };
                var handler = new JsonWebTokenHandler();

                return authentications
                    .Select(authentication => handler.ValidateToken(authentication.Parameter, tokenValidationParameters))
                    .Where(tokenValidationResult => tokenValidationResult.IsValid && tokenValidationResult.ClaimsIdentity.IsAuthenticated)
                    .Select(tokenValidationResult => tokenValidationResult.ClaimsIdentity)
                    .DefaultIfEmpty(new ClaimsIdentity())
                    .FirstOrDefault();
            }

            return new ClaimsIdentity();
        }

        private static IEnumerable<AuthenticationHeaderValue> GetAuthenticationHeaders(HttpRequest request)
        {
            if (request.Headers.TryGetValue(HeaderNames.Authorization, out var authorizations))
            {
                foreach (var authorization in authorizations)
                {
                    if (AuthenticationHeaderValue.TryParse(authorization, out var authenticationHeader))
                    {
                        yield return authenticationHeader;
                    }
                }
            }

        }
    }
}
