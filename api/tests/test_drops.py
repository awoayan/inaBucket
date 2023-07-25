from fastapi import FastAPI
from fastapi.testclient import TestClient
from queries.drops import DropQueries
from main import app

client = TestClient(app)


class EmptyDropQueries:
    def get_drops(self):
        return []


class CreateQueries:
    def create_drop(self, drop)
    result = {
        "name": "test drop",
        "photo": "string",
        "details": "test test",
        "city": "string",
        "address": "string",
        "url": "string",
        "creator_id": 0,
        "bucket_id": 0
    }
    result.update(drop)
    return result
    


def test_get_all_drops():
    #Arrange
    app.dependency_overrides[DropQueries] = EmptyDropQueries
    #Act
    response = client.get("/api/drops")
    #Clean up
    app.dependency_overrides = {}
    #Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_drop():
