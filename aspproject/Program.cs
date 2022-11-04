using aspproject.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CROSpolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "");
    });
});
// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo{ Title = "ASP.net React", Version = "v1" });
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NEt React";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "web API serving a very simple Posr model.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseCors("CROSpolicy");
app.MapGet("/get-all-posts", async () => await PostRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");
app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    Main postToReturn = await PostRepository.GetPostByIdAsync(postId);
    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoint");
app.MapPost("/create-post", async (Main postToCreate) =>
{
    bool createSuccess = await PostRepository.CreatePostAsync(postToCreate);
    if (createSuccess)
    {
        return Results.Ok("create successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoint");


app.MapPut("/update-post", async (Main postToUpdate) =>
{
    bool updateSuccess = await PostRepository.UpdatePostAsync(postToUpdate);
    if (updateSuccess)
    {
        return Results.Ok("update successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoint");

app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool deleteSuccess = await PostRepository.DeletePostAsync(postId);
    if (deleteSuccess)
    {
        return Results.Ok("delete successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoint");

app.Run();
