using ProjectsApi.Models;
using ProjectsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http.Headers;
using Microsoft.Extensions.Primitives;
using System;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace ProjectsApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        //TODO stats verification if Dominant in stats

        private readonly ProjectService _projectService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProjectsController(ProjectService projectService, IHttpContextAccessor httpContextAccessor)
        {
            _projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public ActionResult<List<Project>> Get()
        {

            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name).ToString();

            if (null != userId)
            {
                return _projectService.GetProjectsByUserId(userId);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet("{id:length(24)}", Name = "GetProject")]
        public ActionResult<Project> Get(string id)
        {

            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name).ToString();

            if (null != userId)
            {
                return _projectService.Get(id);

            }
            else
            {
                return NotFound("User Failure");

            }

        }

        [HttpPost]
        public ActionResult<Project> Create(Project project)
        {
            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name).ToString();


            if (null != userId)
            {
                project.UserId = userId;
                project.DateAdded = DateTime.UtcNow;
                _projectService.Create(project);

                return CreatedAtRoute("GetProject", new { id = project.Id.ToString() }, project);
            }
            else
            {
                return NotFound("User Failure");

            }

        }


        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Project projectIn)
        {
            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name).ToString();

            if (null != userId)
            {
                var project = _projectService.Get(id);
                if (project == null)
                {
                    return NotFound("Project not found");
                }
                projectIn = updateProject(project, projectIn);

                _projectService.Update(id, projectIn);
                return Ok();
            }
            else
            {
                return NotFound("User Failure");

            }
        }


        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            string userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name).ToString();

            if (null != userId)
            {

                var project = _projectService.Get(id);

                if (project == null)
                {
                    return NotFound();
                }

                _projectService.Remove(project.Id);
                return Ok();

            }
            else
            {
                return NotFound("User Failure");

            }

        }
        private Project updateProject(Project project, Project projectIn)
        {
            projectIn.Id=project.Id;
            if (null == projectIn.Name)
            {
                projectIn.Name = project.Name;
            }
            if (null == projectIn.PrimaryMethod.ToString())
            {
                projectIn.PrimaryMethod = project.PrimaryMethod;
            }
            if (null == projectIn.ProjectStatus.ToString())
            {
                projectIn.ProjectStatus = project.ProjectStatus;
            }
            if (null == projectIn.Stats)
            {
                projectIn.Stats = project.Stats;
            }
            return projectIn;
        }
    }
}