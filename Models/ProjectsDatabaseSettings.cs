namespace ProjectsApi.Models
{
    public class ProjectsDatabaseSettings : IProjectsDatabaseSettings
    {
        public string ProjectsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IProjectsDatabaseSettings
    {
        string ProjectsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}