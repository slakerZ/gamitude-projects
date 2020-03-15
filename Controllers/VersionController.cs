using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace AuthorizationApi.Controllers
{
    [Route("api/pro/[controller]")]
    [Route("/")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        private String version = "Gamitude Pro Alpha v0.1";

        public VersionController()
        {

        }

        [HttpGet]
        public ActionResult<String> Version()
        {

            return Created("Version", version);
        }

    }
}