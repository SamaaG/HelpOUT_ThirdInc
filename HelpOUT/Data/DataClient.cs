using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace HelpOUT.Data
{
    public interface IDataClient
    {
        Task<List<BsonDocument>> GetDocuments(string collectionName, string uid);
        void InsertDocument(string collectionName, string json);
        void DeleteDocument(string collectionName, string id);
    }

    public class DataClient : IDataClient
    {
        private readonly IMongoDatabase _mongoDatabase;

        public DataClient(IMongoDatabase mongoDatabase)
        {
            _mongoDatabase = mongoDatabase;
        }

        public async Task<List<BsonDocument>> GetDocuments(string collectionName, string uid)
        {
            var collection = _mongoDatabase.GetCollection<BsonDocument>(collectionName);
            var filter = Builders<BsonDocument>.Filter.Eq("uId", uid);
            return await collection.Find(filter).ToListAsync();
        }

        public async void InsertDocument(string collectionName, string json)
        {
            var collection = _mongoDatabase.GetCollection<BsonDocument>(collectionName);
            var document = BsonSerializer.Deserialize<BsonDocument>(json);
            await collection.InsertOneAsync(document);
        }

        public async void DeleteDocument(string collectionName, string id)
        {
            var collection = _mongoDatabase.GetCollection<BsonDocument>(collectionName);
            var filter = Builders<BsonDocument>.Filter.Eq("_id.$oid", id);
            await collection.DeleteOneAsync(filter);
        }
    }
}