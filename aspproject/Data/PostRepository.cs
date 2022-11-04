using Microsoft.EntityFrameworkCore;

namespace aspproject.Data
{
    internal static class PostRepository
    {
      internal async static Task<List<Main>> GetPostsAsync()
        {
            using (var db=new AppDB())
            {
                return await db.Mains.ToListAsync();
            }
        }
        internal async static Task<Main> GetPostByIdAsync(int postId)
        {
            using (var db=new AppDB())
            {
                return await db.Mains.FirstOrDefaultAsync(post => post.PostId == postId);
            }
        }
        internal async static Task<bool> CreatePostAsync(Main posttoCreate)
        {
            using (var db=new AppDB())
            {
                try 
                { 
                    await db.Mains.AddAsync(posttoCreate);
                    return await db.SaveChangesAsync() >= 1;
                } catch(Exception e) { return false; }
            }
        }

        internal async static Task<bool> UpdatePostAsync(Main posttoUpdate)
        {
            using (var db = new AppDB())
            {
                try
                {
                    db.Mains.Update(posttoUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e) { return false; }
            }
        }

        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDB())
            {
                try
                {
                    Main posttoDelete = await GetPostByIdAsync(postId);
                    db.Remove(posttoDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e) 
                { return false; }
            }
        }
    }
}
