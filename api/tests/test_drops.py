from fastapi import FastAPI
from fastapi.testclient import TestClient
from queries.drops import DropQueries
from main import app

client = TestClient(app)


class EmptyDropQueries:
    def get_drops(self):
        return []


class CreateDropQueries:
    def create_drop(self, drop):
        result = {
            "id": 0,
            "name": "string",
            "photo": "string",
            "details": "string",
            "city": "string",
            "address": "string",
            "url": "string",
            "creator_id": {
                "id": "string",
                "email": "string",
                "full_name": "string",
                "username": "string"
            }
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
    #Arrange
    app.dependency_overrides[DropQueries] = CreateDropQueries
    json = {
    "name": "string",
    "photo": "string",
    "details": "string",
    "city": "string",
    "address": "string",
    "url": "string",
    "creator_id": {
        "id": "string",
        "email": "string",
        "full_name": "string",
        "username": "string"
        },
    "bucket_id": 0
    }

    expected = {
    "id": 0,
    "name": "string",
    "photo": "string",
    "details": "string",
    "city": "string",
    "address": "string",
    "url": "string",
    "creator_id": {
        "id": "string",
        "email": "string",
        "full_name": "string",
        "username": "string"
    }
}
    #Act
    response = client.post("/api/drops", json=json)

    #Clean up 
    app.dependency_overrides = {}

    #Assert 
    assert response.status_code == 200
    assert response.json() == expected
