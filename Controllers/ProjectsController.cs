using ProjectsApi.Models;
using ProjectsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace ProjectsApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectService _projectService;
        private readonly UserTokenService _userTokenService;

        public ProjectsController(ProjectService projectService)
        {
            _projectService = projectService;
            _userTokenService = userTokenService;

        }

        [HttpGet]
        public ActionResult<List<Project>> Get()
        {
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("x-api-token"))
            {
                string token = headers.GetValues("x-api-token").First();
                string userId = _userTokenService.Authorize(token);
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
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("x-api-token"))
            {
                string token = headers.GetValues("x-api-token").First();
                string userId = _userTokenService.Authorize(token);
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
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("x-api-token"))
            {
                string userId = _userTokenService.Authorize(token);
                if (null != userId)
                {
                    _projectService.Create(project);

                    return CreatedAtRoute("GetProject", new { id = project.Id.ToString() }, project);
                }
            }

        }


        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Project projectIn)
        {
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("x-api-token"))
            {
                string userId = _userTokenService.Authorize(token);
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
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("x-api-token"))
            {
                string userId = _userTokenService.Authorize(token);
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