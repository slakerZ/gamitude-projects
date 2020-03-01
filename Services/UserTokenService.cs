using ProjectsApi.Models;
using ProjectsApi.Helpers;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;


using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using Microsoft.IdentityModel.Tokens;

using Microsoft.AspNetCore.Identity;
using System.Text;

namespace ProjectsApi.Services
{
    public class UserTokenService
    {
        private readonly AppSettings _appSettings;

        public UserTokenService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        //checks if token is valid depend on SECRET KEY
        public bool ValidateCurrentToken(string token)
        {
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            // var myIssuer = "http://mysite.com";
            // var myAudience = "http://myaudience.com";

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                    // ValidIssuer = myIssuer,
                    // ValidAudience = myAudience,
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        // returns userId if validation success otherwise null
        public string GetClaim(string token)
        {
            if (!ValidateCurrentToken(token))
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            var stringClaimValue = securityToken.Claims.First().Value;
            return stringClaimValue;
        }

    }
}