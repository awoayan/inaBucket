from fastapi import FastAPI
from fastapi.testclient import TestClient
from queries.pool import BucketQueries
from main import app

client = TestClient(app)


class EmptyBucketQueries:
    def get_buckets(self):
        return []


    


def test_get_all_buckets():
    #Arrange
    app.dependency_overrides[BucketQueries] = EmptyBucketQueries
    #Act
    response = client.get("/api/buckets")
    #Clean up
    app.dependency_overrides = {}
    #Assert
    assert response.status_code == 200
    assert response.json() == []