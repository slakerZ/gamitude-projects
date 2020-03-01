using ProjectsApi.Models;
using ProjectsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http.Headers;
using Microsoft.Extensions.Primitives;
using System;

namespace ProjectsApi.Controllers
{
    [Route("api/[controller]")]
    // [Authorize]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly String tokenName = "x-api-token";

        private readonly ProjectService _projectService;
        private readonly UserTokenService _userTokenService;

        public ProjectsController(ProjectService projectService, UserTokenService userTokenService)
        {
            _projectService = projectService;
            _userTokenService = userTokenService;

        }

        [HttpGet]
        public ActionResult<List<Project>> Get()
        {

            StringValues token;

            if (Request.Headers.TryGetValue(tokenName, out token))
            {
                string userId = _userTokenService.GetClaim(token.ToString());
                if (null != userId)
                {
                    return _projectService.GetProjectsByUserId(userId);
                }
            }

            return Unauthorized();

        }

        [HttpGet("{id:length(24)}", Name = "GetProject")]
        public ActionResult<Project> Get(string id)
        {
            StringValues token;

            if (Request.Headers.TryGetValue(tokenName, out token))
            {
                string userId = _userTokenService.GetClaim(token.ToString());
                if (null != userId)
                {
                    var project = _projectService.Get(id);

                    if (project == null)
                    {
                        return NotFound();
                    }

                    return project;
                }
            }

            return Unauthorized();
        }

        [HttpPost]
        public ActionResult<Project> Create(Project project)
        {
            StringValues token;

            if (Request.Headers.TryGetValue(tokenName, out token))
            {
                string userId = _userTokenService.GetClaim(token.ToString());

                if (null != userId)
                {
                    project.UserId = userId;
                    project.DateAdded = DateTime.UtcNow;
                    _projectService.Create(project);

                    return CreatedAtRoute("GetProject", new { id = project.Id.ToString() }, project);
                }
            }
            return Unauthorized();
        }


        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Project projectIn)
        {
            StringValues token;

            if (Request.Headers.TryGetValue(tokenName, out token))
            {
                string userId = _userTokenService.GetClaim(token.ToString());
                if (null != userId)
                {
                    var project = _projectService.Get(id);

                    if (project == null)
                    {
                        return NotFound();
                    }

                    _projectService.Update(id, projectIn);
                }
            }
            return Unauthorized();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            StringValues token;

            if (Request.Headers.TryGetValue(tokenName, out token))
            {
                string userId = _userTokenService.GetClaim(token.ToString());
                if (null != userId)
                {

                    var project = _projectService.Get(id);

                    if (project == null)
                    {
                        return NotFound();
                    }

                    _projectService.Remove(project.Id);

                }
            }
            return Unauthorized();
        }
    }
}