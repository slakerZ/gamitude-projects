using ProjectsApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System;

namespace ProjectsApi.Services
{
    public class ProjectService
    {
        private readonly IMongoCollection<Project> _Projects;


        public ProjectService(IProjectsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _Projects = database.GetCollection<Project>(settings.ProjectsCollectionName);
        }

        public List<Project> GetProjectsByUserId(string userId) =>
            _Projects.Find<Project>(Project => Project.UserId == userId).ToList();

        public Project Get(string id) =>
            _Projects.Find<Project>(Project => Project.Id == id).FirstOrDefault();

        public Project Create(Project Project)
        {
            _Projects.InsertOne(Project);
            return Project;
        }

        public void Update(string id, Project newProject) =>
            _Projects.ReplaceOne(Project => Project.Id == id, newProject);

        public void Remove(Project ProjectIn) =>
            _Projects.DeleteOne(Project => Project.Id == ProjectIn.Id);

        public void Remove(string id) => 
            _Projects.DeleteOne(Project => Project.Id == id);
    }
}